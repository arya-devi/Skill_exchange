const Message = require("../models/Message");

// exports.sendMessage = async (req, res) => {
//   const { chatId, sender, content } = req.body;
//   console.log('chatId : ',chatId,'sender : ', sender, 'content :',content);

//   try {
//     const message = new Message({ chatId, sender, content });
//     await message.save();
//     res.status(201).json(message);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({ error: 'Failed to send message' });
//   }
// };
// controllers/messageController.js

exports.sendMessage = async (req, res) => {
  const { chatId, sender, content } = req.body;
  const recipient = chatId; // Assuming `chatId` is used as recipient's ID

  try {
    const message = new Message({ chatId, sender, recipient, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// exports.getMessages = async (req, res) => {
//     const { chatId } = req.params;
//     try {
//       const messages = await Message.find({ chatId })
//         .populate('sender', 'username') // Populate sender information if you have a username field
//         .sort({ createdAt: 1 }); // Sort messages by creation time
//       res.status(200).json(messages);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve messages' });
//     }
//   };
exports.getMessages = async (req, res) => {
  const { chatId } = req.params; // Recipient's ID
  const currentUserId = req.userId; // Current user ID from authMiddleware

  try {
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: chatId },
        { sender: chatId, recipient: currentUserId },
      ],
    })
      .populate("sender", "username")
      .populate("recipient", "username")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};


exports.editMessage = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content, isEdited: true },
      { new: true }
    );
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit message" });
  }
};

exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};
