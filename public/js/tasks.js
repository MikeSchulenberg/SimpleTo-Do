/* global $ */

// Check off specific todos by clicking
// $("ul").on("click", "li", function() {
//     $(this).toggleClass("completed");
//     console.log("task clicked");
// });

// Click on X to delete todo
$("ul").on("click", "span", function(event) {
    $(this).parent().toggleClass("completed");
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    event.stopPropagation();    // prevent event bubbling
});

$("input[type='text']").keypress(function(event) {
    // has Enter been pressed?
    if (event.which === 13) {
        // grab new todo text from input
        var todoText = $(this).val();
        $(this).val("");
        // create a new li and add to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

// $("#toggle-form").click(function(){
// 	$("input[type='text']").fadeToggle();
// });