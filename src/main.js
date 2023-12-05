import '../src/app.css';

import { pubsub } from './pubsub.js';
import { todo } from "./todo.js";
import { renderer } from "./renderer.js";

const dialogHandler = (() => {
	const addTaskButton = document.querySelector('.addTaskButton');

	const taskDialog = document.querySelector('.addTaskDialog');
	const closeDialogButton = document.querySelector('.closeDialog');
	const submitDialogButton = document.querySelector('.submitDialog');
	
	const title = document.querySelector('.addTaskDialog #title');
	const dueDate = document.querySelector('.addTaskDialog #dueDate');
	const dueTime = document.querySelector('.addTaskDialog #dueTime');

    addTaskButton.addEventListener('click', () => {
        taskDialog.classList.add('active');
    });
    
    closeDialogButton.addEventListener('click', () => {
        taskDialog.classList.remove('active');
    });
    
    submitDialogButton.addEventListener('click', () => {
        todo.createTodo(title.value, dueDate.value, dueTime.value);
        clearDialog();
        taskDialog.classList.remove('active');
    });

    function clearDialog() {
        title.value = '';
        dueDate.value = '';
        dueTime.value = '';
    }
})();

const UIManager = (() => {
	const tasksButton = document.querySelector('.tasksButton');
    const container = document.querySelector('.main');
    

    
    
    todo.createTodo('Test', '2023-12-01', '12:24');
    todo.createTodo('Test 2', '2023-12-01', '12:24');

    // init
    render();
    
    pubsub.subscribe('todoUpdated', render);
	
	tasksButton.addEventListener('click', () => {
        render();
    });

    // const tasks = document.querySelectorAll('.container');
    // console.log(tasks);

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