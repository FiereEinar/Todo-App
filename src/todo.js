import { pubsub } from "./pubsub.js";

class Todo {
    constructor(title, dueDate, dueTime, projectType) {
        this.title = title;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.projectType = projectType;
        this.done = false;
        this.id = '';
    }
    setId(newId) {
        this.id = newId;
    }
}

export const todo = {
    todos: [],

    createTodo: (title, dueDate, dueTime, projectType) => {
        if (title == '' || dueDate == '') {
            console.log('cancelled');
            return;
        }

        const newTodo = new Todo(title, dueDate, dueTime, projectType);
        newTodo.setId(todo.generateId(5));
        todo.addTodo(newTodo);

        pubsub.publish('todoAdded', newTodo);
        pubsub.publish('todoUpdated', todo.todos);
    },
    
    // for making a to-do and returning it without 
    // adding it to the array
    makeTodo: (title, dueDate, dueTime, projectType) => {
    	const newTodo = new Todo(title, dueDate, dueTime, projectType);
        newTodo.setId(todo.generateId(5));
    	return newTodo;
    },

    generateId: (length) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result += Math.floor(Math.random() * 9999);
        return result;
    },

    removeTasksFromProjects: (item) => {
        todo.todos = todo.todos.filter((task) => task.projectType !== item.title);
        console.log(todo.todos)
        pubsub.publish('todoUpdated', todo.todos);
    },

    addTodo: (item) => {
        todo.todos.push(item);
    },

    removeTodo: (item) => {
        todo.todos = todo.todos.filter(tdo => tdo.id !== item.id);
        pubsub.publish('todoDeleted', item);
        pubsub.publish('todoUpdated', todo.todos);
    },
    
    getTodo: () => {
    	return todo.todos;
    },

    updateTodo: (newList) => {
        todo.todos = newList;
    },
}