import { pubsub } from "./pubsub.js";

export class Todo {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dueTime = dueTime
        this.done = false;
    }

}

export const todo = {
    todos: [],

    // init: () => {
    //     pubsub.subscribe('todoAdded', todo.addTodo);
    // },

    createTodo: (title, description, dueDate) => {
        if (title.value == '' || description.value == '' || dueDate.value == '') {
            console.log('cancelled');
            return;
        }

        const newTodo = new Todo(title.value, description.value, dueDate.value);
        todo.addTodo(newTodo);

        pubsub.publish('todoUpdated', todo.todos);
        console.log(todo.todos);
    },

    addTodo: (item) => {
        todo.todos.push(item);
    },

    removeTodo: (item) => {
        todo.todos = todo.todos.filter(obj => obj.title !== item);
    },
    
    getTodo: () => {
    	return todo.todos;
    },
}

