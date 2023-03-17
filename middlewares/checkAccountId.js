module.exports.checkAccountId = (req, res, next) => {
    if (req.params.id === req.user.id) {
        return next();
    }
    res.redirect("/");
}