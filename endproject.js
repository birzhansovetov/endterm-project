// Міндеттердің массиві
let tasks = [];

// DOM элементтері
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const deadlineInput = document.getElementById("deadline-input");
const taskList = document.getElementById("task-list");

// Міндет қосу
function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const deadline = new Date(deadlineInput.value);

    // Проверка на правильность введенной даты (не допускаем прошедшие даты)
    if (!taskText || isNaN(deadline.getTime())) {
        alert("Міндеттің дұрыс мәліметтерін енгізіңіз!");
        return;
    }

    const now = new Date();
    if (deadline < now) {
        alert("Міндеттің мерзімі өткен уақытты таңдауға болмайды!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        deadline: deadline
    };

    tasks.push(task);
    updateTaskList();
    taskForm.reset();
}

// Міндеттер тізімін жаңарту
function updateTaskList() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        // Форматируем срок (мерзімі)
        const formattedDeadline = task.deadline.toLocaleString();

        li.innerHTML = `
            ${task.text} (мерзімі: ${formattedDeadline})
            <div class="buttons">
                <button class="edit-btn">Өзгерту</button>
                <button class="delete-btn">Жою</button>
                <button class="complete-btn">${task.completed ? "Қалпына келтіру" : "Аяқтау"}</button>
            </div>
        `;

        // Оқиғаларды байланыстыру
        li.querySelector(".edit-btn").onclick = () => editTask(task.id);
        li.querySelector(".delete-btn").onclick = () => deleteTask(task.id);
        li.querySelector(".complete-btn").onclick = () => toggleTaskCompletion(task.id);

        // Если задача просрочена
        if (!task.completed && task.deadline < new Date()) {
            li.classList.add("due");
            alert(`"${task.text}" міндетінің мерзімі өтіп кетті!`);
        }

        taskList.appendChild(li);
    });
}

// Міндетті өзгерту
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt("Міндеттің жаңа сипаттамасын енгізіңіз:", task.text);
    if (newText !== null) {
        task.text = newText.trim();
        updateTaskList();
    }
}

// Міндетті жою
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    updateTaskList();
}

// Міндеттің күйін ауыстыру
function toggleTaskCompletion(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        updateTaskList();
    }
}

// Форманы жіберуді өңдеу
taskForm.addEventListener("submit", addTask);