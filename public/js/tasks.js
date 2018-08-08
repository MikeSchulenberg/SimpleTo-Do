/* global $ */

// initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Click on checkbox to delete todo
$("ul").on("click", "input[type=checkbox]", function(event) {
    $(this).closest("li").find(".task-body").toggleClass("completed");
    $(this).closest("li").fadeOut(500, function() {
        $(this).find("#delete-todo-checkbox").submit();
    });
});

// $("input[type='text']").keypress(function(event) {
//     // has Enter been pressed?
//     if (event.which === 13) {
//         // grab new todo text from input
//         var todoText = $(this).val();
//         $(this).val("");
//         // create a new li and add to ul
//         var todoPriority = "high-priority"; // temp
//         $("ul").append(
//             `
//             <li>
//                 <div class="task-left-control ${todoPriority}">
//                     <input type="checkbox">
//                 </div>
//                 <div class="task-body">
//                     ${todoText}
//                 </div>
//                 <a href="/todos/123/edit"><i class="far fa-edit" data-toggle="tooltip" data-placement="top" title="Edit"></i></a>
//             </li>
//             `
//         );
        
//         // reinitialize tooltips
//         $(function () {
//             $('[data-toggle="tooltip"]').tooltip()
//         });
//     }
// });

// Make radio buttons appear as if they've been clicked
$(".clicked-radio-button").button('toggle')