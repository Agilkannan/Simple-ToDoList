const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearAllBtn");


window.addEventListener("load", () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(task => createTodoItem(task));
});


addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});

function addTodo() {
    const task = todoInput.value.trim();

    if (!task) {
        alert("Task cannot be empty!");
        return;
    }

    if (Array.from(todoList.children).some(li => li.firstChild.textContent === task)) {
        alert("Task already exists!");
        return;
    }

    createTodoItem(task);
    saveTodoToLocalStorage(task);
    todoInput.value = "";
}

function createTodoItem(task) {
    const todoItem = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-todo-btn");

    deleteBtn.addEventListener("click", () => {
        todoItem.remove();
        removeTodoFromLocalStorage(task);
    });

    todoItem.appendChild(taskText);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
}


function saveTodoToLocalStorage(task) {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(task);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function removeTodoFromLocalStorage(task) {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = savedTodos.filter(t => t !== task);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
        todoList.innerHTML = "";
        localStorage.removeItem("todos");
    }
});
