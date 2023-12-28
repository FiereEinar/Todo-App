import '../src/app.css';

import { pubsub } from './pubsub.js';
import { todo } from "./todo.js";
import { renderer } from "./renderer.js";
import { projects } from './projects.js';

import { isFuture } from "date-fns";
import { isToday } from "date-fns";

export const dialogHandler = (() => {
	const addTaskButton = document.querySelector('.addTaskButton');
	const closeDialogButton = document.querySelector('.closeDialog');
	const submitDialogButton = document.querySelector('.submitDialog');
    const addProjectButton = document.querySelector('.addProjectButton');
    const navButton = document.querySelector('.navButton > img');
    const backButton = document.querySelector('.sidebar > .header img');
    
	const taskDialog = document.querySelector('.addTaskDialog');
	
	const title = document.querySelector('.addTaskDialog #title');
	const dueDate = document.querySelector('.addTaskDialog #dueDate');
	const dueTime = document.querySelector('.addTaskDialog #dueTime');

    const headerText = document.querySelector('.addTaskDialog h1');
    const description = document.querySelector('.description');
    const fieldset = document.querySelector('.addTaskDialog fieldset');
    const sidebarContainer = document.querySelector('.sidebarContainer');

    let mode = '';
    let editedComponentId = ''; // for editing

    navButton.addEventListener('click', () => {
        sidebarContainer.classList.add('active');
    });

    backButton.addEventListener('click', () => {
        sidebarContainer.classList.remove('active');
    });

    sidebarContainer.addEventListener('click', () => {
        sidebarContainer.classList.remove('active');
    });

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
        analyzeMode();
        clearChildElements(fieldset);
        clearChildElements(description);
        clearDialog();
        hideDialog();
    });

    function analyzeMode() {
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
    }

    function makeTodo() {
        const select = document.querySelector('.addTaskDialog form fieldset select');
        todo.createTodo(title.value, dueDate.value, dueTime.value, select.value);
    }

    function makeProject() {
        const description = document.querySelector('.addTaskDialog #description');
        projects.createProject(title.value, dueDate.value, dueTime.value, description.value);
    }

    function editTodo() {
        const select = document.querySelector('.addTaskDialog form fieldset select');
        const container = document.querySelector('.main');
        const updatedTodo = todo.makeTodo(title.value, dueDate.value, dueTime.value, select.value);
        const editedComponent = container.querySelector('#' + editedComponentId);
        clearChildElements(editedComponent);
        renderer.editTaskComponent(updatedTodo, editedComponent);
    }

    function editTask(task) {
        mode = 'edit';
        headerText.innerHTML = 'Edit';
        editedComponentId = task.id;
        
        title.value = task.title;
        dueDate.value = task.dueDate;
        dueTime.value = task.dueTime;
        showDialogProjects();
        setSelectedAttribute(task.projectType);
        showDialog();
    }

    function setSelectedAttribute(projectType) {
        const select = document.querySelector('.addTaskDialog form fieldset select');
        if (select !== null) {
            const options = select.querySelectorAll('option');
            options.forEach((option) => {
                if (option.value == projectType) {
                    option.selected = true;
                }
            });
        }
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

    function showTaskDialog(projectTitle) {
        mode = 'task';
        headerText.innerHTML = 'Add Task';
        showDialogProjects();
        setSelectedAttribute(projectTitle);
        showDialog();
    }

    function showDialogProjects() {
        const list = projects.getProjectsList();
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

const UIManager = (() => {
	const tasksButton = document.querySelector('.tasksButton');
    const container = document.querySelector('.main');
    const projectsContainer = document.querySelector('.projectsContainer');

    const todayButton = document.querySelector('.sidebar > .nav > .todayButton');
    const upcomingButton = document.querySelector('.sidebar > .nav > .upcomingButton');

    pubsub.subscribe('todoUpdated', todo.updateTodo);
    pubsub.subscribe('todoUpdated', renderTask);
    pubsub.subscribe('todoAdded', projects.addTaskToProjects);
    pubsub.subscribe('projectsUpdated', renderProjects);
    pubsub.subscribe('todoDeleted', projects.removeTaskToProjects);

    // TESTS
    projects.createProject('Website', '2024-01-03', '08:00', 'Make a website for Intro to Computing subject');
    projects.createProject('Documentation', '2023-12-29', '12:00', 'Write a documentation for the website (IT Fundamentals project)');
    todo.createTodo('Make a landing page', '2023-12-21', '07:24', 'Website');
    todo.createTodo('Make a blog page', '2023-12-24', '09:24', 'Website');
    todo.createTodo('Make a flex page', '2023-12-27', '12:24', 'Website');
    todo.createTodo('Write the intro', '2023-12-09', '08:24', 'Documentation');
    todo.createTodo('Write the last part', '2023-12-17', '08:25', 'Documentation');
    todo.createTodo('Make wireframes', '2024-12-27', '12:24', 'Documentation');
    todo.createTodo('Patuli', '2024-01-01', '08:30', 'none');
	
	tasksButton.addEventListener('click', () => renderAllTasks());

    todayButton.addEventListener('click', () => renderTasksToday());

    upcomingButton.addEventListener('click', () => renderUpcomingTasks());

    function renderAllTasks() {
        const list = todo.getTodo();
        renderTask(list);
    }

    function renderTasksToday() {
        const list = todo.getTodo();
        const tasksToday = filterTodayTasks(list);
        renderTask(tasksToday);
    }

    function renderUpcomingTasks() {
        const list = todo.getTodo();
        const upcomingTasks = filterUpcomingTasks(list);
        renderTask(upcomingTasks);
    }

    function filterTodayTasks(list) {
        const today = [];
        list.map((item) => {
            const upcomingDates = isToday(new Date(item.dueDate));
            if (upcomingDates) {
                today.push(item);
            }
        });
        return today;
    }

    function filterUpcomingTasks(list) {
        const upcoming = [];
        list.map((item) => {
            const upcomingDates = isFuture(new Date(item.dueDate));
            if (upcomingDates) {
                upcoming.push(item);
            }
        });
        return upcoming;
    }

	function renderTask(list) {
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
        if (prev != null) {
            prev.forEach((element) => element.remove());
        }
	}
})();

