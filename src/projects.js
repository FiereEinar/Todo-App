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
}

export const projects = {
    projectsList: [],

    createProject: (title, dueDate, dueTime, description) => {
        if (title == '' || dueDate == '' || dueTime == '') {
            alert('Incomplete Data');
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

    updateProjectsList: (newData) => {
        projects.projectsList = newData;
    },

    deleteProject: (item) => {
        todo.removeTasksFromProjects(item);
        projects.projectsList = projects.projectsList.filter((project) => project.title != item.title);
        pubsub.publish('projectsUpdated', projects.projectsList);
    },

    addTaskToProjects: (item) => {
        projects.projectsList.map((project) => {
            if (project.title == item.projectType) {
                projects.addTaskFromProject(project, item);
                pubsub.publish('projectsUpdated', projects.projectsList);
            }
        });
    },

    removeTaskToProjects: (item) => {
        projects.projectsList.map((project) => {
            if (project.title == item.projectType) {
                projects.removeTaskFromProject(project, item);
                pubsub.publish('projectsUpdated', projects.projectsList);
            }
        });
    },

    addTaskFromProject: (project, task) => {
        project.tasks.push(task);
    },

    removeTaskFromProject: (project, task) => {
        project.tasks = project.tasks.filter((object) => object.id != task.id);
    },

    updateTaskToProjects: (editedItem, newItem) => {
        projects.removeTaskToProjects(editedItem);
        projects.addTaskToProjects(newItem);
    },

    updateTaskStatusFromProjects: (newData) => {
        projects.projectsList.map((project) => {
            project.tasks.map((task) => {
                if (task.id == newData.id) {
                    todo.updateTaskFromProjects(task, newData);
                    pubsub.publish('projectsUpdated', projects.projectsList);
                }
            });
        });
    },
}