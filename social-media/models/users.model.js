const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required."]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Post"
    }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash
        } catch (error) {
            return next(error)
        }
    }
    next();
})



module.exports = mongoose.model('User', userSchema);