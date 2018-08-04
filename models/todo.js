var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    title: String,
    priority: String
});

module.exports = mongoose.model("Todo", todoSchema);