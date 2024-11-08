const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required."]
    },
    address: {
        type: String,
        required: [true, "email is required"],
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address."
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
}, { timestamps: true })

const USER = mongoose.model('user', userSchema);

module.exports = USER;