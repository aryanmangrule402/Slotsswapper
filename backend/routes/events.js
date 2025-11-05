const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');

// Create Event
router.post('/', auth, async (req, res) => {
    try {
        const { title, startTime, endTime } = req.body;
        const event = new Event({ title, startTime, endTime, owner: req.user });
        await event.save();
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get User Events
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find({ owner: req.user });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Event (title or status)
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, status } = req.body;
        const event = await Event.findOne({ _id: req.params.id, owner: req.user });
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        if (title) event.title = title;
        if (status) event.status = status;

        await event.save();
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete Event
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id, owner: req.user });
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        res.json({ msg: 'Event deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
