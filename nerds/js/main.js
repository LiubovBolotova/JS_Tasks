var flag = true;

function deleteMarker() {
  if (flag) {
    document.getElementById('marker').remove();
  }

  flag = false;
}

document.querySelector('footer').innerHTML = footer;
document.querySelector('header').innerHTML = header;

var writeUsCloseCross = document.querySelector('.close-cross');

writeUsCloseCross.addEventListener('click', function() {
  document
    .querySelector('.write-us-container')
    .classList.add('visually-hidden');
});

var buttonMapInfo = document.querySelector('.button-map-info');

buttonMapInfo.addEventListener('click', function() {
  document
    .querySelector('.write-us-container')
    .classList.remove('visually-hidden');
});

var navigationList = document.querySelector('.site-navigation');
var navigationListLinks = navigationList.getElementsByTagName('a');

navigationList.addEventListener('click', function(event) {
  if (!event.target || event.target.nodeName !== 'A') {
    return;
  }

  for (var i = 0; i < navigationListLinks.length; i++) {
    navigationListLinks[i].classList.remove('active-link');
  }

  event.target.classList.add('active-link');
});
