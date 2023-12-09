import '../src/app.css';

import { pubsub } from './pubsub.js';
import { todo } from "./todo.js";
import { renderer } from "./renderer.js";
import { projects } from './projects.js';

export const dialogHandler = (() => {
	const addTaskButton = document.querySelector('.addTaskButton');

	const taskDialog = document.querySelector('.addTaskDialog');
	const closeDialogButton = document.querySelector('.closeDialog');
	const submitDialogButton = document.querySelector('.submitDialog');

    const addProjectButton = document.querySelector('.addProjectButton'); 
	
	const title = document.querySelector('.addTaskDialog #title');
	const dueDate = document.querySelector('.addTaskDialog #dueDate');
	const dueTime = document.querySelector('.addTaskDialog #dueTime');

    const headerText = document.querySelector('.addTaskDialog h1');
    const description = document.querySelector('.description');


    let mode = '';
    let titlePlaceholder = '';

    addTaskButton.addEventListener('click', () => {
        clearDescription();
        mode = 'task';

        headerText.innerHTML = 'Add Task';
        taskDialog.classList.add('active');
    });

    addProjectButton.addEventListener('click', () => {
        mode = 'project';

        headerText.innerHTML = 'Add Project';
        addDescription(description);
        taskDialog.classList.add('active');
    })
    
    closeDialogButton.addEventListener('click', () => {
        clearDescription();
        clearDialog();
        taskDialog.classList.remove('active');
    });
    
    submitDialogButton.addEventListener('click', () => {
        if (mode == 'task') {
            todo.createTodo(title.value, dueDate.value, dueTime.value);
        } else if (mode == 'project') {
            const description = document.querySelector('.addTaskDialog #description');
            projects.createProject(title.value, dueDate.value, dueTime.value, description.value);
        } else if (mode == 'edit') {
            pubsub.publish('todoDeleted', titlePlaceholder);
            todo.createTodo(title.value, dueDate.value, dueTime.value);
        }
        clearDescription();
        clearDialog();
        taskDialog.classList.remove('active');
    });

    function editTask(task) {
        mode = 'edit';
        titlePlaceholder = task.title;

        headerText.innerHTML = 'Edit';

        title.value = task.title;
        dueDate.value = task.dueDate;
        dueTime.value = task.dueTime

        taskDialog.classList.add('active');
    }

    function clearDialog() {
        title.value = '';
        dueDate.value = '';
        dueTime.value = '';
    }

    function clearDescription() {
        const nodes = description.querySelectorAll('label, textarea');

        if (nodes != null) {
            nodes.forEach((node) => node.remove());
        }
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
    return {
        editTask: editTask,
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
    let testDate1 = new Date('2023-12-01');
    console.log(testDate1)
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

