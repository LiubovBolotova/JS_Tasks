let deckOfCards = [
	{
		score: 6,
		name: '6',
		suit: 'club',
	},
	{
		score: 7,
		name: '7',
		suit: 'club',
	},
	{
		score: 8,
		name: '8',
		suit: 'club',
	},
	{
		score: 9,
		name: '9',
		suit: 'club',
	},
	{
		score: 10,
		name: '10',
		suit: 'club',
	},
	{
		score: 2,
		name: 'J',
		suit: 'club',
	},
	{
		score: 3,
		name: 'Q',
		suit: 'club',
	},
	{
		score: 4,
		name: 'K',
		suit: 'club',
	},
	{
		score: 11,
		name: 'A',
		suit: 'club',
	},
	{
		score: 6,
		name: '6',
		suit: 'spade',
	},
	{
		score: 7,
		name: '7',
		suit: 'spade',
	},
	{
		score: 8,
		name: '8',
		suit: 'spade',
	},
	{
		score: 9,
		name: '9',
		suit: 'spade',
	},
	{
		score: 10,
		name: '10',
		suit: 'spade',
	},
	{
		score: 2,
		name: 'J',
		suit: 'spade',
	},
	{
		score: 3,
		name: 'Q',
		suit: 'spade',
	},
	{
		score: 4,
		name: 'K',
		suit: 'spade',
	},
	{
		score: 11,
		name: 'A',
		suit: 'spade',
	},
	{
		score: 6,
		name: '6',
		suit: 'heart',
	},
	{
		score: 7,
		name: '7',
		suit: 'heart',
	},
	{
		score: 8,
		name: '8',
		suit: 'heart',
	},
	{
		score: 9,
		name: '9',
		suit: 'heart',
	},
	{
		score: 10,
		name: '10',
		suit: 'heart',
	},
	{
		score: 2,
		name: 'J',
		suit: 'heart',
	},
	{
		score: 3,
		name: 'Q',
		suit: 'heart',
	},
	{
		score: 4,
		name: 'K',
		suit: 'heart',
	},
	{
		score: 11,
		name: 'A',
		suit: 'heart',
	},
	{
		score: 6,
		name: '6',
		suit: 'diamond',
	},
	{
		score: 7,
		name: '7',
		suit: 'diamond',
	},
	{
		score: 8,
		name: '8',
		suit: 'diamond',
	},
	{
		score: 9,
		name: '9',
		suit: 'diamond',
	},
	{
		score: 10,
		name: '10',
		suit: 'diamond',
	},
	{
		score: 2,
		name: 'J',
		suit: 'diamond',
	},
	{
		score: 3,
		name: 'Q',
		suit: 'diamond',
	},
	{
		score: 4,
		name: 'K',
		suit: 'diamond',
	},
	{
		score: 11,
		name: 'A',
		suit: 'diamond',
	},
];
let gamerVova = {
	cards: [],
	container: '.gamerCards',
	takeRandomCard: takeRandomCard,
	countResult: countResult,
};
let bankerJim = {
	cards: [],
	container: '.bankerCards',
	takeRandomCard: takeRandomCard,
	countResult: countResult,
};
let gamerResult;
let bankerResult;
let newDeckOfCards = [];

function startGame() {
	document.querySelector('.bankerCards').classList.add('hideCards');
	document.querySelector('.allGameResult').style.display = 'none';
	document.querySelector('.start').style.display = 'none';
	document.querySelector('.start').innerHTML = 'Новая игра?';
	document.querySelector('.gamerCards').innerHTML = '';
	document.querySelector('.bankerCards').innerHTML = '';
	document.querySelector('.bankerResult').innerHTML = '';
	document.querySelector('.gamerResult').innerHTML = '';
	document.querySelector('.action-buttons').style.display = 'flex';

	gamerVova.cards = [];
	bankerJim.cards = [];

	newDeckOfCards = deckOfCards.slice();
	gamerVova.takeRandomCard(newDeckOfCards);
	bankerJim.takeRandomCard(newDeckOfCards);
}

function giveCards() {
	gamerVova.takeRandomCard(newDeckOfCards);
	gamerResult = gamerVova.countResult();
	bankerResult = bankerJim.countResult();
	document.querySelector('.gamerResult').innerHTML = gamerResult;

	if (gamerResult > 21) {
		displayFields('Vova lost((');
	}

	if (gamerResult === 21) {
		displayFields('Vova! You won!');
	}

	if (bankerResult < 15) {
		bankerJim.takeRandomCard(newDeckOfCards);
		bankerResult = bankerJim.countResult();
	}

	if (bankerResult > 21) {
		displayFields('Vova! You won!');
	}

	if (bankerResult === 21) {
		displayFields('Banker Jim won');
	}
}

function stopTakingCards() {
	document.querySelector('.bankerCards').classList.remove('hideCards');
	let gamerResult = gamerVova.countResult();
	let bankerResult = bankerJim.countResult();

	if (bankerResult < 15) {
		bankerJim.takeRandomCard(newDeckOfCards);
		bankerResult = bankerJim.countResult();
	}

	if (bankerResult > 21 || bankerResult < gamerResult) {
		displayFields('Vova! You won!');
	}

	if (bankerResult === gamerResult) {
		displayFields('Nobody wins!');
	}

	if (bankerResult > gamerResult || bankerResult === 21) {
		displayFields('Vova! You Lost!');
	}

	document.querySelector('.bankerResult').innerHTML = bankerResult;
}

function countResult() {
	let result = this.cards.reduce(function(result, card) {
		return result + card.score;
	}, 0);

	return result;
}

function takeRandomCard(deck) {
	let randomNum = Math.ceil(Math.random() * deck.length - 1);
	let card = deck[randomNum];
	let cardName = `${deck[randomNum].suit}_${deck[randomNum].name}.png`;
	let div = document.createElement('div');
	div.style.backgroundImage = 'url' + '(' + cardName + ')';
	document.querySelector(this.container).appendChild(div);
	this.cards.push(card);
	deck.splice(randomNum, 1);
}

function displayFields(allGameResult) {
	document.querySelector('.bankerCards').classList.remove('hideCards');
	document.querySelector('.action-buttons').style.display = 'none';
	document.querySelector('.start').style.display = 'flex';
	document.querySelector('.bankerResult').innerHTML = bankerResult;
	document.querySelector('.allGameResult').style.display = 'flex';
	document.querySelector('.allGameResult').innerHTML = allGameResult;
}
