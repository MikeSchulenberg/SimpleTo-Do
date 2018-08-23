var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    middleware  = require("../middleware"),
    Todo        = require("../models/todo"),
    User        = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing"); 
});

// show account registration form
router.get("/register", middleware.isNotLoggedIn, function(req, res) {
     res.render("register", {page: "register"});
});

// handle registration logic
router.post ("/register", function(req, res) {
    var username = req.sanitize(req.body.username);
    var newUser = new User({username: username, completedTasks: 0, achievementPoints: 0});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/");
        }
        
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome, " + user.username);
            res.redirect("/tasks");
        });
    });
});

// show login form
router.get("/login", middleware.isNotLoggedIn, function(req, res) {
    res.render("login", {page: "login"}); 
});

// handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/tasks",
        failureRedirect: "/login",
        failureFlash: true
    }),
        function(req, res) {
});

// log out the current user
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/");
});

// show all tasks
router.get("/tasks", middleware.isLoggedIn, function(req, res) {
    Todo.find({"owner.id": req.user._id}, function(err, foundTodos) {
        if (err) {
            console.log(err);
        }
        
        else {
            res.render("index", {todos: foundTodos, page: "index"});
        }
    })
});

/* Increment the number of tasks completed by the user. Award a number of
Achievement Points based on the priority of a completed todo. */
router.post("/updateUserStats", function(req, res) {
    var completedTasks = req.user.completedTasks + 1;
    var achievementPoints = req.user.achievementPoints;
    
    switch (req.body.priority) {
        case "high":
            achievementPoints += 3;
            break;
        case "medium":
            achievementPoints += 2;
            break;
        case "low":
            achievementPoints += 1;
            break;
    }
    
    var updatedUser = {completedTasks: completedTasks, achievementPoints: achievementPoints};
    User.findByIdAndUpdate(req.user._id, updatedUser, {new: true}, function(err, user) {
        if (err) {
            console.log(err);
        }
        
        else {
            res.json(user);
        }
    });
});

module.exports = router;