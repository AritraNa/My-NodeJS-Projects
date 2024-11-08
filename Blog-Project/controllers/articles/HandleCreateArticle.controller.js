const User = require("../../models/user.model.js");
const Article = require("../../models/article.model.js")
const AssignJWTToken = require("../../controllers/AssignToken.controller");
const GetToken = require("../../utils/jwt/getToken.jwt.js");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function HandleCreateArticleController(req, res) {
    try {
        const { header, article_body, tags } = req.body;

        if (!header) return res.status(401).json({
            msg: "Header field cannot be empty"
        })
        if (!article_body) return res.status(401).json({
            msg: "Body field cannot be empty"
        })

        const token = GetToken(req);

        if (!token) return res.status(401).json({
            msg: "User not valid"
        })

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const _id = new mongoose.Types.ObjectId(decoded?._id);

        const user = await User.findById(_id).select()

        if (!user) return res.status(401).json({
            msg: "User does not exist"
        })

        try {
            const newArticle = await Article.create({
                user_name: user._id, header: header, article_body: article_body, tags: tags
            })
            res.status(200).json({ msg: "Article Created", details: newArticle })
        } catch (err) {
            res.status(500).json({ error: err })
        }

        



    } catch (err) {
        return response.status(500).json({

            success: false,
            error: [
                {
                    field: "popup",
                    message: `Error: ${error}`
                }
            ],
            message: ""
        });
    }
}

module.exports = {
    HandleCreateArticleController,
}
