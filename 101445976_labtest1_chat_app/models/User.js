const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  createon: { type: Date, default: Date.now } // Automatically set creation time
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
