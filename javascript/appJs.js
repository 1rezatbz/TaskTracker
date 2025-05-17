const taskFrom = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = [];

taskFrom.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text === '') return;

    const task = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed')
        }
        span.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks()
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


