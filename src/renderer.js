

export const renderer = {
	renderTodo: (list, parent) => {
		list.forEach((todo) => {
			const container = document.createElement('div');
			parent.appendChild(container);
			
			const todoName = document.createElement('h4');
			todo.innerHTML = todo.title;
			container.appendChild(todoName);
			console.log(todo.title);
			
			const dueDate = document.createElement('p');
			todo.innerHTML = todo.dueDate;
			container.appendChild(dueDate);
			console.log(todo.dueDate);
		});
	},
}