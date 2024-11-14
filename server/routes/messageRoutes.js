// const express = require('express');
// const { sendMessage, editMessage, deleteMessage,getMessages  } = require('../controllers/messageController');
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');


// router.post('/send',authMiddleware, sendMessage);
// router.put('/:messageId',authMiddleware, editMessage);
// router.delete('/:messageId',authMiddleware, deleteMessage);
// router.get('/:chatId/history',authMiddleware, getMessages);

// module.exports = router;
// routes/messageRoutes.js
const express = require('express');
const { sendMessage, editMessage, deleteMessage, getMessages } = require('../controllers/messageController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send', authMiddleware, sendMessage);
router.get('/:chatId/history', authMiddleware, getMessages); // Fetch messages for chat
router.put('/:messageId', authMiddleware, editMessage);
router.delete('/:messageId', authMiddleware, deleteMessage);

module.exports = router;
