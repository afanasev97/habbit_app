var log = console.log;

function getMaxCredit(age, hasJob) {
	switch (true) {
		case age > 24: return hasJob ? 500 : 100;
		default: return 0;
	}
}

function calculateAllMoney(age, hasJob, ownMoney) {
	return getMaxCredit(age, hasJob) + ownMoney;
}

function getRandomUser() {
	return {
        age: Math.floor(Math.random() * 40) + 16,
        hasJob: Math.random() > 0.5,
        ownMoney: Math.floor(Math.random() * 3950) + 50
    };
}
const price = 2000;
user = getRandomUser();
log(user);
log('Макс денег с кредитом: ',calculateAllMoney(user.age, user.hasJob, user.ownMoney))
log(`Покупатель${calculateAllMoney(user.age, user.hasJob, user.ownMoney) >= price ? ' ' : ' не '}может купить товар стоимостью ${price}$.`);