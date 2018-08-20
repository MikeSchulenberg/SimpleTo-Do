var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    
    req.flash("error", "You need to log in first");
    res.redirect("/");
};

middlewareObj.isNotLoggedIn = function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    
    res.redirect("/tasks");
};

module.exports = middlewareObj;