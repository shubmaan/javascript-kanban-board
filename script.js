let columns = document.querySelectorAll(".columns");
let delBtn = document.querySelectorAll(".delBtn");
let tasks = document.querySelectorAll(".task");
let allTaskTodo = document.querySelector(".allTask-toDo");
let allTaskInProgress = document.querySelector(".allTask-InProgress");
let allTaskDone = document.querySelector(".allTask-done");
let allTaskTodoCount = document.getElementById("allTask-toDo-count");
let allTaskInProgressCount = document.getElementById("allTask-InProgress-count");
let allTaskDoneCount = document.getElementById("allTask-done-count");
let addNewTaskBtn = document.querySelector("#addNewTaskBtn");
let addNewTaskPage = document.querySelector(".addNewTaskPage");
let addNewTaskCancelBtn = document.querySelector("#addNewTaskCancelBtn");
let addNewTaskOkBtn = document.querySelector("#addNewTaskOkBtn");
let TaskDiscraption = document.querySelector(".TaskDiscraption");
let taskTitle = document.querySelector(".taskTitle");
let addNewTaskCls = document.querySelector(".addNewTask");

let dragEndCol = null;

function dragDrop() {
    document.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("task")) {
            dragEndCol = e.target;
        }
    });

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

function addNewTask(){
    addNewTaskPage.addEventListener("click",(e)=>{
        if (!(addNewTaskCls.contains(e.target))){
            addNewTaskPage.style.display = "none";
        } 
    })

    addNewTaskBtn.addEventListener("click",()=>{
        addNewTaskPage.style.display = "flex";

    })
    addNewTaskCancelBtn.addEventListener("click", () => {
        addNewTaskPage.style.display = "none";
    });
    addNewTaskOkBtn.addEventListener("click", () => {
        if (TaskDiscraption.value != "" && taskTitle.value != ""){
            const div = document.createElement("div");
            div.setAttribute("draggable", "true");
            div.classList.add("task");
            const title = document.createElement("h2");
            title.classList.add("title");
            title.textContent = taskTitle.value;
            const discraption = document.createElement("p");
            discraption.classList.add("discraption");
            discraption.textContent = TaskDiscraption.value;
            const delBtn = document.createElement("button");
            delBtn.classList.add("delBtn", "btn");
            delBtn.textContent = "Delete";

            div.appendChild(title);
            div.appendChild(discraption);
            div.appendChild(delBtn);

            allTaskTodo.appendChild(div);






        }
            addNewTaskPage.style.display = "none";
            displayCount();
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
    addNewTask();
    dragDrop();
    displayCount();
}



mainFun();