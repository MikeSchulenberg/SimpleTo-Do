var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("landing"); 
});

// show account registration form
router.get("/register", function(req, res) {
     res.render("register");
});

// handle registration logic
router.post ("/register", function(req, res) {
    console.log("TODO: handle user registration logic");
    res.redirect("/todos");
});

// show login form
router.get("/login", function(req, res) {
    res.render("login"); 
});

// handle login logic
router.post("/login", function(req, res) {
    console.log("TODO: handle login logic");
    res.redirect("/todos"); 
});

module.exports = router;