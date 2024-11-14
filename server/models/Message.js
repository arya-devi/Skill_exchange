// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true },
//   isEdited: { type: Boolean, default: false },
// }, { timestamps: true }); // Adds createdAt and updatedAt

// module.exports = mongoose.model('Message', messageSchema);
// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added recipient field
  content: { type: String, required: true },
  isEdited: { type: Boolean, default: false },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Message', messageSchema);
