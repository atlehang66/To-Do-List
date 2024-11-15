// Getting references to HTML elements
const addButton = document.getElementById('addButton');
const inputField = document.getElementById('listIn');
const listContainer = document.getElementById('lisOut');
const filterDropdown = document.getElementById('filterDropdown');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
        addButton.addEventListener('click', function() {
            const taskText = inputField.value.trim();
            const selectedDate = JSON.parse(localStorage.getItem('selectedDate')); // Get the selected date from localStorage

            if (taskText) {
                const newTask = {
                    text: taskText,
                    completed: false,
                    date: selectedDate ? `${selectedDate.day}/${selectedDate.month + 1}/${selectedDate.year}` : "No date selected"
                };
                tasks.push(newTask);
                saveTasks();  // Save tasks to localStorage
                renderTasks();
                inputField.value = '';  // Clear input field after adding
            } else {
                alert("Please enter a task.");
            }
        });


    // Function to render tasks based on filter
    function renderTasks() {
        const filterValue = filterDropdown.value;
        listContainer.innerHTML = ''; // Clear existing list

        const filteredTasks = tasks.filter(task => {
            if (filterValue === 'completed') {
                return task.completed;
            } else if (filterValue === 'pending') {
                return !task.completed;
            }
            return true; // Show all tasks by default
        });

        filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        if (task.completed) {
            taskElement.classList.add('completed'); // Apply completed style
        }

        // Task text and date
        const taskText = document.createElement('span');
        taskText.textContent = `${task.text} (${task.date})`;  // Show the date with the task text
        taskText.classList.add('task-text');

        // Checkbox, edit, and delete buttons remain the same
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('save-button');
        editButton.addEventListener('click', () => editTask(index));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.classList.add('save-button');
        removeButton.addEventListener('click', () => removeTask(index));

        // Append elements to task container
        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskText);
        taskElement.appendChild(editButton);
        taskElement.appendChild(removeButton);

        // Add task to the list
        listContainer.appendChild(taskElement);
    });
}


// Toggle task completion status
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(); // Save updated tasks to localStorage
    renderTasks(); // Re-render to update the UI
}

// Remove a task from the list
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks(); // Save updated tasks to localStorage
    renderTasks(); // Re-render after removal
}

    // Edit a task
    function editTask(index) {
    const taskText = tasks[index].text;

    // Create an input field to edit the task
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskText;

    // Create a save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';

    // Apply CSS class
    saveButton.classList.add('save-button');

    // Create a cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('save-button');

    // Replace the task text with the input field and buttons
    const taskElement = listContainer.children[index];
    taskElement.querySelector('span').replaceWith(inputField);
    taskElement.querySelector('.edit-button').replaceWith(saveButton);
    taskElement.querySelector('.remove-button').replaceWith(cancelButton);

    // Save the edited task
    saveButton.addEventListener('click', function() {
        const updatedText = inputField.value.trim();
        if (updatedText) {
            tasks[index].text = updatedText;
            saveTasks();  // Save updated tasks to localStorage
            renderTasks(); // Re-render the task list
        }
    });

    // Cancel editing
    cancelButton.addEventListener('click', function() {
        renderTasks(); // Re-render without making changes
    });
}

// Listen for changes in the dropdown selection
filterDropdown.addEventListener('change', renderTasks);

// Initial render of tasks
renderTasks();


