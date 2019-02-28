var sliderElem = document.querySelector('.range-controls');
var thumbElemMin = document.querySelector('.toggle-min');
var thumbElemMax = document.querySelector('.toggle-max');
var range = document.querySelector('.green-line');
var minInput = document.querySelector('#minInput');
var maxInput = document.querySelector('#maxInput');
var widthRange = 300;
var newLeftMax = 280;
var newLeftMin = 0;
let coefficient = 53.5714;

range.style.left = newLeftMin + 'px';
range.style.right = widthRange - newLeftMax + 'px';

function onchangeMinInput(value) {
  if (value / coefficient > newLeftMax) {
    newLeftMin = newLeftMax - 10;
  } else
    if (value < 0) {
      newLeftMin = 0
    } else {
      newLeftMin = value / coefficient;
    }

  thumbElemMin.style.left = newLeftMin + 'px';
  range.style.left = newLeftMin + 'px';
  minInput.value = Math.floor(newLeftMin * (coefficient));
}

function onchangeMaxInput(value) {
  if (value / coefficient < newLeftMin) {
    newLeftMax = newLeftMin + 10;
  } else if (value > 15000) { value = 15000 } else {
    newLeftMax = value / coefficient;
  }
  thumbElemMax.style.left = newLeftMax + 'px';
  range.style.right = widthRange - newLeftMax + 'px';
  maxInput.value = Math.floor(newLeftMax * (coefficient));
}

thumbElemMin.onmousedown = function (e) {
  var thumbCoords = getCoords(thumbElemMin);
  var shiftX = e.pageX - thumbCoords.left;
  // shiftY здесь не нужен, слайдер двигается только по горизонтали
  var sliderCoords = getCoords(sliderElem);

  document.onmousemove = function (e) {
    //  вычесть координату родителя, т.к. position: relative
    newLeftMin = e.pageX - shiftX - sliderCoords.left;
    // курсор ушёл вне слайдера
    if (newLeftMin < 0) {
      newLeftMin = 0;
    }

    var rightEdge = sliderElem.offsetWidth - thumbElemMin.offsetWidth;

    if (newLeftMin > newLeftMax) {
      newLeftMin = newLeftMax - 10;
    }

    thumbElemMin.style.left = newLeftMin + 'px';
    range.style.left = newLeftMin + 'px';
    minInput.value = Math.floor(newLeftMin * (coefficient));
  }

  document.onmouseup = function () {
    document.onmousemove = document.onmouseup = null;
  };

  return false; // disable selection start (cursor change)
};

thumbElemMin.ondragstart = function () {
  return false;
};

function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

thumbElemMax.onmousedown = function (e) {
  var thumbCoords = getCoords(thumbElemMax);
  var shiftX = e.pageX - thumbCoords.left;
  // shiftY здесь не нужен, слайдер двигается только по горизонтали
  var sliderCoords = getCoords(sliderElem);
  document.onmousemove = function (e) {
    //  вычесть координату родителя, т.к. position: relative
    newLeftMax = e.pageX - shiftX - sliderCoords.left;
    // курсор ушёл вне слайдера

    if (newLeftMax - 10 < newLeftMin) {
      newLeftMax = newLeftMin + 10;
    }
    var rightEdge = sliderElem.offsetWidth - thumbElemMax.offsetWidth;

    if (newLeftMax > rightEdge) {
      newLeftMax = rightEdge;
    }

    thumbElemMax.style.left = newLeftMax + 'px';
    range.style.right = widthRange - newLeftMax + 'px';
    maxInput.value = Math.floor(newLeftMax * (53.5714));
  }

  document.onmouseup = function () {
    document.onmousemove = document.onmouseup = null;
  };

  return false; // disable selection start (cursor change)
};

thumbElemMax.ondragstart = function () {
  return false;
};

function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}