const sanitizeHtml = require("sanitize-html");

async function SanitizeRequestBody(req, res) {
    if (req.body) {
        for (let key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.body[key] = sanitizeInput(req.body[key]);
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

module.exports = { SanitizeRequestBody }