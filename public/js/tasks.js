/* global $ */

// initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Click on checkbox to delete todo
$("ul").on("click", "input[type=checkbox]", function() {
    $(this).closest("li").find(".task-body").toggleClass("completed");
    $(this).closest("li").fadeOut(500, function() {
        $(this).find("#delete-todo-checkbox").submit();
    });
});

// Unhide the 'new todo' form
$("#new-todo-input").on("click", function() {
    $(this).siblings("#new-todo-div").fadeIn(500);
    // $(this).siblings("#new-todo-div").removeClass("new-todo-div-hidden");
    // $(this).siblings("#new-todo-div").addClass("new-todo-div-visible");
});

// Unhide the 'new todo' form
// $("#new-todo-input").on("click", function(e) {
//     $(this).siblings("#new-todo-div").removeClass("new-todo-div-hidden");
//     $(this).siblings("#new-todo-div").addClass("new-todo-div-visible");
// });

// Hide the 'new todo' form
$("#cancel-new-todo").on("click", function() {
    $(this).closest("form").find("#new-todo-div").fadeOut(500, function() {
        $(this).closest("form").find("#new-todo-input").val("");
    })
    // $(this).closest("form").find("#new-todo-div").removeClass("new-todo-div-visible");
    // $(this).closest("form").find("#new-todo-div").addClass("new-todo-div-hidden");
    // $(this).closest("form").find("#new-todo-input").val("");
});

// Hide the 'new todo' form
// $("#cancel-new-todo").on("click", function(e) {
//     $(this).closest("form").find("#new-todo-div").removeClass("new-todo-div-visible");
//     $(this).closest("form").find("#new-todo-div").addClass("new-todo-div-hidden");
//     $(this).closest("form").find("#new-todo-input").val("");
// });

// Make radio buttons appear as if they've been clicked
$(".clicked-radio-button").button('toggle')