const User = require("../../models/user.model.js");
const GetToken = require("../../utils/jwt/getToken.jwt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


async function HandlePasswordUpdateController(req, res) {
    const token = GetToken(req);

    const { new_password, old_password } = req.body

    if (!new_password) return res.status(401).json({ msg: "New Password Required" })
    if (!old_password) return res.status(401).json({ msg: "Old Password Required" })


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const _id = new mongoose.Types.ObjectId(decoded?._id);

    const user = await User
        .findOneAndUpdate({ _id: _id, password: old_password }, { password: new_password })


    if (!user) {
        return res.status(401).json({
            error: "Old password is not correct"
        })
    }


    res.json(
        {
            msg: "Changes Made!",
            email: user.address,
            old_password: old_password,
            new_password: new_password,
            token: token
        }
    )


}

module.exports = { HandlePasswordUpdateController };