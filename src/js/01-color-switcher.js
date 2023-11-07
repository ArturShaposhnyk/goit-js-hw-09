const selectors = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let intervalId;

selectors.btnStart.addEventListener('click', handlerStart);
selectors.btnStop.addEventListener('click', handlerStop);

function handlerStart(evt) {
  evt.currentTarget.disabled = true;
  if (!intervalId) {
    intervalId = setInterval(getRandomHexColor, 1000);
  }
}

function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0);
  document.body.style.backgroundColor = '#' + randomColor;
}

function handlerStop() {
  selectors.btnStart.removeAttribute('disabled');
  clearInterval(intervalId);
  intervalId = null;
}
