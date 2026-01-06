const inputName = document.querySelector("#taskName");
const inputCategory = document.querySelector("#taskCategory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskContainer = document.querySelector(".taskContainer");

// Load tasks from localStorage or start with empty array
let taskArray = (JSON.parse(localStorage.getItem("tasks")) || []);

// Add task
function handleInput() {
    const taskName = inputName.value.trim();
    const taskCateg = inputCategory.value.trim();

    if (!taskName || !taskCateg) return; // ignore empty inputs

    const task = {
        name: taskName,
        category: taskCateg,
        isDone: false
    };

    taskArray.push(task);
    addToLocalstorage()

    inputName.value = "";
    inputCategory.value = "";

    renderCard();
}
function renderCard() {
    if (taskArray.length === 0) {
        taskContainer.innerHTML = "<p class='para'>No tasks added</p>";
        return;
    }

    let html ="";
    taskArray.forEach((task, index) => {
        html +=`
        <div class="task ${task.isDone ? "done" : "unDone"}">
            <div class="rightContent">
                <h3>${task.name}</h3>
                <h4>${task.category}</h4>
            </div>
            <div class="leftContent">
                <button onclick="markDone(${index})" class="">Done</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        </div>`;
        taskContainer.innerHTML = html
    });
}
function deleteTask(indx) {
    taskArray.splice(indx, 1);
    addToLocalstorage()
    renderCard();
}
function markDone(indx) {
   taskArray[indx].isDone = true;
   addToLocalstorage()
   renderCard();
}
renderCard();
function addToLocalstorage() {
 localStorage.setItem("tasks",JSON.stringify(taskArray))   
}
addTaskBtn.addEventListener("click",handleInput);
