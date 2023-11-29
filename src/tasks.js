import { pubsub } from "./pubsub"

export const task = {
    tasks: [],

    init: () => {
        pubsub.subscribe('todoAdded', addTask);
    },

    addTask: (todo) => {
        task.tasks.push(todo);
    },

    
}