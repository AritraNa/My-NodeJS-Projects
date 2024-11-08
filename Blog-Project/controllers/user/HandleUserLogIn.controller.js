const User = require("../../models/user.model.js");
const AssignJWTToken = require("../../controllers/AssignToken.controller");
require("dotenv").config();

async function HandleUserLogIn(req, res) {
    try {
        const { email, password } = req.body;

        if(!email) return res.status(401).json({msg: "Email required"});
        if(!password) return res.status(401).json({msg: "Password required"});

        const user = await User.findOne({
            "address": email
        }).select("name address password")

        if (!user) return res.status(401).json({ error: "User does not exist" })

        if (user.password != password) {
            return res.status(401).json({ error: "Password not valid" });
        }

        const assigned = await AssignJWTToken({ _id: user._id });

        const data = assigned?.data?.token

        if (assigned?.success) {
            return res.status(200).json({
                msg: "Login Successful",
                token: data,
            })
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
    HandleUserLogIn,
}
