const User = require("../models/user.model");
const { encryptKeys } = require("../security/rsa.keys.security");
const jwt = require("jsonwebtoken");

const AssignTokenController = async (user) => {

    try {
      
        const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: "1d" });

        if (token) {
            await User.findOneAndUpdate({ _id: user._id }, { lastLoggedInTime: new Date() });

            const data = encryptKeys({
                token: token
            });

            return {
                code: 200,
                success: true,
                data: data,
                error: [],
                message: "Token assigned successfully."
            }
        }
        else {
            return {
                code: 500,
                success: false,
                error: [
                    {
                        field: "popup",
                        message: "Token not assigned to user."
                    }
                ],
                message: ""
            };
        }
    }
    catch (error) {
        return {
            code: 500,
            token: null,
            success: false,
            error: [
                {
                    field: "popup",
                    message: "Internal Server Error, Token not assigned to user."
                }
            ],
            message: ""
        };
    }
}

module.exports = AssignTokenController;