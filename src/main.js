import '../src/app.css';

import { pubsub } from './pubsub';
import { task } from './tasks';
import { todo } from "./todo";
const addTaskButton = document.querySelector('.addTaskButton');


const taskDialog = document.querySelector('.addTaskDialog');
const closeDialogButton = document.querySelector('.closeDialog');
const submitDialogButton = document.querySelector('.submitDialog');

const title = document.querySelector('.addTaskDialog #title');
const description = document.querySelector('.addTaskDialog #description');
const dueDate = document.querySelector('.addTaskDialog #dueDate');

const dialogHandler = (() => {
    addTaskButton.addEventListener('click', () => {
        taskDialog.classList.add('active');
    });
    
    closeDialogButton.addEventListener('click', () => {
        taskDialog.classList.remove('active');
    });
    
    submitDialogButton.addEventListener('click', () => {
        todo.createTodo(title, description, dueDate);
        clearDialog();
        taskDialog.classList.remove('active');
    });

    function clearDialog() {
        title.value = '';
        description.value = '';
        dueDate.value = '';
    }
})();

