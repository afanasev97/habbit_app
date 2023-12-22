var log = console.log;
const userAnswer = prompt('Сколько будет 7 + или - 15?');
switch(true) {
	case userAnswer === 'Я не робот':
	case Number(userAnswer) === -8:
	case Number(userAnswer) === 22:
	    log('Успех');
		break;
	default:
		log('Вы робот!');
}

// userAnswer in ['-8','22','Я не робот'] ? log('Успех') : log('Вы робот!');