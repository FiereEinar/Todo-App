import { pubsub } from "./pubsub.js";
import { todo } from "./todo.js";

class Project {
    constructor(title, dueDate, dueTime, description) {
        this.title = title;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.description = description;
        this.tasks = [];
    }

    addToTasks(item) {
        this.tasks.push(item);
    }

    updateTasks(newTasksList) {
        this.tasks = newTasksList;
    }

    removeTask(item) {
        this.tasks = this.tasks.filter((task) => task.id != item.id);
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

    deleteProject: (item) => {
        todo.removeTasksFromProjects(item);
        projects.projectsList = projects.projectsList.filter((project) => project.title != item.title);
        console.log(projects.projectsList);
        pubsub.publish('projectsUpdated', projects.projectsList);
    },

    addTaskToProjects: (item) => {
        projects.projectsList.map((project) => {
            if (project.title == item.projectType) {
                project.addToTasks(item);
            }
        });
    },

    removeTaskToProjects: (item) => {
        projects.projectsList.map((project) => {
            if (project.title == item.projectType) {
                project.removeTask(item);
            }
        });
    },
}