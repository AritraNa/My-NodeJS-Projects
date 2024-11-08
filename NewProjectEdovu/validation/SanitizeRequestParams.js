const sanitizeHtml = require("sanitize-html");

async function SanitizeRequestParams(req, res, next) {
    if (req.query) {
        for (let key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                req.query[key] = sanitizeInput(req.query[key]);
            }
        }
    }
    next();
}

function sanitizeInput(input){
    input = input.trim();
    input = sanitizeHtml(input);
    return input;
}

module.exports = { SanitizeRequestParams }