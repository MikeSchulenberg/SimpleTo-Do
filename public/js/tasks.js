/* global $ */

// Check off specific todos by clicking
// $("ul").on("click", "li", function() {
//     $(this).toggleClass("completed");
//     console.log("task clicked");
// });

// Click on X to delete todo
$("ul").on("click", "input[type=checkbox]", function(event) {
    $(this).parent().parent().toggleClass("completed");
    $(this).parent().parent().fadeOut(500, function() {
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
        var todoPriority = "high-priority"; // temp
        $("ul").append(
            `
            <li>
                <span class="${todoPriority}">
                    <input type="checkbox">
                </span> 
                <span class="inline">
                    ${todoText}
                </span>
                <span class="inline">
                    <i class="fas fa-ellipsis-v"></i>
                </span>
            </li>
            `
        );
    }
});

// $("#toggle-form").click(function(){
// 	$("input[type='text']").fadeToggle();
// });