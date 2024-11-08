const User = require("../../models/user.model.js");

async function HandleUserSignUp(req, res) {
    const body = req.body;

    if (!body || !body.name || !body.email || !body.password) return res.status(400).json({ error: "field inputs required" })

    const userExists = await User.findOne({ "address": body.email.toLowerCase() });
    if (userExists) return res.status(400).json({ error: "Email already registered" });

    try {
        await User.create({
            name: body.name, address: body.email.toLowerCase(), password: body.password
        })
        res.status(200).json({ state: "User Created" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}


module.exports = {
    HandleUserSignUp,
}
