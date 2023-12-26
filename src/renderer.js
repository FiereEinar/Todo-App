import { pubsub } from "./pubsub.js";
import { dialogHandler } from "./main.js";

import editImg from '../src/assets/edit.png';
import deleteImg from '../src/assets/delete.png';
import projectIcon from '../src/assets/empty-folder.png';
import addTaskIcon from '../src/assets/plus.png';

import { formatDistanceToNow } from 'date-fns';
import { projects } from "./projects.js";

export const renderer = {
	renderTodo: (list, parent) => {
		checkList();
		renderList();
		
		function checkList() {
			const header = document.createElement('h1');

			if (list.length == 0) {
				header.innerHTML = 'Nothing to see here...';
				parent.appendChild(header);
				return;
			} else {
				header.innerHTML = 'Tasks';
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
		// if (todo.title == null) return;
		container.id = todo.id;
		// to get rid of that warning that says an input should have an ID
		const randomNum = Math.floor(Math.random() * 999);

		const checkbox = document.createElement('input');
		checkbox.id = 'screenValue' + randomNum;
		checkbox.setAttribute('type', 'checkbox');
		todo.done ? checkbox.checked = true : checkbox.checked = false;
		checkbox.addEventListener('click', () => {
			todo.done = !todo.done;
			todo.done ? container.style.backgroundColor = 'green':
						container.style.backgroundColor = 'white';
		});
		container.appendChild(checkbox);
		
		const todoName = document.createElement('input');
		todoName.id = 'name' + randomNum;
		todoName.value = todo.title;
		todoName.setAttribute('type', 'text');
		todoName.disabled = true;
		container.appendChild(todoName);
	
		const date = [todo.dueDate, todo.dueTime];
		const formattedDate = date.join('T');
		const dueDate = document.createElement('input');
		dueDate.id = 'date' + randomNum;
		dueDate.value = formatDistanceToNow(new Date(formattedDate), {addSuffix: true});
		dueDate.setAttribute('type', 'text');
		dueDate.disabled = true;
		container.appendChild(dueDate);
	
		const dueTime = document.createElement('input');
		dueTime.id = 'time' + randomNum;
		dueTime.value = todo.dueTime;
		dueTime.setAttribute('type', 'time');
		dueTime.disabled = true;
		container.appendChild(dueTime);
	
		const editBtn = document.createElement('img');
		editBtn.classList.add('edit');
		editBtn.src = editImg;
		container.appendChild(editBtn);
	
		editBtn.addEventListener('click', () => {
			dialogHandler.editTask(todo);
		});
	
		const deleteBtn = document.createElement('img');
		deleteBtn.classList.add('delete');
		deleteBtn.src = deleteImg;
		container.appendChild(deleteBtn);
	},

	editTaskComponent: (editedTask, component) => {
		renderer.makeTaskComponent(editedTask, component)
	},

	renderProjects: (list, parent) => {
		if (list.length == 0) { return; }

		list.forEach((project) => {
			const projectContainer = document.createElement('button');
			projectContainer.addEventListener('click', expandProject);
			parent.appendChild(projectContainer);

			const icon = document.createElement('img');
			icon.src = projectIcon;
			projectContainer.appendChild(icon);

			const projectTitle = document.createElement('h4');
			projectTitle.innerHTML = project.title;
			projectContainer.appendChild(projectTitle);

			function expandProject() {
				const container = document.querySelector('.main');

				let prev = container.querySelectorAll('h1, div, p, h5, img, header');
				prev.forEach((element) => element.remove());

				const headerContainer = document.createElement('header');
				container.appendChild(headerContainer);

				const title = document.createElement('h1');
				title.innerHTML = project.title;
				headerContainer.appendChild(title);

				const addTask = document.createElement('img');
				addTask.src = addTaskIcon;
				headerContainer.appendChild(addTask);

				addTask.addEventListener('click', () => {
					dialogHandler.showTaskDialog();
				});

				const description = document.createElement('h5');
				description.innerHTML = project.description;
				container.appendChild(description);

				const date = document.createElement('p');
				date.innerHTML = project.dueDate;
				container.appendChild(date);

				const projectTasksContainer = document.createElement('div');
				projectTasksContainer.classList.add('projectTasksContainer');
				container.appendChild(projectTasksContainer);

				const tasksContainer = container.querySelector('.projectTasksContainer')
				
				generateTasksFromProject(tasksContainer);
			}

			function generateTasksFromProject(container) {
				if (project.tasks.length > 0) {
					console.log(project.tasks.length)
					project.tasks.forEach((task) => {
						renderer.makeTaskComponent(task, container);
						console.log(task);
					});
				}
			}
		});
	},

	renderDialogProjects: (list, parent) => {
		if (list.length == 0) return;

		const legend = document.createElement('legend');
		legend.innerHTML = 'Select a project';
		parent.appendChild(legend);

		const select = document.createElement('select');
		select.setAttribute('name', 'project');
		parent.appendChild(select);

		createOption(); // 'none' option
		
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
}