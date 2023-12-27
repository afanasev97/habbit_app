const { addTask, removeTask, unshiftTask, tasks, log } = require('./app.js');

(() => {
    addTask('Задача 2', tasks);
    addTask('Задача 2', tasks);
    addTask('Задача 3', tasks);
    addTask('Задача 4', tasks);
    addTask('Задача 5', tasks);
    addTask('Задача 6', tasks);
    addTask('Задача 7', tasks);
    log(tasks);
    removeTask('Задача 2', tasks);
    log(tasks);
    addTask('Задача 2', tasks);
    log(tasks);
    unshiftTask('Задача 2', tasks);
    log(tasks);
    unshiftTask('Задача 1', tasks);
    log(tasks);
})();