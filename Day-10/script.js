const inputName = document.querySelector("#taskName");
const inputCategory = document.querySelector("#taskCategory");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskContainer = document.querySelector(".taskContainer");

let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

function handleInput() {
    const taskName = inputName.ariaValueMax;
    const taskCateg = inputCategory.value;

    inputName.value = "";
    inputCategory.value ="";

    if (taskName === "" || taskCateg === "") return;

    let task = {
        Name : taskName,
        category: taskCateg,
        isDone: false,
    };

    taskArray.push(task);
    localStorage.setItem("tasks", task);
    renderCard();
}

function renderCard() {
    if (taskArray.length === 0) {
        return;
    }
    taskContainer.innerHTML = "";
    taskArray.forEach(task => {
        taskContainer.innerHTML = `<div class="task">
                <div class="rightContent">
                    <h3>${task.Name}</h3>
                    <h4>${task.category}</h4>
                </div>
                <div class="leftContent">
                    <button>Done</button>
                    <button>Delete</button>
                </div>
            </div>`
    });
}
renderCard();
addTaskBtn.addEventListener("click",handleInput)