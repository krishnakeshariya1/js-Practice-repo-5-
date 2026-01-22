
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

function enterEditMode(taskEl, taskId) {
    if (editingTaskId !== null) return;

    editingTaskId = taskId;

    const nameSpan = taskEl.querySelector(".task-name");
    const nameInput = taskEl.querySelector(".task-name-input");
    const catSpan = taskEl.querySelector(".task-category");
    const catInput = taskEl.querySelector(".task-category-input");

    nameInput.value = nameSpan.textContent;
    catInput.value = catSpan.textContent;

    nameSpan.hidden = true;
    catSpan.hidden = true;
    nameInput.hidden = false;
    catInput.hidden = false;

    toggleEditButtons(taskEl, true);

    nameInput.focus();
}

function saveEdit(taskEl, taskId) {
    const nameInput = taskEl.querySelector(".task-name-input");
    const catInput = taskEl.querySelector(".task-category-input");

    const newName = nameInput.value.trim();
    const newCategory = catInput.value.trim();

    if (!newName) return;

    const task = taskStore.find(t => t.id === taskId);
    if (!task) return;

    task.name = newName;
    task.category = newCategory;

    taskEl.querySelector(".task-name").textContent = newName;
    taskEl.querySelector(".task-category").textContent = newCategory;

    exitEditMode(taskEl);
    saveToStorage();
}

function exitEditMode(taskEl) {
    editingTaskId = null;

    taskEl.querySelector(".task-name").hidden = false;
    taskEl.querySelector(".task-category").hidden = false;
    taskEl.querySelector(".task-name-input").hidden = true;
    taskEl.querySelector(".task-category-input").hidden = true;

    toggleEditButtons(taskEl, false);
}

function toggleEditButtons(taskEl, editing) {
    taskEl.querySelector('[data-action="edit"]').hidden = editing;
    taskEl.querySelector('[data-action="save"]').hidden = !editing;
    taskEl.querySelector('[data-action="cancel"]').hidden = !editing;
}


taskContainer.addEventListener("click", e => {
    const action = e.target.dataset.action;
    if (!action) return;

    const taskEl = e.target.closest(".task");
    if (!taskEl) return;

    const taskId = Number(taskEl.dataset.id);

    if (action === "toggle") toggleTask(taskEl, taskId);
    if (action === "delete") deleteTask(taskEl, taskId);
    if (action === "edit") enterEditMode(taskEl, taskId);
    if (action === "save") saveEdit(taskEl, taskId);
    if (action === "cancel") exitEditMode(taskEl);
});


document.addEventListener("keydown", e => {
    if (e.key === "Escape" && editingTaskId !== null) {
        const taskEl = document.querySelector(`[data-id="${editingTaskId}"]`);
        if (taskEl) exitEditMode(taskEl);
    }
});


addBtn.addEventListener("click", addTask);
[inputName, inputCategory].forEach(el => {
    el.addEventListener("keydown", e => {
        if (e.key === "Enter") addTask();
    });
});


initialRender();
