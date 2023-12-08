import '../src/app.css';

import { pubsub } from './pubsub.js';
import { todo } from "./todo.js";
import { renderer } from "./renderer.js";
import { projects } from './projects.js';

const dialogHandler = (() => {
	const addTaskButton = document.querySelector('.addTaskButton');

	const taskDialog = document.querySelector('.addTaskDialog');
	const closeDialogButton = document.querySelector('.closeDialog');
	const submitDialogButton = document.querySelector('.submitDialog');

    const addProjectButton = document.querySelector('.addProjectButton'); 
	
	const title = document.querySelector('.addTaskDialog #title');
	const dueDate = document.querySelector('.addTaskDialog #dueDate');
	const dueTime = document.querySelector('.addTaskDialog #dueTime');

    let mode = '';

    addTaskButton.addEventListener('click', () => {
        const description = document.querySelector('.description'); 
        const nodes = description.querySelectorAll('label, textarea');
        const headerText = document.querySelector('.addTaskDialog h1');
        mode = 'task';

        headerText.innerHTML = 'Add Task';
        if (nodes != null) {
            nodes.forEach((node) => node.remove());
        }
        taskDialog.classList.add('active');
    });

    addProjectButton.addEventListener('click', () => {
        const description = document.querySelector('.description');
        const headerText = document.querySelector('.addTaskDialog h1');
        mode = 'project';

        headerText.innerHTML = 'Add Project';
        addDescription(description);
        taskDialog.classList.add('active');
    })
    
    closeDialogButton.addEventListener('click', () => {
        taskDialog.classList.remove('active');
    });
    
    submitDialogButton.addEventListener('click', () => {
        if (mode == 'task') {
            todo.createTodo(title.value, dueDate.value, dueTime.value);
        } else {
            const description = document.querySelector('.addTaskDialog #description');
            projects.createProject(title.value, dueDate.value, dueTime.value, description.value);
        }
        clearDialog();
        taskDialog.classList.remove('active');
    });

    function clearDialog() {
        title.value = '';
        dueDate.value = '';
        dueTime.value = '';
    }
    function addDescription(parent) {
        const label = document.createElement('label');
        label.setAttribute('for', 'description');
        label.innerHTML = 'Description';
        parent.appendChild(label);

        const input = document.createElement('textarea');
        input.id = 'description';
        parent.appendChild(input);
    }
})();

export const UIManager = (() => {
	const tasksButton = document.querySelector('.tasksButton');
    const container = document.querySelector('.main');
    const projectsContainer = document.querySelector('.projectsContainer');

    pubsub.subscribe('todoUpdated', todo.updateTodo);
    pubsub.subscribe('todoUpdated', renderTask);
    pubsub.subscribe('projectsUpdated', renderProjects);

    // TESTS
    todo.createTodo('Test', '2023-12-01', '12:24');
    todo.createTodo('Test 2', '2023-12-03', '12:24');
    projects.createProject('Work', '2023-12-20', '12:00', 'Create a todo app');
    projects.createProject('Workout', '2023-12-15', '08:30', 'Do some cardio');
	
	tasksButton.addEventListener('click', () => {
        renderTask();
    });

	function renderTask() {
        const list = todo.getTodo();

		clearScreen(container);
		renderer.renderTodo(list, container);
	}

    function renderProjects() {
        const list = projects.getProjectsList();

        clearScreen(projectsContainer);
        renderer.renderProjects(list, projectsContainer)
    }
	
	function clearScreen(parent) {
		let prev = parent.querySelectorAll('div, h1, button, p, h5');
		prev.forEach((element) => element.remove());
	}
})();

