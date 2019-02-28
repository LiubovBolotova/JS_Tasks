function countCarriages(initCarriage) {
	// сначала мы знаем про один первый вагон
	let count = 1;

	// включим в нем свет:
	initCarriage.isLightOn = initCarriage.isLightOn || true;

	// повторяем поиск нового вагона со включенным светом
	// и выключение света в нем до тех пор,
	// пока в первом вагоне свет все еще горит
	do {
		count = findNextCarriageWithLight(initCarriage, count);
	} while (initCarriage.isLightOn);

	return count;
}

function findNextCarriageWithLight(initCarriage, currentCount) {
	// для начала новое количество вагонов пусть будет равно уже известному,текущему
	let updatedCount = currentCount;

	// для начала, текущий вагон -  тот, в котором мы находимся
	let currentCarriage = initCarriage;

	// перейдем в следующий вагон столько раз, сколько уже вагонов мы знаем
	for (let i = 0; i < currentCount; i++) {
		currentCarriage = currentCarriage.next;
	}

	// дальше неизвестные вагоны
	// будем прыгать, пока не найдем вагон со включенным светом
	while (currentCarriage.isLightOn === false) {
		currentCarriage = currentCarriage.next;
		updatedCount++;
	}

	// выключим свет в этом вагоне
	currentCarriage.isLightOn = false;

	// и вернем обновленное количество вагонов:
	return updatedCount;
}

let randomCarriageQuantity = Math.round(Math.random() * 20);

function generateTrain(carriageQuantity) {
	// здесь мы запомним первый вагон, чтобы потом ему previous и next добавить
	let firstCarriage;

	// здесь будем создавать новый вагон:
	let newCarriage;

	// здесь будем запоминать предыдущий созданный:
	let previousCarriage;

	//
	for (var i = 0; i < carriageQuantity; i++) {
		// создадим новый вагончик (генератор вагонов):

		newCarriage = {};

		newCarriage.isLightOn = !!Math.round(Math.random());

		if (i === 0) {
			// если это самый первый вагон, мы пока не можем присвоить его next и previous. сохраним в переменной firstCarriage ссылку на него.
			firstCarriage = newCarriage;
		} else {
			// если это НЕ первый вагон, мы присоединяем его к предыдущему (previousCarriage):
			newCarriage.previous = previousCarriage;
			previousCarriage.next = newCarriage;
		}

		// новосозданный вагон становится предыдущим:
		previousCarriage = newCarriage;
	}

	// цепляем последний вагон к первому:
	firstCarriage.previous = previousCarriage;
	newCarriage.next = firstCarriage;

	// вернем первый вагон:
	return firstCarriage;
}

//объединяем в функцию для удобства вывода через input:

function countCarriagesinTrain() {
	alert(countCarriages(generateTrain(randomCarriageQuantity)));
}
