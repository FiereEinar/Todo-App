import '../src/app.css';

import { pubsub } from './pubsub.js';
import { todo } from "./todo.js";
import { renderer } from "./renderer.js";
import { projects } from './projects.js';

export const dialogHandler = (() => {
	const addTaskButton = document.querySelector('.addTaskButton');
	const closeDialogButton = document.querySelector('.closeDialog');
	const submitDialogButton = document.querySelector('.submitDialog');
    const addProjectButton = document.querySelector('.addProjectButton');
    
	const taskDialog = document.querySelector('.addTaskDialog');
	
	const title = document.querySelector('.addTaskDialog #title');
	const dueDate = document.querySelector('.addTaskDialog #dueDate');
	const dueTime = document.querySelector('.addTaskDialog #dueTime');

    const headerText = document.querySelector('.addTaskDialog h1');
    const description = document.querySelector('.description');
    const fieldset = document.querySelector('.addTaskDialog fieldset');
    const form = document.querySelector('.addTaskDialog form');

    let mode = '';
    let editedComponentId = ''; // for editing

    addTaskButton.addEventListener('click', () => {
        showTaskDialog();
    });

    addProjectButton.addEventListener('click', () => {
        mode = 'project';

        headerText.innerHTML = 'Add Project';
        addDescription(description);
        showDialog();
    })
    
    closeDialogButton.addEventListener('click', () => {
        clearDescription();
        clearChildElements(fieldset);
        clearDialog();
        hideDialog();
    });
    
    submitDialogButton.addEventListener('click', () => {
        switch (mode) {
            case 'task':
                makeTodo();
                break;
            case 'project':
                makeProject();
                break;
            case 'edit':
                editTodo();
                break;
        }
        // experimental
        // TODO: change this to <select> instead of <fieldset>
        const data =  new FormData(form);
        let output = ''
        for (const entry of data) {
            output = `${output}${entry[0]}=${entry[1]}\r`;
            console.log(entry[1])
        }
        console.log(output)
        
        clearChildElements(fieldset);
        clearChildElements(description);
        clearDialog();
        hideDialog();

        function makeTodo() {
            todo.createTodo(title.value, dueDate.value, dueTime.value);
        }

        function makeProject() {
            const description = document.querySelector('.addTaskDialog #description');
            projects.createProject(title.value, dueDate.value, dueTime.value, description.value);
        }

        function editTodo() {
            const container = document.querySelector('.main');
            const updatedTodo = todo.makeTodo(title.value, dueDate.value, dueTime.value);
            const editedComponent = container.querySelector('#' + editedComponentId);
            clearChildElements(editedComponent);
            renderer.editTaskComponent(updatedTodo, editedComponent);
        }
    });

    function editTask(task) {
        mode = 'edit';
        editedComponentId = task.id;
        console.log(editedComponentId)

        headerText.innerHTML = 'Edit';

        title.value = task.title;
        dueDate.value = task.dueDate;
        dueTime.value = task.dueTime

        showDialog();
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

    function showDialog() {
        taskDialog.classList.add('active');
    }

    function hideDialog() {
        taskDialog.classList.remove('active');
    }

    function showTaskDialog() {
        mode = 'task';
        headerText.innerHTML = 'Add Task';
        showDialogProjects();
        showDialog();
    }

    function showDialogProjects() {
        const list = projects.getProjectsList();
        console.log(list)
        clearPreviousProjects();
        renderer.renderDialogProjects(list, fieldset);
    }

    function clearPreviousProjects() {
        const previousProjects = fieldset.querySelectorAll('div');
        if (previousProjects != null) {
            previousProjects.forEach((projects) => projects.remove());
        }
    }

    function clearChildElements(parent) {
        if (parent !== null) {
            const prev = parent.querySelectorAll('*');
            if (prev != null) {
                prev.forEach((elmt) => elmt.remove());
            }
        }
    }

    return {
        editTask: editTask,
        showTaskDialog: showTaskDialog,
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
		let prev = parent.querySelectorAll('*');
		prev.forEach((element) => element.remove());
	}
})();

