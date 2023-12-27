var log = console.log;
const tasks = ['Задача 1'];
function addTask(task, taskArr) {
	taskArr.push(task);
};
// classic:
// function removeTask(task, taskArr) {
// 	while (taskArr.includes(task)) {
// 		taskArr.splice(taskArr.indexOf(task), 1);
// 	};
// };
// recursive:
function removeTask(task, taskArr) {
	if (taskArr.includes(task)) {
		taskArr.splice(taskArr.indexOf(task), 1);
		return removeTask(task, taskArr)
	};
};

function unshiftTask(task, taskArr) {
	removeTask(task, taskArr);
	taskArr.unshift(task);
};

module.exports = {
    tasks,
    addTask,
    removeTask,
    unshiftTask,
    log
};