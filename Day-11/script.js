function selectors(params) {
    const inputName = document.querySelector("#taskName");
    const inputCategory = document.querySelector("#taskCategory");
    const addTaskBtn = document.querySelector("#addTaskBtn");
    const taskContainer = document.querySelector(".taskContainer");
    const categoryFilter = document.querySelector("#filterCategory");
    const statusFilter = document.querySelector("#filterStatus");
    const searchBar = document.querySelector("#searchBar");
}
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

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

