// init express
var express = require("express");
var app = express();

// init method-override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// configure other stuff
app.set("view engine", "ejs");
app.use(express.static("public"));

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

// show account registration form
app.get("/register", function(req, res) {
     res.render("register");
});

// handle signup logic
app.post ("/register", function(req, res) {
    res.render("tasks");
});

// show login form
app.get("/login", function(req, res) {
    res.render("login"); 
});

// handle login logic
app.post("/login", function(req, res) {
    res.render("tasks"); 
});

// NEW route - show form to create a new task
app.get("/tasks/new", function(req, res) {
    res.render("tasks/new");
});

// CREATE route - add new task to the DB
app.post("/tasks", function(req, res) {
    res.redirect("/tasks");
});

// edit task route
app.get("/tasks/:id/edit", function(req, res) {
     res.render("tasks/edit");
});

// update task route
app.put("/tasks/:id", function(req, res) {
    res.redirect("/tasks");
});

// destroy task route
app.delete("/tasks/:id", function(req, res) {
    console.log("TODO: 'delete campground' logic");
    res.redirect("/tasks");
});

//------------------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running"); 
});