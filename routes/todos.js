var express = require("express");
var router = express.Router();

// show form to create a new todo
router.get("/new", function(req, res) {
    res.render("todos/new");
});

// add new todo to the DB
router.post("/", function(req, res) {
    console.log("TODO: finish 'create new todo' route");
    res.redirect("/tasks");
});

// edit todo route
router.get("/:id/edit", function(req, res) {
     console.log("TODO: finish 'edit todo' route");
     res.render("todos/edit");
});

// update todo route
router.put("/:id", function(req, res) {
    console.log("TODO: finish 'update todo' route");
    res.redirect("/tasks");
});

// destroy todo route
router.delete("/:id", function(req, res) {
    console.log("TODO: finish 'delete campground' route");
    res.redirect("/tasks");
});

module.exports = router;