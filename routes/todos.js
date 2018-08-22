var express = require("express"),
    router  = express.Router(),
    Todo    = require("../models/todo"),
    User    = require("../models/user");

// show form to create a new todo
router.get("/new", function(req, res) {
    res.render("todos/new");
});

// add new todo to the DB
router.post("/", function(req, res) {
    var title = req.sanitize(req.body.title);
    var priority = req.body.options;
    var ownerId = req.user._id;
    
    var newTodo = {title: title, priority: priority, "owner.id": ownerId};
    
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
    // Was the todo marked as complete by using its checkbox?
    // if (req.xhr) {
    //     // console.log(req.xhr.data);
    //     req.on("data", function(data) {
    //         console.log(data);
    //     });
    // }
    
    // if (req.body.taskcheckbox) {
    //     console.log("has taskcheckbox");
    //     updateUserStats(req);
    // }
    
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

/* Increment the number of tasks completed by the user. Award a number of
Achievement Points based on the priority of a completed todo. */
router.post("/updateUserStats", function(req, res) {
    var completedTasks = req.user.completedTasks + 1;
    var achievementPoints = req.user.achievementPoints;
    
    // console.log(req.body.priority);
    
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

// router.post("/updateUserStats", function(req, res) {
//     console.log("/updateUserStats POST route reached");
//     // console.log(req.body.id);
    
//     var completedTasks = req.user.completedTasks + 1;
    
//     var updatedUser = {completedTasks: completedTasks};
//     User.findByIdAndUpdate(req.user._id, updatedUser, function(err) {
//         if (err) {
//             console.log(err);
//         }
        
//         else {
//             console.log("user update successful");
//             res.redirect("/tasks");
//         }
//     });
// });

//------------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------------

/* Increment the number of tasks completed by the user. Award a number of
Achievement Points based on the priority of a completed todo. */
// function updateUserStats(req) {
//     var completedTasks = req.user.completedTasks + 1;
//     var achievementPoints = req.user.achievementPoints;
    
//     Todo.findById(req.params.id, function(err, todo) {
//         if (err) {
//             console.log(err);
//         }
        
//         else {
//             switch (todo.priority) {
//                 case "high":
//                     achievementPoints += 3;
//                     break;
//                 case "medium":
//                     achievementPoints += 2;
//                     break;
//                 case "low":
//                     achievementPoints += 1;
//                     break;
//             }
            
//             var updatedUser = { completedTasks: completedTasks, achievementPoints: achievementPoints};
//             User.findByIdAndUpdate(req.user._id, updatedUser, function(err) {
//                 if (err) {
//                     console.log(err);
//                 }
//             });
//         }
//     });
// }

//------------------------------------------------------------------------------

module.exports = router;