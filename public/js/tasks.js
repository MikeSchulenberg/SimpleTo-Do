/* global $ bootbox */

var openEditTodoDiv = null;

// initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Delete a todo when its checkbox is clicked
$("ul").on("click", "input[type=checkbox]", function() {
    $(this).closest("#delete-todo-checkbox").submit();
});

// Make radio buttons appear as if they've been clicked
$(".clicked-radio-button").button('toggle')

// Unhide the 'new todo' form
$("#new-todo-input").on("click", function() {
    // Hide any 'edit todo' forms that happen to have been left open
    hideEditTodoForm();
    
    $(this).siblings("#new-todo-div").show();
});

// Hide the 'new todo' form
$("#cancel-new-todo").on("click", function() {
    hideNewTodoForm();
});

// Unhide the 'edit' form for a single todo
$("ul").on("click", ".edit-todo-toggle", function() {
    // Hide the 'new todo' form if it happens to have been left open
    hideNewTodoForm();
    
    // Hide any 'edit todo' forms that happen to have been left open
    var thisObj = $(this);
    hideEditTodoForm(function() {
        // Unhide the target 'edit todo' form
        thisObj.closest("li").find(".task-container").hide(0, function() {
            thisObj.closest("li").find(".edit-todo-div").show(0, function() {
                openEditTodoDiv = thisObj.closest("li").find(".edit-todo-div");
            });
        });
    });
});

// Hide the 'edit' form for a single todo
$("ul").on("click", ".cancel-todo-update", function() {
    hideEditTodoForm();
});

// Request user confirmation to delete a single todo
$("ul").on("click", ".delete-todo-button", function() {
    var thisObj = $(this);
    
    bootbox.confirm({
        message: "Are you sure you want to delete this to-do?", 
        buttons: {
            confirm: {
                label: "Yes",
                className: "btn-danger"
            },
            
            cancel: {
                label: "No",
                className: "btn-primary"
            }
        },
        
        callback: function(result) {
            if (result) {
                thisObj.closest(".edit-todo-div").find(".delete-todo-form").submit();
            }
        }
    });
});

//------------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------------

// Hide the 'new todo' form
var hideNewTodoForm = function() {
    $("#new-todo-input").val("");
    $("#new-todo-div").hide();
};

// If an 'edit todo' form is currently visible, hide it
var hideEditTodoForm = function(callback) {
    if (openEditTodoDiv !== null) {
        openEditTodoDiv.hide(0, function() {
            openEditTodoDiv.closest("li").find(".task-container").show(0, function() {
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