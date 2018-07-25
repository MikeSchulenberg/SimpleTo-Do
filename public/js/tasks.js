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
                <div class="container-task">
                    <div class="task-left-control ${todoPriority}">
                        <input type="checkbox">
                    </div> 
                    <div class="task-body">
                        ${todoText}
                    </div>
                    <div class="task-actions-control">
                        <a><i class="fas fa-ellipsis-v"></i></a>
                    </div>
                </div>
            </li>
            `
        );
    }
});

// $("#toggle-form").click(function(){
// 	$("input[type='text']").fadeToggle();
// });