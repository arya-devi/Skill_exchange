const express = require('express');
const { sendRequest, getRequests, respondToRequest,getStatus, getAcceptedRequests } = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', authMiddleware, sendRequest);
router.get('/', authMiddleware, getRequests);
router.post('/respond', authMiddleware, respondToRequest);
router.get('/chat/:userId', authMiddleware, getStatus); // 
router.get('/accepted', authMiddleware, getAcceptedRequests);

module.exports = router;
