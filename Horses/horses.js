function Horse(name) {
	let privatHorseMileage = 0;

	this.name = name || 'Anonim';

	this.fatigue = 0;

	this.getPrivatHorseMileage = function() {
		return privatHorseMileage;
	};

	this.run = increase => {
		if (increase >= 10) {
			privatHorseMileage += 10;
			this.fatigue += 10;
			this.__proto__.totalHorseMileage += 10;
			setTimeout(() => {
				this.fatigue = 0;

				this.run(increase - 10);
			}, 3000);
		} else {
			this.fatigue = increase;
			console.log((privatHorseMileage += increase));
			this.__proto__.totalHorseMileage += increase;
		}
	};
}

Horse.prototype.totalHorseMileage = 0;

let horse1 = new Horse();
console.log((horse1.name = 'Лоша'));
horse1.run(20);

let horse2 = new Horse();
console.log((horse2.name = 'Жужа'));
horse2.run(25);
