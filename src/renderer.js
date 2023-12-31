import { UIManager, dialogHandler } from "./main.js";
import { projects } from "./projects.js";

import editImg from '../src/assets/edit.png';
import deleteImg from '../src/assets/delete.png';
import projectIcon from '../src/assets/empty-folder.png';
import addTaskIcon from '../src/assets/plus.png';
import expandImg from '../src/assets/expand.png';
import backImg from '../src/assets/back.png';

import { formatDistanceToNow } from 'date-fns';
import { todo as todoOrigin } from "./todo.js";

export const renderer = {
	renderTodo: (list, parent) => {
		checkList();
		renderList();
		
		function checkList() {
			const header = document.createElement('h1');
			const mainContainer = document.querySelector('.main');

			if (list.length == 0) {
				header.innerHTML = 'Nothing to see here...';
				parent.appendChild(header);
				return;
			} else {
				header.innerHTML = mainContainer.id;
				parent.appendChild(header);
			}
		}

		function renderList() {
			list.forEach((todo) => {
				const container = document.createElement('div');
				container.classList.add('container');
				parent.appendChild(container);

				renderer.makeTaskComponent(todo, container);
			});
		}
	},
	
	makeTaskComponent: (todo, container) => {
		container.id = todo.id;

		const checkbox = document.createElement('input');
		checkbox.id = todo.id;
		checkbox.setAttribute('type', 'checkbox');
		todo.done ? checkbox.checked = true : checkbox.checked = false;
		checkbox.addEventListener('click', () => {
			let todoState = todoOrigin.changeTodoState(todo)
			todoState ? container.classList.add('done'):
						container.classList.remove('done');
		});
		todo.done ? container.classList.add('done'):
					container.classList.remove('done');
		container.appendChild(checkbox);
		
		const todoName = document.createElement('p');
		todoName.innerHTML = todo.title;
		todoName.title = 'Title';
		container.appendChild(todoName);
	
		const dueDate = document.createElement('p');
		const date = [todo.dueDate, todo.dueTime];
		const formattedDate = date.join('T');
		dueDate.innerHTML = formatDistanceToNow(new Date(formattedDate), {addSuffix: true});
		dueDate.title = 'Due date';
		container.appendChild(dueDate);
	
		const dueTime = document.createElement('p');
		dueTime.innerHTML = todo.dueTime;
		dueTime.title = 'Time';
		container.appendChild(dueTime);

		const projectType = document.createElement('p');
		projectType.innerHTML = todo.projectType;
		projectType.title = 'Project';
		container.appendChild(projectType);
	
		const editBtn = document.createElement('img');
		editBtn.classList.add('edit');
		editBtn.src = editImg;
		editBtn.title = 'Edit';
		container.appendChild(editBtn);
	
		editBtn.addEventListener('click', () => {
			dialogHandler.editTask(todo);
		});
	
		const deleteBtn = document.createElement('img');
		deleteBtn.classList.add('delete');
		deleteBtn.src = deleteImg;
		deleteBtn.title = 'Delete';
		container.appendChild(deleteBtn);

		deleteBtn.addEventListener('click', () => {
			todoOrigin.removeTodo(todo);
		});

		const expandBtn = document.createElement('img');
		expandBtn.classList.add('expand');
		expandBtn.src = expandImg;
		expandBtn.title = 'Expand';
		container.appendChild(expandBtn);

		expandBtn.addEventListener('click', () => {
			expandTask();
		});

		function expandTask() {
			const mainContainer = document.querySelector('.main');

			const expandedContainer = document.createElement('div');
			expandedContainer.classList.add('expanded');
			mainContainer.appendChild(expandedContainer);

			renderer.makeExpandedTaskComponent(todo, expandedContainer);
		}
	},

	makeExpandedTaskComponent: (todo, container) => {
		container.id = todo.id;

		const backButton = document.createElement('img');
		backButton.classList.add('backButton');
		backButton.src = backImg;
		backButton.alt = 'back';
		backButton.title = 'Back';
		container.appendChild(backButton);
	
		backButton.addEventListener('click', () => {
			renderer.removeExpandedComponent();
		});

		const status = document.createElement('p');
		let todoStatus = '';
		todo.done ? todoStatus = 'Done':
					todoStatus = 'Not Done';
		todo.done ? container.classList.add('done'):
					container.classList.remove('done');
		status.innerHTML = 'Status: ' + todoStatus;
		container.appendChild(status);
		
		const todoName = document.createElement('p');
		todoName.innerHTML = 'Title: ' + todo.title;
		todoName.title = 'Title';
		container.appendChild(todoName);
	
		const dueDate = document.createElement('p');
		const date = [todo.dueDate, todo.dueTime];
		const formattedDate = date.join('T');
		dueDate.innerHTML = 'Due: ' + formatDistanceToNow(new Date(formattedDate), {addSuffix: true});
		dueDate.title = 'Due date';
		container.appendChild(dueDate);
	
		const dueTime = document.createElement('p');
		dueTime.innerHTML = 'Time: ' + todo.dueTime;
		dueTime.title = 'Time';
		container.appendChild(dueTime);

		const projectType = document.createElement('p');
		projectType.innerHTML = 'Project Type: ' + todo.projectType;
		projectType.title = 'Project';
		container.appendChild(projectType);
	},

	editTaskComponent: (editedTask, component) => {
		renderer.makeTaskComponent(editedTask, component)
	},

	removeExpandedComponent: () => {
		const expandedComponent = document.querySelectorAll('.main > .expanded');
		expandedComponent.forEach((component) => component.remove());
	},

	renderProjects: (list, parent) => {
		if (list.length == 0) { return; }

		list.forEach((project) => {
			const projectContainer = document.createElement('button');
			projectContainer.addEventListener('click', () => {
				renderer.expandProjectMethod(project);
			});
			parent.appendChild(projectContainer);

			const icon = document.createElement('img');
			icon.src = projectIcon;
			projectContainer.appendChild(icon);

			const projectTitle = document.createElement('h4');
			projectTitle.innerHTML = project.title;
			projectContainer.appendChild(projectTitle);
		});
	},

	expandProjectMethod: (project) => {
		const container = document.querySelector('.main');
		container.id = project.title;

		let prev = container.querySelectorAll('*');
		prev.forEach((element) => element.remove());

		const headerContainer = document.createElement('header');
		container.appendChild(headerContainer);

		const title = document.createElement('h1');
		title.innerHTML = project.title;
		headerContainer.appendChild(title);

		const buttonContainer = document.createElement('div');
		headerContainer.appendChild(buttonContainer);

		const addTask = document.createElement('img');
		addTask.src = addTaskIcon;
		buttonContainer.appendChild(addTask);

		addTask.addEventListener('click', () => {
			dialogHandler.showTaskDialog(project.title);
		});

		const deleteTask = document.createElement('img');
		deleteTask.src = deleteImg;
		buttonContainer.appendChild(deleteTask);

		deleteTask.addEventListener('click', () => {
			projects.deleteProject(project);
			UIManager.renderAllTasks();
		});

		const description = document.createElement('h5');
		description.innerHTML = project.description;
		container.appendChild(description);

		const date = document.createElement('p');
		date.innerHTML = project.dueDate;
		container.appendChild(date);
		
		generateTasksFromProject();

		function generateTasksFromProject() {
			if (project.tasks.length > 0) {
				project.tasks.forEach((task) => {
					const container = document.querySelector('.main');

					const projectTasksContainer = document.createElement('div');
					projectTasksContainer.classList.add('container');
					container.appendChild(projectTasksContainer);

					renderer.makeTaskComponent(task, projectTasksContainer);
				});
			}
		}
	},

	renderDialogProjects: (list, parent) => {
		
		const legend = document.createElement('legend');
		legend.innerHTML = 'Select a project';
		parent.appendChild(legend);
		
		const select = document.createElement('select');
		select.setAttribute('name', 'project');
		parent.appendChild(select);
		
		createOption(); // 'none' option
		
		if (list.length == 0) return;

		list.forEach((proj) => {
			createOption(proj.title);
		});

		function createOption(title) {
			const option = document.createElement('option');
			option.setAttribute('value', title || 'none');
			option.innerHTML = title || 'none';
			select.appendChild(option);			
		}
	},

	addRenderingMethod: (object) => {
		object.renderSelfTasks = function() {
			renderer.expandProjectMethod(object);
		}
    },
}