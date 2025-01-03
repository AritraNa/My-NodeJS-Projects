const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url required" })
    else {
        const shortID = shortid();
        await URL.create({ shortId: shortID, redirectUrl: body.url, visitHistory: [] });
        res.json({ id: shortID });
    }
}

async function handleOpenNewURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        })

    res.redirect(entry.redirectUrl);

}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory
    })

}

module.exports = { handleGenerateNewShortURL, handleOpenNewURL, handleGetAnalytics }