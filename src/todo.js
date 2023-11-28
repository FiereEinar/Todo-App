

export class Todo {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = false;
    }

}

export const todo = {
    todos: [],

    init: () => {
        pubsub.subscribe('todoAdded', todo.addTodo);
    },

    createTodo: () => {
        const newTodo = new Todo('work', 'do the work', 'feb',);
        todo.addTodo(newTodo);
        const newTodo1 = new Todo('work2', 'do the work 2', 'feb 2',);
        todo.addTodo(newTodo1);
    },

    addTodo: (item) => {
        todo.todos.push(item);
    },

    removeTodo: (item) => {
        todo.todos = todo.todos.filter(obj => obj.title !== item);
    }
}

