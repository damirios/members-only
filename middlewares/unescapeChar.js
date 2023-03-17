module.exports.unescapeChar = (escaped, char) => function (req, res, next) {
    for (let key in req.body) {
        req.body[key] = req.body[key].replace(new RegExp(escaped), char);
    }
    return next();
}