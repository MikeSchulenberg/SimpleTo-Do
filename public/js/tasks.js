/* global $ */

var openEditTodoDiv = null;

// initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Delete a todo when its checkbox is clicked
$("ul").on("click", "input[type=checkbox]", function() {
    $(this).closest("li").find(".task-body").toggleClass("completed");
    $(this).closest("li").fadeOut(500, function() {
        $(this).find("#delete-todo-checkbox").submit();
    });
});

// Make radio buttons appear as if they've been clicked
$(".clicked-radio-button").button('toggle')

// Unhide the 'new todo' form
$("#new-todo-input").on("click", function() {
    // Hide any 'edit todo' forms that happen to have been left open
    hideEditTodoForm();
    
    $(this).siblings("#new-todo-div").fadeIn(500);
});

// Hide the 'new todo' form
$("#cancel-new-todo").on("click", function() {
    hideNewTodoForm();
});

// Subtmit a new todo when Enter is pressed in the 'new todo' form's text input
$("#new-todo-input").on("keypress", function(e) {
    if (e.which === 13) {
        e.preventDefault();
        submitForm($(this));
    }
});

// Submit a new todo when the Submit button in the 'new todo' form is clicked
$("#submit-new-todo").on("click", function() {
    submitForm($(this));
});

// Unhide the 'edit' form for a single todo
$("ul").on("click", ".edit-todo-toggle", function() {
    // Hide the 'new todo' form if it happens to have been left open
    hideNewTodoForm();
    
    // Hide any 'edit todo' forms that happen to have been left open
    var thisObj = $(this);
    hideEditTodoForm(function() {
        // Unhide the target 'edit todo' form
        thisObj.closest("li").find(".task-container").fadeOut(250, function() {
            thisObj.closest("li").find(".edit-todo-div").fadeIn(400, function() {
                openEditTodoDiv = thisObj.closest("li").find(".edit-todo-div");
            });
        });
    });
});

// Hide the 'edit' form for a single todo
$("ul").on("click", ".cancel-todo-update", function() {
    hideEditTodoForm();
});

// Subtmit an updated todo when Enter is pressed in an 'edit todo' form's text input
$("ul").on("click", "#edit-todo-input", function(e) {
    if (e.which === 13) {
        e.preventDefault();
        submitUpdatedTodo($(this));
    }
});

// Submit an updated todo when the Submit button in an 'edit todo' form is clicked
$("ul").on("click", ".submit-todo-update", function() {
    submitUpdatedTodo($(this));
});

//------------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------------

// Hide the 'new todo' form
var hideNewTodoForm = function() {
    $("#new-todo-div").fadeOut(500, function() {
        $("#new-todo-input").val("");
    });
};

// If an 'edit todo' form is currently visible, hide it
var hideEditTodoForm = function(callback) {
    if (openEditTodoDiv !== null) {
        openEditTodoDiv.fadeOut(400, function() {
            openEditTodoDiv.closest("li").find(".task-container").fadeIn(250, function() {
                openEditTodoDiv = null;
                
                if (typeof callback === "function") {
                    callback();
                }
            });
        });
    }
    
    else {
        if (typeof callback === "function") {
            callback();
        }
    }
};

// Submit a new todo
var submitForm = function(thisObj) {
    thisObj.closest("form").find("#new-todo-input").prop("readonly", true);
    thisObj.closest("form").find("#new-todo-div").fadeOut(500, function() {
        thisObj.closest("form").find("#new-todo-input").prop("readonly", false);
        thisObj.closest("form").submit();
    });
};

// Submit an updated todo
var submitUpdatedTodo = function(thisObj) {
    thisObj.closest(".edit-todo-div").find("#edit-todo-input").prop("readonly", true);
    thisObj.closest(".edit-todo-div").fadeOut(500, function() {
        thisObj.closest(".edit-todo-div").find("#edit-todo-input").prop("readonly", false);
        thisObj.closest(".edit-todo-div").find(".edit-todo-form").submit();
    });
};

// var submitUpdatedTodo = function(thisObj) {
//     thisObj.closest("form").find("#edit-todo-input").prop("readonly", true);
//     thisObj.closest("form").find(".edit-todo-div").fadeOut(500, function() {
//         thisObj.closest("form").find("#edit-todo-input").prop("readonly", false);
//         thisObj.closest("form").submit();
//     });
// };