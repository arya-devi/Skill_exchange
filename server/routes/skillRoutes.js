// server/routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/add', authMiddleware, skillController.addSkill);
router.get('/all', authMiddleware, skillController.getSkills);
router.get('/user', authMiddleware, skillController.getUserSkills);
router.put('/:skillId', authMiddleware, skillController.updateSkill);  
router.delete('/:skillId', authMiddleware, skillController.deleteSkill);

module.exports = router;
