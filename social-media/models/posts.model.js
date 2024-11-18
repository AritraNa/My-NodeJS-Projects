const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: "Post",
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, "Password is required."]
    },

}, { timestamps: true })
postSchema.pre('save', async function (next) {
    try {
        const user = await mongoose.model('User').findByIdAndUpdate(
            this.author,
            { $push: { posts: this._id } },
            { new: true }
        );
    } catch (error) {
        console.error(error)
    }

})


module.exports = mongoose.model('Post', postSchema);