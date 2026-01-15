// Mongoose schema and model for User
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    age:Number
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;