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

// INDEX route - show all todos
app.get("/todos", function(req, res) {
    console.log("TODO: finish 'show all todos' route");
    res.render("todos/index");
});

// show account registration form
app.get("/register", function(req, res) {
     res.render("register");
});

// handle signup logic
app.post ("/register", function(req, res) {
    console.log("TODO: handle user registration logic");
    res.redirect("/todos");
});

// show login form
app.get("/login", function(req, res) {
    res.render("login"); 
});

// handle login logic
app.post("/login", function(req, res) {
    console.log("TODO: handle login logic");
    res.redirect("/todos"); 
});

// NEW route - show form to create a new todo
app.get("/todos/new", function(req, res) {
    res.render("todos/new");
});

// CREATE route - add new todo to the DB
app.post("/todos", function(req, res) {
    console.log("TODO: finish 'create new todo' route");
    res.redirect("/todos");
});

// edit todo route
app.get("/todos/:id/edit", function(req, res) {
     console.log("TODO: finish 'edit todo' route");
     res.render("todos/edit");
});

// update todo route
app.put("/todos/:id", function(req, res) {
    console.log("TODO: finish 'update todo' route");
    res.redirect("/todos");
});

// destroy todo route
app.delete("/todos/:id", function(req, res) {
    console.log("TODO: finish 'delete campground' route");
    res.redirect("/todos");
});

//------------------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running"); 
});