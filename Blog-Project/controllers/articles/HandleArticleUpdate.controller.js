const User = require("../../models/user.model.js");
const AssignJWTToken = require("../../controllers/AssignToken.controller");
require("dotenv").config();

async function HandleArticleUpdateController(req, res) {
    try {
        
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
    HandleArticleUpdateController,
}
