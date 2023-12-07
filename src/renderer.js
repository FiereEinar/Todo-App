import { pubsub } from "./pubsub.js";

import editImg from '../src/assets/edit.png';
import deleteImg from '../src/assets/delete.png';

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

			const dueDate = document.createElement('input');
			dueDate.value = todo.dueDate;
			dueDate.setAttribute('type', 'date');
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

			const inputs = container.querySelectorAll('input');
			editBtn.addEventListener('click', () => {
				inputs.forEach((input) => {
					input.disabled = !input.disabled;
					if (!input.disabled) {
						input.style.border = '1px solid'
					} else {
						input.style.border = '1px solid white'
					}
				});	
			});

			const deleteBtn = document.createElement('img');
			deleteBtn.classList.add('delete');
			deleteBtn.src = deleteImg;
			container.appendChild(deleteBtn);
			
			deleteBtn.addEventListener('click', () => {
				filterList(todo.title);
			});
		});
		function filterList(title) {
			list = list.filter((item) => item.title != title);
			pubsub.publish('todoUpdated', list);
		}
	},

	renderProjects: () => {

	},
}