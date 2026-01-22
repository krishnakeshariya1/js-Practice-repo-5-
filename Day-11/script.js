
const taskContainer = document.querySelector(".taskContainer");
const inputName = document.querySelector("#taskName");
const inputCategory = document.querySelector("#taskCategory");
const addBtn = document.querySelector("#addTaskBtn");
const searchBar = document.querySelector("#searchBar");

/* ---------- STATE ---------- */
let taskStore = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

/* ---------- UTILITIES ------- */
function saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskStore));
}

function createTaskElement(task) {
    const taskEl = document.createElement("div");
    taskEl.className = ` task ${task.isDone ? "done" : "unDone"}`;
    taskEl.dataset.id = task.id;

    taskEl.innerHTML = `
    <span class="task-name">${task.name}</span>
    <input class="task-name-input" hidden />

    <span class="task-category">${task.category}</span>
    <input class="task-category-input" hidden />

    <button data-action="toggle">${task.isDone ? "Undo" : "Done"}</button>
    <button data-action="edit">Edit</button>
    <button data-action="save" hidden>Save</button>
    <button data-action="cancel" hidden>Cancel</button>
    <button data-action="delete">Delete</button>
  `;

    return taskEl;
}
function initialRender() {
    const fragment = document.createDocumentFragment();

    taskStore.forEach(task => {
        fragment.appendChild(createTaskElement(task));
    });

    taskContainer.appendChild(fragment);
}

function addTask() {
    const name = inputName.value.trim();
    const category = inputCategory.value.trim().toLowerCase();

    if (!name || !category) return;

    const task = {
        id: Date.now(),
        name,
        category,
        isDone: false
    };

    taskStore.push(task);
    saveToStorage();

    taskContainer.appendChild(createTaskElement(task));

    inputName.value = "";
    inputCategory.value = "";
}

function toggleTask(taskEl, taskId) {
    const task = taskStore.find(t => t.id === taskId);
    if (!task) return;

    task.isDone = !task.isDone;

    taskEl.classList.toggle("done", task.isDone);
    taskEl.classList.toggle("unDone", !task.isDone);
    taskEl.querySelector('[data-action="toggle"]').textContent =
        task.isDone ? "Undo" : "Done";

    saveToStorage();
}

function deleteTask(taskEl, taskId) {
    taskStore = taskStore.filter(t => t.id !== taskId);
    saveToStorage();
    taskEl.remove();
}

