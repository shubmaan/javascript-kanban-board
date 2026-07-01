let columns = document.querySelectorAll(".columns");
let delBtn = document.querySelectorAll(".delBtn");
let tasks = document.querySelectorAll(".task");
let allTaskTodo = document.querySelector(".allTask-toDo");
let allTaskInProgress = document.querySelector(".allTask-InProgress");
let allTaskDone = document.querySelector(".allTask-done");
let allTaskTodoCount = document.getElementById("allTask-toDo-count");
let allTaskInProgressCount = document.getElementById("allTask-InProgress-count");
let allTaskDoneCount = document.getElementById("allTask-done-count");

let dragEndCol;

function dragDrop() {
    tasks.forEach((task)=>{
        task.addEventListener("drag",(e)=>{
            dragEndCol = task;
        })
    })
    columns.forEach((column) => {
        column.addEventListener("dragenter", (e) => {
            e.preventDefault();
            column.classList.add("drag");
        });

        column.addEventListener("dragleave", (e) => {
            e.preventDefault();

            column.classList.remove("drag");
        });

        column.addEventListener("dragover", (e) => {
            e.preventDefault();
        });
        column.addEventListener("drop", (e) => {
            e.preventDefault();
            column.getElementsByClassName("allTask")[0].appendChild(dragEndCol);
            column.classList.remove("drag");
            displayCount();

        });
    });



    
}


function displayCount(){
    allTaskTodoCount.textContent = allTaskTodo.children.length;
    allTaskInProgressCount.textContent = allTaskInProgress.children.length;
    allTaskDoneCount.textContent = allTaskDone.children.length;
}

function mainFun(){

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("delBtn")) {
            e.target.closest(".task").remove();
            displayCount();
        }
    });
    dragDrop();
    displayCount();
}



mainFun();