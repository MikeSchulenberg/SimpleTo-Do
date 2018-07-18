var express = require("express");
var router = express.Router();

// show all todos
router.get("/", function(req, res) {
    console.log("TODO: finish 'show all todos' route");
    res.render("todos/index");
});

// show form to create a new todo
router.get("/new", function(req, res) {
    res.render("todos/new");
});

// add new todo to the DB
router.post("/", function(req, res) {
    console.log("TODO: finish 'create new todo' route");
    res.redirect("/todos");
});

// edit todo route
router.get("/:id/edit", function(req, res) {
     console.log("TODO: finish 'edit todo' route");
     res.render("todos/edit");
});

// update todo route
router.put("/:id", function(req, res) {
    console.log("TODO: finish 'update todo' route");
    res.redirect("/todos");
});

// destroy todo route
router.delete("/:id", function(req, res) {
    console.log("TODO: finish 'delete campground' route");
    res.redirect("/todos");
});

module.exports = router;