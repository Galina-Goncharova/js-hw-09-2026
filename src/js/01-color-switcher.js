import '../css/common.css';

const refStart = document.querySelector('[data-start]');
const refStop = document.querySelector('[data-stop]');
const refBody = document.querySelector('body');

let timerId = null;

refStart.addEventListener('click', onChangeColor);

refStop.addEventListener('click', onGetColor);

function onChangeColor() {
  refStart.disabled = true;
  refStop.disabled = false;
  timerId = setInterval(() => {
    refBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onGetColor() {
  refStart.disabled = false;
  refStop.disabled = true;

  console.log('Ваш цвет:', refBody.style.backgroundColor);
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
