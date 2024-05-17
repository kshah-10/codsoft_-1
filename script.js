// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTask(taskText);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.firstChild.nodeValue.trim();
            deleteTask(taskItem, taskText);
        } else if (e.target.classList.contains('edit')) {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.firstChild.nodeValue.trim();
            editTask(taskItem, taskText);
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(taskText));
        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.appendChild(document.createTextNode('Edit'));
        li.appendChild(editBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(taskItem, taskText) {
        taskItem.remove();
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function editTask(taskItem, taskText) {
        const newTaskText = prompt('Edit task', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskItem.firstChild.nodeValue = newTaskText.trim();
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.map(task => task === taskText ? newTaskText.trim() : task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => addTask(taskText));
    }
});
