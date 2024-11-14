// // server/controllers/skillController.js
const Skill = require('../models/Skill');


// Fetch skills for the logged-in user
exports.addSkill = async (req, res) => {
    try {
        const newSkill = new Skill({ ...req.body, user: req.userId });
        await newSkill.save();
        res.status(201).json(newSkill); // Return the created skill
    } catch (error) {
        res.status(500).json({ error: 'Failed to add skill' });
    }
};

// // Fetch skills for the logged-in user
exports.getUserSkills = async (req, res) => {
    try {
        // Filter skills by the logged-in user's ID
        const userSkills = await Skill.find({ user: req.userId });
        res.status(200).json(userSkills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user skills' });
    }
};

// Get all skills with optional filter for paid/free
exports.getSkills = async (req, res) => {
    try {
        const { search, paidOnly } = req.query;
        let filter = {};

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        if (paidOnly === 'true') {
            filter.price = { $gt: 0 };
        } else if (paidOnly === 'false') {
            filter.price = 0;
        }

        const skills = await Skill.find(filter).populate('user', 'name');
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve skills' });
    }
};
// Update a skill
exports.updateSkill = async (req, res) => {
    try {
        const { skillId } = req.params;
        const updatedSkill = await Skill.findOneAndUpdate(
            { _id: skillId, user: req.userId },  // Ensure the skill belongs to the logged-in user
            { ...req.body },
            { new: true }
        );
        
        if (!updatedSkill) {
            return res.status(404).json({ error: 'Skill not found or not authorized to update' });
        }

        res.status(200).json(updatedSkill);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update skill' });
    }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
    try {
        const { skillId } = req.params;
        const deletedSkill = await Skill.findOneAndDelete({
            _id: skillId,
            user: req.userId  // Ensure the skill belongs to the logged-in user
        });

        if (!deletedSkill) {
            return res.status(404).json({ error: 'Skill not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete skill' });
    }
};

