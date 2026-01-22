// ======================
// DOM REFERENCES
// ======================
const inputName = document.querySelector("#taskName");
const inputCategory = document.querySelector("#taskCategory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskContainer = document.querySelector(".taskContainer");
const categoryFilter = document.querySelector("#filterCategory");
const statusFilter = document.querySelector("#filterStatus");
const searchBar = document.querySelector("#searchBar");


let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;


function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function handleAddTask() {
  const name = inputName.value.trim();
  const category = inputCategory.value.trim().toLowerCase();

  if (!name || !category) return;

  taskArray.push({
    id: Date.now(),
    name,
    category,
    isDone: false
  });

  saveToLocalStorage();
  applyAndRender();

  inputName.value = "";
  inputCategory.selectedIndex = 0;
}

function getFilteredTasks() {
  let result = [...taskArray];

  const category = categoryFilter.value.toLowerCase();
  const status = statusFilter.value.toLowerCase();
  const search = searchBar.value.trim().toLowerCase();

  if (category !== "all") {
    result = result.filter(t => t.category === category);
  }

  if (status !== "all") {
    result = result.filter(t =>
      status === "completed" ? t.isDone : !t.isDone
    );
  }

  if (search) {
    result = result.filter(t =>
      t.name.toLowerCase().includes(search)
    );
  }

  return result;
}

function renderTasks(tasks) {
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
    taskContainer.innerHTML = `<p class="para">No tasks found</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  tasks.forEach(task => {
    fragment.appendChild(createTaskNode(task));
  });

  taskContainer.appendChild(fragment);
}

function applyAndRender() {
  renderTasks(getFilteredTasks());
}

function createTaskNode(task) {
  const taskEl = document.createElement("div");
  taskEl.className = `task ${task.isDone ? "done" : "undone"}`;
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

taskContainer.addEventListener("click", e => {
  const action = e.target.dataset.action;
  if (!action) return;

  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  const taskId = Number(taskEl.dataset.id);

  if (action === "edit") enterEditMode(taskEl, taskId);
  if (action === "save") saveEdit(taskEl, taskId);
  if (action === "cancel") exitEditMode(taskEl);
  if (action === "delete") deleteTask(taskId);
  if (action === "toggle") toggleTask(taskId);
});


function enterEditMode(taskEl, taskId) {
  if (editingTaskId !== null) return;

  editingTaskId = taskId;

  const nameSpan = taskEl.querySelector(".task-name");
  const nameInput = taskEl.querySelector(".task-name-input");

  const categorySpan = taskEl.querySelector(".task-category");
  const categoryInput = taskEl.querySelector(".task-category-input");

  nameInput.value = nameSpan.textContent;
  categoryInput.value = categorySpan.textContent;

  nameSpan.hidden = true;
  categorySpan.hidden = true;

  nameInput.hidden = false;
  categoryInput.hidden = false;

  toggleButtons(taskEl, true);

  nameInput.focus();
}

function saveEdit(taskEl, taskId) {
  const nameInput = taskEl.querySelector(".task-name-input");
  const categoryInput = taskEl.querySelector(".task-category-input");

  const newName = nameInput.value.trim();
  const newCategory = categoryInput.value.trim().toLowerCase();

  if (!newName) return;

  const task = taskArray.find(t => t.id === taskId);
  task.name = newName;
  task.category = newCategory;

  taskEl.querySelector(".task-name").textContent = newName;
  taskEl.querySelector(".task-category").textContent = newCategory;

  exitEditMode(taskEl);
  saveToLocalStorage();
}

function exitEditMode(taskEl) {
  editingTaskId = null;

  taskEl.querySelector(".task-name").hidden = false;
  taskEl.querySelector(".task-category").hidden = false;

  taskEl.querySelector(".task-name-input").hidden = true;
  taskEl.querySelector(".task-category-input").hidden = true;

  toggleButtons(taskEl, false);
}

function toggleButtons(taskEl, isEditing) {
  taskEl.querySelector('[data-action="edit"]').hidden = isEditing;
  taskEl.querySelector('[data-action="save"]').hidden = !isEditing;
  taskEl.querySelector('[data-action="cancel"]').hidden = !isEditing;
}


function deleteTask(id) {
  taskArray = taskArray.filter(t => t.id !== id);
  saveToLocalStorage();
  applyAndRender();
}

function toggleTask(id) {
  const task = taskArray.find(t => t.id === id);
  task.isDone = !task.isDone;
  saveToLocalStorage();
  applyAndRender();
}

taskContainer.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  if (editingTaskId === null) return;

  const taskEl = e.target.closest(".task");
  taskEl?.querySelector('[data-action="save"]')?.click();
});

document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    searchBar.focus();
  }

  if (e.key === "Escape" && editingTaskId !== null) {
    const taskEl = document.querySelector(
      `.task[data-id="${editingTaskId}"]`
    );
    taskEl && exitEditMode(taskEl);
  }
});


categoryFilter.addEventListener("change", applyAndRender);
statusFilter.addEventListener("change", applyAndRender);
searchBar.addEventListener("input", debounce(applyAndRender));


addTaskBtn.addEventListener("click", handleAddTask);

[inputName, inputCategory].forEach(el => {
  el.addEventListener("keydown", e => {
    if (e.key === "Enter") handleAddTask();
  });
});


applyAndRender();
