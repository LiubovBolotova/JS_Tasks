var divsInCarusel = document.querySelectorAll('.carousel section');
var buttonBox = document.querySelector('.buttons-box');
var caruselInterval;
var prev = 0;

function next(numberPosition) {
  clearInterval(caruselInterval);
  divsInCarusel[prev].classList.remove('visible');
  divsInCarusel[numberPosition].classList.add('visible');
  prev = numberPosition;
  for (var i = 0; i < buttonBox.children.length; i++) {
    buttonBox.children[i].checked = false;
  }
  buttonBox.children[numberPosition].checked = true;
  startInterval();
}

function startInterval() {
  caruselInterval = setInterval(() => {
    var nextStep = prev + 1;
    if (nextStep >= buttonBox.children.length) {
      nextStep = 0;
    }
    next(nextStep);
  }, 5000);
}

for (var i = 0; i < divsInCarusel.length; i++) {
  var newButton = document.createElement('input');
  newButton.setAttribute('type', 'radio');
  newButton.setAttribute('name', 'carusel');
  if (i === 0) {
    newButton.setAttribute('checked', true);
  }
  newButton.setAttribute('onclick', 'next(' + i + ')');
  buttonBox.appendChild(newButton);
}

divsInCarusel[prev].classList.add('visible');

startInterval();
