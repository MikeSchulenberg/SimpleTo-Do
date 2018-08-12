/* global $ */

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
    $(this).siblings("#new-todo-div").fadeIn(500);
});

// Hide the 'new todo' form
$("#cancel-new-todo").on("click", function() {
    $(this).closest("form").find("#new-todo-div").fadeOut(500, function() {
        $(this).closest("form").find("#new-todo-input").val("");
    });
});

/* Submit a new todo when Enter is pressed in the text input or when the Submit
   is clicked. ---------------------------------------------------------------*/

var submitForm = function(thisObj) {
    thisObj.closest("form").find("#new-todo-input").prop("readonly", true);
    thisObj.closest("form").find("#new-todo-div").fadeOut(500, function() {
        thisObj.closest("form").find("#new-todo-input").prop("readonly", false);
        thisObj.closest("form").submit();
    });
};

$("#new-todo-input").on("keypress", function(e) {
    if (e.which === 13) {
        e.preventDefault();
        submitForm($(this));
    }
});

$("#submit-new-todo").on("click", function() {
    submitForm($(this));
});

//------------------------------------------------------------------------------