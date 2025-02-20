const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post('/authenticate', async (request, response, next) => {
    const { email, password } = request.body;
    if (!email) {
        return res.status(400).json({ message: '"email" is required' });
    }
    if (!password) {
        return res.status(400).json({ message: '"password" is required' });
    }
    const user = await User.findOne({ email });

    if (!user) {
        return response.status(400).json({ message: 'User does not exist, please check email and password' });
    }

    const validPassword = await bcrypt.compare(password,user.password)
    if (!validPassword){
        response.status(401).json({
            message:"Password is not valid, Please try again"
        })
    }

    const token = 
    response.json({
        message:user
    })


})

module.exports = router;