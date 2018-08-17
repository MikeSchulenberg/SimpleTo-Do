var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    title: String,
    priority: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }    
    }
});

module.exports = mongoose.model("Todo", todoSchema);