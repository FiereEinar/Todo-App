// import '../src/app.css';

import { pubsub } from './pubsub.js';
import { todo } from "./todo.js";
import { renderer } from "./renderer.js";

const dialogHandler = (() => {
	const addTaskButton = document.querySelector('.addTaskButton');

	const taskDialog = document.querySelector('.addTaskDialog');
	const closeDialogButton = document.querySelector('.closeDialog');
	const submitDialogButton = document.querySelector('.submitDialog');
	
	const title = document.querySelector('.addTaskDialog #title');
	const description = document.querySelector('.addTaskDialog #description');
	const dueDate = document.querySelector('.addTaskDialog #dueDate');
	const dueTime = document.querySelector('.addTaskDialog #dueTime');

    addTaskButton.addEventListener('click', () => {
        taskDialog.classList.add('active');
    });
    
    closeDialogButton.addEventListener('click', () => {
        taskDialog.classList.remove('active');
    });
    
    submitDialogButton.addEventListener('click', () => {
        todo.createTodo(title, description, dueDate, dueTime);
        clearDialog();
        taskDialog.classList.remove('active');
    });

    function clearDialog() {
        title.value = '';
        description.value = '';
        dueDate.value = '';
    }
})();

const UIManager = (() => {
	const tasksButton = document.querySelector('.tasksButton');
	const container = document.querySelector('.main');
	
	tasksButton.addEventListener('click', () => {
		render();
		console.log('clicked');
	});
	
	function render() {
		const list = todo.getTodo();
		clearScreen();
		renderer.renderTodo(list, container);
	}
	
	function clearScreen() {
		let prev = container.querySelectorAll('div');
		prev.forEach((element) => element.remove());
	}
})();