const express = require('express');
const { HandleUserSignUp } = require("../controllers/user/HandleUserSignUp.controller")
const { HandleUserLogIn } = require("../controllers/user/HandleUserLogIn.controller")
const { HandleUserLogOut } = require("../controllers/user/HandleUserLogOut.controller")

const { HandlePasswordUpdateController } = require("../controllers/userAccountUpdation/HandlePasswordUpdate.controller")
const { HandleNameUpdateController } = require("../controllers/userAccountUpdation/HandleNameUpdate.controller")

const { AuthenticateController } = require("../controllers/Authenticate.controller")

const { SanitizeRequestBody } = require("../validations/SanitizeRequestBody")
const { SanitizeRequestParams } = require("../validations/SanitizeRequestParams")



const router = express.Router();

router.post(
    "/signup",
    SanitizeRequestBody,
    SanitizeRequestParams,
    HandleUserSignUp
);
router.post(
    "/login",
    SanitizeRequestBody,
    SanitizeRequestParams,
    HandleUserLogIn
);

router.get(
    "/authenticate",
    SanitizeRequestParams,
    AuthenticateController
);
router.get(
    "/logout",
    SanitizeRequestParams,
    HandleUserLogOut
);

router.patch(
    "/update-password",
    SanitizeRequestBody,
    SanitizeRequestParams,
    HandlePasswordUpdateController
);
router.patch(
    "/update-name",
    SanitizeRequestBody,
    SanitizeRequestParams,
    HandleNameUpdateController
);




module.exports = router;
