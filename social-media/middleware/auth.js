const GetToken = require("../utils/getToken.jwt")
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")

module.exports= async function (request, response,next) {

    const token = GetToken(request);

    if (!token){
        response.status(400).json({
            message:"Unauthorised"
        })
    }
    
}