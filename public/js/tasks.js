/* global $ bootbox */

var openEditTodoDiv = null;

// initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Submit a completed todo when its checkbox is clicked
$("#todo-list").on("click", "input[type=checkbox]", function() {
    $(this).closest(".delete-todo-checkbox").submit();
});

/* If the user clicks the Delete button for a todo, request user confirmation 
before deleting */
$("#todo-list").on("click", ".delete-todo-button", function() {
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

/* Send AJAX request to delete a todo. If the task is being deleted because the
user marked a todo as complete, rather using the Delete button, update the user stats. */
$("#todo-list").on("submit", ".delete-todo-checkbox, .delete-todo-form", function(e) {
    e.preventDefault();
    var form = $(this);
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
            
            if (form.hasClass("delete-todo-checkbox")) {
                updateUserStats(data);
            }
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
        
        // Display the new todo on the page

        /* Append an empty, hidden <li> for the new todo so it can be replaced
        with the todo's actual data. */
        $("#todo-list").append(
            `
            <li id=${data._id} hidden></li>
            `
        );
        
        /* Load the contents of the new todo's <li>, rather than the <li> itself,
        into the empty <li>. Loading just the <li> contents prevents nested <li>s. */
        $("#" + data._id).load(document.URL + " #" + data._id + " > *", function() {
            $("#" + data._id).removeAttr("hidden");
        });
    });
});

// Unhide the 'edit' form for a single todo
$("#todo-list").on("click", ".edit-todo-toggle", function() {
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
$("#todo-list").on("click", ".cancel-todo-update", function() {
    hideEditTodoForm();
});

// Submit an updated todo to the server, then refresh the updated todo on the page
$("#todo-list").on("submit", ".edit-todo-form", function(e) {
    e.preventDefault();

    var id = $(this).closest("li").attr("id");
    var actionUrl = $(this).attr("action");
    var updatedTodo = $(this).serialize();
    
    $.ajax({
        url: actionUrl,
        data: updatedTodo,
        type: "PUT",
        success: function() {
            /* Load the contents of the updated todo's <li>, rather than the <li> itself.
            Loading just the <li> contents prevents nested <li>s. */
            $("#" + id).load(document.URL + " #" + id + " > *");
            hideEditTodoForm();
        }
    })
});

//------------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------------

// Hide the 'new todo' form
var hideNewTodoForm = function() {
    $("#new-todo-input").val("");
    $("#new-todo-div").hide();
    $("#new-todo-div").find("label").removeClass("clicked-radio-button");
    $("#new-todo-div").find(".button-medium-priority").addClass("clicked-radio-button");
    $(".clicked-radio-button").button('toggle')
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
    $originalItem = $("#user-stats-container");
    
    $.ajax({
        url: "/updateUserStats",
        data: {
            priority: priority
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