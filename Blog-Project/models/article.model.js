const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    user_name: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    }],
    header: {
        type: String,
        required: true,
    },
    article_body: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
    }

}, { timestamps: true })

 

module.exports = mongoose.model('Article', articleSchema);