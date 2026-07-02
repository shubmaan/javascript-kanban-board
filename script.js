let columns = document.querySelectorAll(".columns");
let delBtn = document.querySelectorAll(".delBtn");
let tasks = document.querySelectorAll(".task");
let allTaskTodo = document.querySelector(".allTask-toDo");
let allTaskInProgress = document.querySelector(".allTask-InProgress");
let allTaskDone = document.querySelector(".allTask-done");
let allTaskTodoCount = document.getElementById("allTask-toDo-count");
let allTaskInProgressCount = document.getElementById(
    "allTask-InProgress-count",
);
let allTaskDoneCount = document.getElementById("allTask-done-count");
let addNewTaskBtn = document.querySelector("#addNewTaskBtn");
let addNewTaskPage = document.querySelector(".addNewTaskPage");
let addNewTaskCancelBtn = document.querySelector("#addNewTaskCancelBtn");
let addNewTaskOkBtn = document.querySelector("#addNewTaskOkBtn");
let TaskDescription = document.querySelector(".TaskDescription");
let taskTitle = document.querySelector(".taskTitle");
let addNewTaskCls = document.querySelector(".addNewTask");

let dragEndCol = null;

function storingDataInLocalStorage() {
    localStorage.setItem("allTaskTodo", JSON.stringify(allTaskTodo.innerHTML));
    localStorage.setItem(
        "allTaskInProgress",
        JSON.stringify(allTaskInProgress.innerHTML),
    );
    localStorage.setItem("allTaskDone", JSON.stringify(allTaskDone.innerHTML));
}

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
            storingDataInLocalStorage();
        });
    });
}

function addNewTask() {
    addNewTaskPage.addEventListener("click", (e) => {
        if (!addNewTaskCls.contains(e.target)) {
            addNewTaskPage.style.display = "none";
        }
    });

    addNewTaskBtn.addEventListener("click", () => {
        TaskDescription.value = "";
        taskTitle.value = "";
        addNewTaskPage.style.display = "flex";
    });
    addNewTaskCancelBtn.addEventListener("click", () => {
        addNewTaskPage.style.display = "none";
    });
    addNewTaskOkBtn.addEventListener("click", () => {
        if (TaskDescription.value != "" && taskTitle.value != "") {
            allTaskTodo.innerHTML += `
                <div class="task" draggable="true">
                    <h2 class="title">${taskTitle.value}</h2>
                    <p class="description">${TaskDescription.value}</p>
                    <button class="delBtn btn">Delete</button>
                </div>
            `;
        }
        addNewTaskPage.style.display = "none";
        displayCount();
        storingDataInLocalStorage();
    });
}

function displayCount() {
    allTaskTodoCount.textContent = allTaskTodo.children.length;
    allTaskInProgressCount.textContent = allTaskInProgress.children.length;
    allTaskDoneCount.textContent = allTaskDone.children.length;
}

function mainFun() {
    allTaskTodo.innerHTML = JSON.parse(localStorage.getItem("allTaskTodo"));
    allTaskInProgress.innerHTML = JSON.parse(
        localStorage.getItem("allTaskInProgress"),
    );
    allTaskDone.innerHTML = JSON.parse(localStorage.getItem("allTaskDone"));

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("delBtn")) {
            e.target.closest(".task").remove();
            displayCount();
            storingDataInLocalStorage();
        }
    });
    addNewTask();
    dragDrop();
    displayCount();
}

mainFun();
