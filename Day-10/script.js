
// ===== DOM REFERENCES =====
const inputName = document.querySelector("#taskName");
const inputCategory = document.querySelector("#taskCategory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskContainer = document.querySelector(".taskContainer");
const categoryFilter = document.querySelector("#filterCategory");
const statusFilter = document.querySelector("#filterStatus");

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
        const isEditing = task.id === editingTaskId;
        html += `
            <div class="task ${task.isDone ? "done" : "unDone"} " data-action="${task.id}">
                <div class="rightContent">
                    ${isEditing
                ? `
                <input class="editName" value="${task.name}">
                <select class="editCategory">
                    <option value="work" ${task.category === "work" ? "selected" : ""} >Work</option>
                    <option value="personal" ${task.category === "personal" ? "selected" : ""} >Personal</option>
                </select>
              `
                : `
                <h3>${task.name}</h3>
                <h4>${task.category}</h4>
              `
            } 
                </div>
                <div class="leftContent">
                   ${isEditing
                ? `
                            <button data-action="save">Save</button>
                            <button data-action="cancel">Cancel</button>
                          `
                : `
                            <button data-action="toggle">
                                ${task.isDone ? "Undo" : "Done"}
                            </button>
                            <button data-action="edit">Edit</button>
                            <button data-action="delete">Delete</button>
                          `
            }
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
taskContainer.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    const taskEl = e.target.closest(".task");
    if (!taskEl) return;


    const taskId = Number(taskEl.dataset.action);

    if (action === "edit") {
        editingTaskId = taskId;
        renderCard();
    }
    if (action === "cancel") {
        editingTaskId = null;
        renderCard()
    }
    if (action === "save") {
        const newName = taskEl.querySelector(".editName").value.trim();
        const newCategory = taskEl.querySelector(".editCategory").value;

        if (!newName) return;

        const task = taskArray.find(t => t.id === taskId)

        if (task) {
            task.name = newName;
            task.category = newCategory;
        }
        editingTaskId = null;
        saveAndRender()
    }
    if (action === "toggle") toggleDone(taskId);
    if (action === "delete") deleteTask(taskId);
});
renderCard();
