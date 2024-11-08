const express = require('express');
const { handleGenerateNewShortURL,handleOpenNewURL,handleGetAnalytics } = require("../controllers/url.controller")

const URL = require("../models/url")

const router = express.Router();

router.post("/", handleGenerateNewShortURL)
router.get("/:shortId", handleOpenNewURL)

router.get("/analytics/:shortId", handleGetAnalytics )


module.exports = router;
