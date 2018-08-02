/* global $ */

// initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// $('[data-toggle="tooltip"]').tooltip({ boundary: "window" });

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
                        <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v" data-toggle="tooltip" data-placement="top" data-boundary="window" title="Actions"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="/todos/123/edit">Edit</a>
                            <a class="dropdown-item" href="/tasks">Delete</a>
                        </div>
                    </div>
                </div>
            </li>
            `
        );
        
        // reinitialize tooltips
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
});

            // `
            // <li>
            //     <div class="container-task">
            //         <div class="task-left-control ${todoPriority}">
            //             <input type="checkbox">
            //         </div> 
            //         <div class="task-body">
            //             ${todoText}
            //         </div>
            //         <div class="task-actions-control">
            //             <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //                 <i class="fas fa-ellipsis-v" data-toggle="tooltip" data-placement="top" data-boundary="window" title="Actions"></i>
            //             </a>
            //             <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            //                 <a class="dropdown-item" href="/todos/123/edit">Edit</a>
            //                 <a class="dropdown-item" href="/tasks">Delete</a>
            //             </div>
            //         </div>
            //     </div>
            // </li>
            // `