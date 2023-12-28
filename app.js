var log = console.log;

const operations = [1000, -700, 300, -500, 10000];
const balance = 100;

function getActualBalance(operationsArr, balance) {
	for (const operation of operationsArr) {
		balance += operation;
	}
	return balance;
};

function hasNegativeBalanceAfterOperation(operationsArr, balance) {
	for (const operation of operationsArr) {
		balance += operation;
		if (balance < 0) return false;
	}
	return true;
}

function countAverageIncomeAndOutcome(operationsArr) {
	let positive = 0;
	let negative = 0;
	for (const operation of operationsArr) {
		operation > 0 ? positive += operation : negative += operation;
	}
	return `Средний доход: ${(positive / operationsArr.filter(el => el > 0).length).toFixed(2)}\nСредний расход: ${(negative / operationsArr.filter(el => el < 0).length).toFixed(2)}\n`
}

log(getActualBalance(operations, balance))
log(countAverageIncomeAndOutcome(operations))
log(hasNegativeBalanceAfterOperation(operations, balance))