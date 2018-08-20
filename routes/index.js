var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    Todo        = require("../models/todo"),
    User        = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing"); 
});

// show account registration form
router.get("/register", function(req, res) {
     res.render("register");
});

// handle registration logic
router.post ("/register", function(req, res) {
    var username = req.sanitize(req.body.username);
    var newUser = new User({username: username});
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
router.get("/login", function(req, res) {
    res.render("login"); 
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
router.get("/tasks", function(req, res) {
    Todo.find({"owner.id": req.user._id}, function(err, allTodos) {
        if (err) {
            console.log(err);
        }
        
        else {
            res.render("index", {todos: allTodos});
        }
    })
});

module.exports = router;