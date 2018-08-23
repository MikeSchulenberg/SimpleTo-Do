var express = require("express"),
    router  = express.Router(),
    Todo    = require("../models/todo"),
    User    = require("../models/user");

// add new todo to the DB
router.post("/", function(req, res) {
    var title = req.sanitize(req.body.title);
    var priority = req.body.options;
    var ownerId = req.user._id;
    
    var newTodo = {title: title, priority: priority, "owner.id": ownerId};
    
    Todo.create(newTodo, function(err, todo) {
        if (err) {
            console.log(err);
        }
        
        else {
            // res.redirect("/tasks");
            res.json(todo);
        }
    })
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
    Todo.findByIdAndRemove(req.params.id, function(err, todo) {
        if (err) {
            console.log(err);
        }
        
        else {
            if (req.xhr) {
                res.json(todo);
            }
            
            else {
                res.redirect("/tasks");
            }
        }
    });
});

module.exports = router;