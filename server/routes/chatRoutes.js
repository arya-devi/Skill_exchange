const express = require('express');
const { createChat, getChatHistory } = require('../controllers/chatController');
const router = express.Router();

router.post('/create', createChat); // Creates a new chat
router.get('/:chatId/history', getChatHistory); // Fetches chat history

module.exports = router;
