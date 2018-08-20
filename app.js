// init express
var express = require("express");
var app = express();

// init method-override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// init body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// init connect-flash
var flash = require("connect-flash");
app.use(flash());

// init express-sanitizer
var expressSanitizer = require("express-sanitizer");
app.use(expressSanitizer());

// init mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/simple-to-do-test", {useNewUrlParser: true});

// init passport
var passport        = require("passport"),
    localStrategy   = require("passport-local");
    
// init models
var User = require("./models/user");

// seed the DB with data
var seedDB = require("./DBseeds.js");
// seedDB();

// configure passport: start ---------------------------------------------------

app.use(require("express-session")({
    secret: "The octopus is a smart and wily creature of the deep",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// configure passport: end -----------------------------------------------------

// configure other stuff
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// init routes
var indexRoutes = require("./routes/index"),
    todoRoutes  = require("./routes/todos");
app.use(indexRoutes);
app.use("/todos", todoRoutes);

//------------------------------------------------------------------------------

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running"); 
});