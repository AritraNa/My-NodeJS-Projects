const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const GetToken = require("../utils/jwt/getToken.jwt");
const connectSqliteDB = require("../connections/connectSQLite");
require("dotenv").config();


async function AuthenticateController(req, res) {

    const token = GetToken(req)

    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                error: [
                    {
                        field: "popup",
                        message: "Unauthorized user, token not available."
                    }
                ],
                message: ""
            });
        }
        else {
            const connectionSqliteDB = connectSqliteDB();
            connectionSqliteDB.serialize(() => {
                connectionSqliteDB.get(`SELECT token FROM tokens WHERE token = ?`, [token], async (error, row) => {
                    if (error) {
                        return response.status(500).json({
                            success: false,
                            error: [
                                {
                                    field: "popup",
                                    message: `Error: ${error}`
                                }
                            ],
                        })
                    }
                    else if (row?.token) {
                        return res.status(401).json({
                            expired: true,
                            error: [
                                {
                                    field: "popup",
                                    message: "This token has expired, Please login again."
                                }
                            ],
                        })
                    }
                    else {

                        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                        const _id = new mongoose.Types.ObjectId(decoded?._id);

                        const user = await User
                            .findOne({ _id: _id })
                            .select("name address password")

                        if (!user) {
                            return res.status(401).json({
                                error: "No account credentials found"
                            })
                        }

                        user.token = token
                        req.user = user

                        res.status(200).json({ msg: req.user })
                    }
                    
                });

            });


        }

    } catch (err) {
        return res.status(500).json({ msg: err })
    }

}

module.exports = { AuthenticateController }