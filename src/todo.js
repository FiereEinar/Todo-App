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
        if (title == '' || dueDate == '' || dueTime == '') {
            alert('Incomplete Data');
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

    updateEditedTask: (id, item) => {
        todo.todos.forEach((task) => {
            if (task.id == id) {
                todo.updateTaskFromProjects(task, item);
                pubsub.publish('todoUpdated', todo.todos);
            }
        });
    },

    updateTaskFromProjects: (currentTask, newData) => {
        // TODO: optimize this
        currentTask.title = newData.title;
        currentTask.dueDate = newData.dueDate;
        currentTask.dueTime = newData.dueTime;
        currentTask.projectType = newData.projectType;
        currentTask.done = newData.done;
        currentTask.id = newData.id;
    },

    changeTodoState: (item) => {
        item.done = !item.done;
        pubsub.publish('todoUpdated', todo.todos);
        pubsub.publish('todoStatusChanged', item);
        return item.done;
    },
    
    getTodo: () => {
    	return todo.todos;
    },

    updateTodo: (newList) => {
        todo.todos = newList;
    },

    updateTodoStatusInTasks: (item) => {
        todo.todos.map((task) => {
            if (task.id == item.id) {
                task.done = item.done;
            }
        });
    },
}