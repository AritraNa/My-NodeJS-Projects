const express = require('express');
const router = express.Router();
const User = require('../models/users.model');

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!req.body || !name || !email || !password) return res.status(400).json({ error: "field inputs required" })

    const userExists = await User.findOne({ "email": email.toLowerCase() });
    if(userExists)return res.status(400).json({ error: "Email already registered" });

    const user = new User({ name, email, password })
    await user.save();
    res.status(200).json({msg:"user created",user:user})
})

module.exports = router;

