// init express
var express = require("express");
var app = express();

// configure other stuff
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//------------------------------------------------------------------------------
// ROUTES
//------------------------------------------------------------------------------

app.get("/", function(req, res) {
    res.render("landing"); 
});

// INDEX route - show all tasks
app.get("/tasks", function(req, res) {
    res.render("tasks/index");
});

// TODO: /login and /register routes

//------------------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running"); 
});