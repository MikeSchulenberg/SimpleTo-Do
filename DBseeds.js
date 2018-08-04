var mongoose = require("mongoose");
var Todo = require("./models/todo");

var data = [
    {
        title: "Add a new High priority To-Do",
        priority: "high"
    },
    
    {
        title: "Add a new Medium priority To-Do",
        priority: "medium"
    },
    
    {
        title: "Add a new Low priority To-Do",
        priority: "low"
    }
];

function seedDB() {
    // remove all todos
    Todo.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        
        // seed DB with new todos
        data.forEach(function(seed) {
            Todo.create(seed);
        });
    });
}

module.exports = seedDB;