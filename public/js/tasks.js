/* global $ bootbox */

var openEditTodoDiv = null;

// initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Submit a completed todo when its checkbox is clicked
$("ul").on("click", "input[type=checkbox]", function() {
    $(this).closest(".delete-todo-checkbox").submit();
});

// Send AJAX request to delete the todo, then update the user stats
$("ul").on("submit", ".delete-todo-checkbox", function(e) {
    e.preventDefault();
    var actionUrl = $(this).attr("action");
    $itemToDelete = $(this).closest("li");
    $.ajax({
        url: actionUrl,
        type: "DELETE",
        itemToDelete: $itemToDelete,
        data: {
            isCheckbox: true
        },
        success: function(data) {
            this.itemToDelete.remove();
            updateUserStats(data);
        }
    });
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

// Submit a new todo to the server, then refresh the todo list on the page
$("#new-todo-form").on("submit", function(e) {
    e.preventDefault();
    var newTodo = $(this).serialize();
    $.post("/todos", newTodo, function(data) {
        hideNewTodoForm();
        $("#new-todo-input").val("");
        
        // Refresh the todo list on the page
        $("#todo-list").load(document.URL + " #todo-list");
    });
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

/* Send server request to update user stats such as number of Tasks Completed 
and Achievement Points */
var updateUserStats = function(data) {
    var priority = data.priority;
    var userStats = $("#user-stats").serialize();
    $originalItem = $("#user-stats-container");
    
    $.ajax({
        url: "/todos/updateUserStats",
        data: {
            priority: priority,
            userStats
        },
        type: "POST",
        originalItem: $originalItem,
        success: function(data) {
            this.originalItem.html(
                `
                <div id="user-stats" class="d-flex flex-column bd-highlight ml-3">
                    <div class="bd-highlight"><i class="far fa-check-square mr-2"></i>Completed Tasks: ${data.completedTasks}</div>
                    <div class="bd-highlight"><i class="fas fa-trophy mr-2"></i>Achievement Points: ${data.achievementPoints}</div>
                </div>
                `
            )
        }
    })
};