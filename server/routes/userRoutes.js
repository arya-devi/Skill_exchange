const express = require('express');
const { getUserProfile, updateUserProfile, deleteUserProfile,getUserProfileById } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Delete user profile
router.delete('/profile', authMiddleware, deleteUserProfile);
router.get('/profile/:userId', authMiddleware, getUserProfileById);

module.exports = router;
