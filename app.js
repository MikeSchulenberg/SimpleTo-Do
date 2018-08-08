// init express
var express = require("express");
var app = express();

// init method-override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// init body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// init express-sanitizer
var expressSanitizer = require("express-sanitizer");
app.use(expressSanitizer());

// init mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/simple-to-do-test", {useNewUrlParser: true});

// seed the DB with data
var seedDB = require("./DBseeds.js");
seedDB();

// configure other stuff
app.set("view engine", "ejs");
app.use(express.static("public"));

// init routes
var indexRoutes = require("./routes/index"),
    todoRoutes  = require("./routes/todos");
app.use(indexRoutes);
app.use("/todos", todoRoutes);

//------------------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running"); 
});