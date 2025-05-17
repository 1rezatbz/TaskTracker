document.addEventListener('DOMContentLoaded', () => {
    interface Task {
        id: number;
        text: string;
        completed: boolean;
    }

    const taskForm = document.getElementById('task-form') as HTMLFormElement;
    const taskInput = document.getElementById('task-input') as HTMLInputElement;
    const taskList = document.getElementById('task-list') as HTMLUListElement;

    let tasks: Task[] = [];

    taskForm.addEventListener('submit', function (e: Event) {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text === '') return;

        const task: Task = {
            id: Date.now(),
            text,
            completed: false,
        };

        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    });

    function renderTasks(): void {
        taskList.innerHTML = '';

        tasks.forEach((task) => {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = task.text;
            if (task.completed) {
                span.classList.add('completed');
            }

            span.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks();
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
});
