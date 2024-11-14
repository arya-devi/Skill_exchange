const User = require('../models/User');

// Get profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete profile
exports.deleteUserProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'User profile deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getUserProfileById = async (req, res) => {
  try {
      const user = await User.findById(req.params.userId).populate('skills');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user profile by ID' });
  }
};