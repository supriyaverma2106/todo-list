const tasksList = document.getElementById('tasksList');
const taskInputBox = document.getElementById('taskInputBox');

let tasks = [
    {
        id: 0,
        description: 'Complete homework and bring groceries.',
        isChecked: false,
    },
    {
        id: 1,
        description: 'Give the car to service center.',
        isChecked: true,
    },
];

function populateExistingTasks() {
    tasksList.innerHTML = '';
    tasks.forEach((aTask) => addTaskToTaskList(aTask));
}

populateExistingTasks();

function addTask() {
    const value = taskInputBox.value;
    if (!value || value === '') {
        return;
    }
    const task = {
        id: tasks.length,
        description: value,
        isChecked: false,
    };
    tasks.unshift(task);
    // addTaskToTaskList(task);
    populateExistingTasks();
    taskInputBox.value = '';
}

function addTaskToTaskList(task) {
    // 1. Creating a parent div for a single task
    const taskNode = document.createElement('div');
    taskNode.className = 'task';
    // 2. Creating an input checkbox
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.checked = task.isChecked;
    inputCheckbox.setAttribute('data-id', task.id);
    inputCheckbox.addEventListener('change', (event) => {
        markAsDoneOrUndone(
            event.target.getAttribute('data-id'),
            event.target.checked
        );
    });
    taskNode.appendChild(inputCheckbox);
    // 3. Creating a span text to show task description
    const textSpan = document.createElement('span');
    textSpan.className = `task-text ${
        task.isChecked ? 'completed-task-text' : ''
    }`;
    textSpan.innerText = task.description;
    taskNode.appendChild(textSpan);
    // 4. Adding "Delete" button to the task
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.setAttribute('data-id', task.id);
    deleteBtn.addEventListener('click', (event) => {
        deleteTask(event.target.getAttribute('data-id'));
    });
    taskNode.appendChild(deleteBtn);
    // 5. Appending the complete task in the list node
    tasksList.appendChild(taskNode);
}

function deleteTask(taskId) {
    tasks = tasks.filter((aTask) => aTask.id !== parseInt(taskId));
    populateExistingTasks();
}

function markAsDoneOrUndone(checkboxId, isChecked) {
    const todoIndex = tasks.findIndex(
        (aTask) => aTask.id === parseInt(checkboxId)
    );
    console.log(todoIndex);
    if (todoIndex >= 0 && todoIndex < tasks.length) {
        tasks[todoIndex].isChecked = isChecked;
        populateExistingTasks();
    }
}
