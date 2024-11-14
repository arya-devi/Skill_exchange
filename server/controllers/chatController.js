const Chat = require('../models/Chat');
const Message = require('../models/Message');

exports.createChat = async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    if (!user1 || !user2) return res.status(400).json({ error: 'Both user IDs are required' });

    const chat = new Chat({ users: [user1, user2] });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).populate('sender', 'name');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};
