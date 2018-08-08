var express = require("express");
var router = express.Router();
var Todo = require("../models/todo");

// show form to create a new todo
router.get("/new", function(req, res) {
    res.render("todos/new");
});

// add new todo to the DB
router.post("/", function(req, res) {
    var title = req.sanitize(req.body.title);
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

// update todo route - update a single todo in the DB
router.put("/:id", function(req, res) {
    var title = req.sanitize(req.body.title);
    var priority = req.body.options;
    
    var updatedTodo = {title: title, priority: priority};
    
    Todo.findByIdAndUpdate(req.params.id, updatedTodo, function(err) {
        if (err) {
            console.log(err);
        }
        
        res.redirect("/tasks");
    });
});

// destroy todo route
router.delete("/:id", function(req, res) {
    Todo.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/tasks/:id");
        }
        
        else {
            res.redirect("/tasks");
        }
    });
});

module.exports = router;