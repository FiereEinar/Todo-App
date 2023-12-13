import { pubsub } from "./pubsub.js";

export class Todo {
    constructor(title, dueDate, dueTime) {
        this.title = title;
        this.dueDate = dueDate;
        this.dueTime = dueTime
        this.done = false;
    }
}

export const todo = {
    todos: [],

    createTodo: (title, dueDate, dueTime) => {
        if (title == '' || dueDate == '') {
            console.log('cancelled');
            return;
        }

        const newTodo = new Todo(title, dueDate, dueTime);
        todo.addTodo(newTodo);

        pubsub.publish('todoUpdated', todo.todos);
    },
    
    // for making a to-do and returning it without 
    // adding it to the array
    makeTodo: (title, dueDate, dueTime) => {
    	const newTodo = new Todo(title, dueDate, dueTime);
    	return newTodo;
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

    updateTodo: (newList) => {
        todo.todos = newList;
    },
}