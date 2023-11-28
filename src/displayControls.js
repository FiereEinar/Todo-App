export const controls = {
    init: () => {
        const taskDialog = document.querySelector('.addTaskDialog');
        const addTaskButton = document.querySelector('.addTaskButton');
        const closeDialogButton = document.querySelector('.addTaskDialog button');

        addTaskButton.addEventListener('click', () => {
            taskDialog.showModal();
        });

        closeDialogButton.addEventListener('click', () => {
            taskDialog.close();
        })
    }
}