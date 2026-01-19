const inputName = document.querySelector("#taskName");
const inputCategory = document.querySelector("#taskCategory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskContainer = document.querySelector(".taskContainer");
const categoryFilter = document.querySelector("#filterCategory");
const statusFilter = document.querySelector("#filterStatus");
const searchBar = document.querySelector("#searchBar");

let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

function handleInput() {
    const name = inputName.value.trim();
    const category = inputCategory.value.trim().toLowerCase();
    if (!name || !category) return;

    const task = {
        id: Date.now(),
        name,
        category,
        isDone: false
    };

    tasks.push(task);
    saveTasks();

    if (doesTaskMatchFilters(task)) {
        taskContainer.appendChild(createTaskElement(task));
    }

    inputName.value = "";
    inputCategory.selectedIndex = 0;
}
function createTaskElement(task) {
    const div = document.createElement("div");
    div.className = `task ${task.isDone ? "done" : "unDone"}`;
    div.dataset.id = task.id;

    div.innerHTML = `
        <div class="rightContent">
            <h3>${task.name}</h3>
            <h4>${task.category}</h4>
        </div>
        <div class="leftContent">
            <button data-action="toggle">
                ${task.isDone ? "Undo" : "Done"}
            </button>
            <button data-action="edit">Edit</button>
            <button data-action="delete">Delete</button>
        </div>
    `;

    return div;
}
function renderTasks(taskList = taskArray) {
    taskContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();

    taskList.forEach(task => {
        fragment.appendChild(createTaskElement(task));
    });

    taskContainer.appendChild(fragment);
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function checkFilter(task) {
    const category = categoryFilter.value.toLowerCase()
    const status = statusFilter.value.toLowerCase();
    const search = searchBar.value.trim().toLowerCase();

    if (category !== "all" && task.category !== category) return false;
    if (status === "completed" && !task.isDone) return false;
    if (search && !task.name.toLowerCase().includes(search)) return false
}

