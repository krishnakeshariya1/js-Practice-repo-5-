// ===== DOM REFERENCES =====
const inputName = document.querySelector("#taskName");
const inputCategory = document.querySelector("#taskCategory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskContainer = document.querySelector(".taskContainer");
const categoryFilter = document.querySelector("#filterCategory");
const statusFilter = document.querySelector("#filterStatus");

let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

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

    taskArray.push(task);
    saveAndRender();

    inputName.value = "";
    inputCategory.selectedIndex = 0;
}

function renderCard(tasks = taskArray) {
    if (tasks.length === 0) {
        taskContainer.innerHTML = `<p class="para">No tasks found</p>`;
        return;
    }

    let html = "";

    tasks.forEach(task => {
        html += `
            <div class="task ${task.isDone ? "done" : "unDone"}">
                <div class="rightContent">
                    <h3>${task.name}</h3>
                    <h4>${task.category}</h4>
                </div>
                <div class="leftContent">
                    <button onclick="toggleDone(${task.id})" class="doneBtn">
                        ${task.isDone ? "Undo" : "Done"}
                    </button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
    });

    taskContainer.innerHTML = html;
}

function deleteTask(id) {
    taskArray = taskArray.filter(task => task.id !== id);
    saveAndRender();
}

function toggleDone(id) {
    const task = taskArray.find(task => task.id === id);
    if (task) task.isDone = !task.isDone;
    saveAndRender();
}

function applyFilters() {
    let result = [...taskArray];

    const categoryValue = categoryFilter.value.toLowerCase();
    const status = statusFilter.value.toLowerCase();

    if (categoryValue !== "all") {
        result = result.filter(task => task.category.toLowerCase() === categoryValue);
    }
    if (categoryValue !== "all") {
        result = result.filter(task => {
            return status === "completed" ? task.isDone : !task.isDone;
        })
    }
    renderCard(result);
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    applyFilters();
}

addTaskBtn.addEventListener("click", handleInput);
categoryFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

renderCard();
