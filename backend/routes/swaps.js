const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const SwapRequest = require('../models/SwapRequest');

// GET /api/swappable-slots
router.get('/swappable-slots', auth, async (req, res) => {
    try {
        const slots = await Event.find({ status: 'SWAPPABLE', owner: { $ne: req.user } });
        res.json(slots);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST /api/swap-request
router.post('/swap-request', auth, async (req, res) => {
    try {
        const { mySlotId, theirSlotId } = req.body;

        const mySlot = await Event.findOne({ _id: mySlotId, owner: req.user, status: 'SWAPPABLE' });
        const theirSlot = await Event.findOne({ _id: theirSlotId, status: 'SWAPPABLE' });

        if (!mySlot || !theirSlot) return res.status(400).json({ msg: 'Slots not swappable' });

        const swapRequest = new SwapRequest({
            mySlot: mySlot._id,
            theirSlot: theirSlot._id,
            requester: req.user,
            responder: theirSlot.owner
        });

        await swapRequest.save();

        mySlot.status = 'SWAP_PENDING';
        theirSlot.status = 'SWAP_PENDING';
        await mySlot.save();
        await theirSlot.save();

        res.json(swapRequest);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST /api/swap-response/:requestId
router.post('/swap-response/:requestId', auth, async (req, res) => {
    try {
        const { accept } = req.body;
        const swapRequest = await SwapRequest.findById(req.params.requestId)
            .populate('mySlot')
            .populate('theirSlot');

        if (!swapRequest) return res.status(404).json({ msg: 'Swap request not found' });
        if (swapRequest.responder.toString() !== req.user) return res.status(403).json({ msg: 'Not authorized' });

        if (!accept) {
            swapRequest.status = 'REJECTED';
            swapRequest.mySlot.status = 'SWAPPABLE';
            swapRequest.theirSlot.status = 'SWAPPABLE';
            await swapRequest.mySlot.save();
            await swapRequest.theirSlot.save();
            await swapRequest.save();
            return res.json({ msg: 'Swap rejected', swapRequest });
        }

        // Accept swap: exchange owners
        const tempOwner = swapRequest.mySlot.owner;
        swapRequest.mySlot.owner = swapRequest.theirSlot.owner;
        swapRequest.theirSlot.owner = tempOwner;

        swapRequest.mySlot.status = 'BUSY';
        swapRequest.theirSlot.status = 'BUSY';
        swapRequest.status = 'ACCEPTED';

        await swapRequest.mySlot.save();
        await swapRequest.theirSlot.save();
        await swapRequest.save();

        res.json({ msg: 'Swap accepted', swapRequest });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /api/swap-requests (incoming and outgoing)
router.get('/swap-requests', auth, async (req, res) => {
    try {
        const incoming = await SwapRequest.find({ responder: req.user })
            .populate('mySlot')
            .populate('theirSlot');
        const outgoing = await SwapRequest.find({ requester: req.user })
            .populate('mySlot')
            .populate('theirSlot');

        res.json({ incoming, outgoing });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
