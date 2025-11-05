const mongoose = require('mongoose');

const SwapRequestSchema = new mongoose.Schema({
    mySlot: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    theirSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'], 
        default: 'PENDING' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SwapRequest', SwapRequestSchema);
