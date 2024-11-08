const express = require('express');

const { AuthenticateController } = require("../controllers/Authenticate.controller")

const { SanitizeRequestBody } = require("../validations/SanitizeRequestBody")
const { SanitizeRequestParams } = require("../validations/SanitizeRequestParams")

const { HandleCreateArticleController } = require("../controllers/articles/HandleCreateArticle.controller")
const { HandleGetArticleListController } = require("../controllers/articles/HandleGetArticleList.controller")
const { HandleGetSingleArticleController } = require("../controllers/articles/HandleGetSingleArticle.controller")
const { HandleArticleUpdateController } = require("../controllers/articles/HandleArticleUpdate.controller")


const router = express.Router();

router.post(
    "/create-article",
    SanitizeRequestBody,
    SanitizeRequestParams,
    HandleCreateArticleController
);

router.patch(
    "/update-article",
    SanitizeRequestBody,
    SanitizeRequestParams,
    HandleArticleUpdateController
);

router.get(
    "/authenticate",
    SanitizeRequestParams,
    AuthenticateController
);
router.get(
    "/article/:_id",
    SanitizeRequestParams,
    HandleGetSingleArticleController
);
router.get(
    "/article-list",
    SanitizeRequestParams,
    HandleGetArticleListController
);



router.patch(
    "/update-article",
    SanitizeRequestBody,
    SanitizeRequestParams,
    HandleArticleUpdateController
);

module.exports = router;
