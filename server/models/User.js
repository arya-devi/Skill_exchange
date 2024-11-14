const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, 'Name must contain at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        unique: true, // Ensure unique email addresses
        trim: true,    // Trim whitespace
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must contain at least 6 characters'],
    },
    location: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    profilePicture: {
        type: String, // URL or path to profile picture
        default: 'default-profile-pic.jpg'
    },
    skills: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update `updatedAt` field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Creating the User model from the schema
const User = mongoose.model('User', userSchema);

// Exporting the User model
module.exports = User;
