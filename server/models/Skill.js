// server/models/Skill.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, default: 0 }, // 0 means free, any other value means paid
    status: { type: String, default: "pending" },
    paidUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', skillSchema);
