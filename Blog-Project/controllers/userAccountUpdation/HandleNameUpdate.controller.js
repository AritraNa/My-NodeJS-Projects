const User = require("../../models/user.model.js");
const GetToken = require("../../utils/jwt/getToken.jwt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function HandleNameUpdateController(req, res) {
    const token = GetToken(req);

    const { newName } = req.body

    if (!newName) return res.status(401).json({ msg: "New Name Required" })


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const _id = new mongoose.Types.ObjectId(decoded?._id);


    const user = await User
        .findOneAndUpdate({ _id: _id, }, { name: newName })


    if (!user) {
        return res.status(401).json({
            error: "Invalid User"
        })
    }

    const newUserData = await User.findOne({ _id: _id })

    res.json(
        {
            msg: "Changes Made!",
            user_data: newUserData,
            token: token
        }
    )
}

module.exports = { HandleNameUpdateController };