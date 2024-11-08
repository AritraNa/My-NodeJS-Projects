const Article = require("../../models/article.model.js")

const GetToken = require("../../utils/jwt/getToken.jwt.js");
require("dotenv").config();

async function HandleGetArticleListController(req, res) {
    try {
        const token = GetToken(req)
        if (!token)return res.status(401).json({
            msg: "token invalid"
        })
        const article_id = req.params._id;


        const article_details = await Article.find({})
            .select("_id user_name header article_body tags updatedAt")
            .populate({
                path: "user_name",
                select: ["_id", "name"]
            })
        res.json({
            article_details: article_details
        })
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
    HandleGetArticleListController,
}
