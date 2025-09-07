document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        fetch('tasks.php?action=getTasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.textContent = task;
                    taskList.appendChild(li);
                });
            });
    }

    loadTasks();

    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        if (!task) {
            alert("Te rog completează sarcina!");
            return;
        }

        fetch('tasks.php?action=addTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'task=' + encodeURIComponent(task)
        })
        .then(response => response.json())
        .then(data => {
            taskInput.value = '';
            loadTasks();
        });
    });
});
