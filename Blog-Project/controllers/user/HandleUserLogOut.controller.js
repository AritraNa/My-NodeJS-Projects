const { sqliteInsert, sqliteDelete } = require("../../connections/sqlite");

const GetToken = require("../../utils/jwt/getToken.jwt");
require("dotenv").config();

async function HandleUserLogOut(req, res) {
    const token = GetToken(req);

    try {
        sqliteInsert(token);
        sqliteDelete();

        return res.status(200).json({
            code: 200,
            success: true,
            error: [],
            message: "User logged out successfully."
        });
    } catch (error) {
        return res.status(500).json({
            error: [
                {
                    field: "popup",
                    message: `Error: ${error}`
                }
            ],
        });
    }
}

module.exports = {
    HandleUserLogOut
}
