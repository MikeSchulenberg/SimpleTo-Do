var express = require("express");
var router = express.Router();
var Todo = require("../models/todo");

// show form to create a new todo
router.get("/new", function(req, res) {
    res.render("todos/new");
});

// add new todo to the DB
router.post("/", function(req, res) {
    var title = req.body.title;
    var priority = req.body.options;
    
    var newTodo = {title: title, priority: priority};
    
    Todo.create(newTodo, function(err) {
        if (err) {
            console.log(err);
        }
        
        else {
            res.redirect("/tasks");
        }
    })
});

// edit todo route - show form to edit a single todo
router.get("/:id/edit", function(req, res) {
    Todo.findById(req.params.id, function(err, foundTodo) {
        if (err) {
            console.log(err);
        }
         
        else {
            res.render("todos/edit", {todo: foundTodo});
        }
    });
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