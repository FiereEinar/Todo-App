import { pubsub } from "./pubsub.js";
import { Todo } from "./todo.js";

class Project extends Todo {
    constructor(title, dueDate, dueTime, description) {
        super(title, dueDate, dueTime);
        this.description = description;
        this.tasks = [];
    }
}

export const projects = {
    projectsList: [],

    createProject: (title, dueDate, dueTime, description) => {
        if (title == '' || description == '') {
            console.log('cancelled');
            return;
        }
        const project = new Project(title, dueDate, dueTime, description);
        projects.addToProjectsList(project);
        
        pubsub.publish('projectsUpdated', projects.projectsList);
    },
    addToProjectsList: (item) => {
        projects.projectsList.push(item);
    },
    getProjectsList: () => {
        return projects.projectsList;
    },
}