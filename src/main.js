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
    
    // TODO: fix the createProject, it is showing the wrong data
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
    
    todo.createTodo('Test', '2023-12-01', '12:24');
    todo.createTodo('Test 2', '2023-12-01', '12:24');

    // init
    render();
    
    pubsub.subscribe('todoUpdated', render);
    pubsub.subscribe('todoUpdated', todo.updateTodo);
	
	tasksButton.addEventListener('click', () => {
        render();
    });

	function render(todoList) {
        const list = todoList ?? todo.getTodo();

		clearScreen();
		renderer.renderTodo(list, container);
	}
	
	function clearScreen() {
		let prev = container.querySelectorAll('div, h1');
		prev.forEach((element) => element.remove());
	}
})();

