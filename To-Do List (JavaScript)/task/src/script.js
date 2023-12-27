document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    let addTaskBtn = document.getElementById('add-task-button');
    addTaskBtn.addEventListener("click", addTask);
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    for (let task of tasks) {
        let newLi = createTaskElement(task.id, task.content, task.completed);
        taskList.appendChild(newLi);
    }
}

function saveTasks() {
    let tasks = [];
    let taskElements = document.querySelectorAll('#task-list li');
    taskElements.forEach(taskElement => {
        let checkbox = taskElement.querySelector('input[type="checkbox"]');
        tasks.push({
            id: taskElement.dataset.id,
            content: taskElement.querySelector('.task').textContent,
            completed: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    let inputTask = document.getElementById('input-task');
    if (inputTask.value.trim() !== '') {
        let newTask = {
            id: Date.now().toString(), // A simple unique ID for each task
            content: inputTask.value.trim(),
            completed: false
        };
        let newLi = createTaskElement(newTask.id, newTask.content, newTask.completed);
        document.getElementById('task-list').appendChild(newLi);
        saveTasks();
        inputTask.value = '';
    }
}

function createTaskElement(id, content, completed) {
    let newLi = document.createElement('li');
    newLi.setAttribute('data-id', id);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', saveTasks);

    let taskSpan = document.createElement('span');
    taskSpan.className = 'task';
    taskSpan.textContent = content;

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function(event) {
        event.target.parentNode.remove();
        saveTasks();
    });

    newLi.appendChild(checkbox);
    newLi.appendChild(taskSpan);
    newLi.appendChild(deleteBtn);

    return newLi;
}

function deleteTask(event) {
    event.target.parentNode.remove();
    saveTasks();
}
