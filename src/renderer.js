import { pubsub } from "./pubsub.js";
import { dialogHandler } from "./main.js";

import editImg from '../src/assets/edit.png';
import deleteImg from '../src/assets/delete.png';
import projectIcon from '../src/assets/empty-folder.png';
import addTaskIcon from '../src/assets/plus.png';

import { format, formatDistanceToNow } from 'date-fns';

// TODO: add checkbox
// TODO: add expand on click functionality
// TODO: add edit functionality

export const renderer = {
	renderTodo: (list, parent) => {
		const header = document.createElement('h1');
		
		if (list.length == 0) {
			header.innerHTML = 'Nothing to see here...';
			parent.appendChild(header);
			return;
		} else {
			header.innerHTML = 'Tasks';
			parent.appendChild(header);
		}

		list.forEach((todo) => {
			const container = document.createElement('div');
			container.classList.add('.container');
			parent.appendChild(container);

			const checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
			todo.done ? checkbox.checked = true : checkbox.checked = false;
			checkbox.addEventListener('click', () => {
				todo.done = !todo.done;
				todo.done ? container.style.backgroundColor = 'green':
							container.style.backgroundColor = 'white';
			});
			container.appendChild(checkbox);
			
			const todoName = document.createElement('input');
			todoName.value = todo.title;
			todoName.setAttribute('type', 'text');
			todoName.disabled = true;
			container.appendChild(todoName);

			const date = [todo.dueDate, todo.dueTime];
			const formattedDate = date.join('T');
			const dueDate = document.createElement('input');
			dueDate.value = formatDistanceToNow(new Date(formattedDate), {addSuffix: true});
			dueDate.setAttribute('type', 'text');
			dueDate.disabled = true;
			container.appendChild(dueDate);

			const dueTime = document.createElement('input');
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
			
			deleteBtn.addEventListener('click', () => {
				filterList(todo.title);
			});

			pubsub.subscribe('todoDeleted', filterList);
		});
		function filterList(title) {
			list = list.filter((item) => item.title != title);
			pubsub.publish('todoUpdated', list);
		}
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
			}
		});
	},
	renderDialogProjects: (list, parent) => {
		if (list.length == 0) return;
		
		list.forEach((proj) => {
			const projContainer = document.createElement('div');
			parent.appendChild(projContainer);

			const input = document.createElement('input');
			input.setAttribute('type', 'radio');
			input.setAttribute('value', proj.title);
			input.setAttribute('name', 'project');
			input.id = proj.title;
			projContainer.appendChild(input);

			const label = document.createElement('label');
			label.setAttribute('for', proj.title);
			label.innerHTML = proj.title;
			projContainer.appendChild(label);
		});
	},
}