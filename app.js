var log = console.log;
// Основы задача 16
const hourlyRateUSD = 80;
const availiableHours = (11 - 2) * 5;
let projectHours = 40;
function countCost(timeForTask, hourlyRate) {
	return timeForTask * hourlyRate;
}

function isEnoughTimeForWork(taskTime) {
	return (taskTime <= availiableHours)
}

log(`Успеем выполнить проект: ${isEnoughTimeForWork(projectHours) ? 'Да' : 'Нет'}`);
if (isEnoughTimeForWork(projectHours)) log(`Цена проекта: ${countCost(projectHours, hourlyRateUSD)}$`)