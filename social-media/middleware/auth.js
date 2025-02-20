const GetToken = require("../utils/getToken.jwt")
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")

module.exports = async function AuthencitationController (request, response,next) {

    const token = GetToken(request);

    if (!token){
        response.status(401).json({
            message:"Unauthorised User"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY)
        const user = User.findById(decoded._id)
        if(!user){
            return response.status(400).json({
                message:"User does not exist"
            })
        }

        request.user = user

        next();

    }catch(error){
        response.status(500).json({
            message:"error",
            error:error
        })

    }
    
}