const sanitizeHtml = require("sanitize-html");

async function SanitizeRequestBody(req, res, next) {
    if (req.body) {
        for (let key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.body[key] = sanitizeInput(req.body[key]);
            }
        }
    }
    next();
}

function sanitizeInput(input) {

    if (Array.isArray(input)) {
        for (let key in input) {
            input[key] = input[key].trim();
            input[key] = sanitizeHtml(input[key]);
            
        }
    } else {
        input = input.trim();
        input = sanitizeHtml(input);
       
    }
    return input;

}

module.exports = { SanitizeRequestBody }