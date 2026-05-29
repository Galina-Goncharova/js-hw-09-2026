import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStartEl.addEventListener('click', onStartTimer);

let msDates = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  minDate: 'today',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    const datesStopTimer = selectedDates[0];

    if (datesStopTimer <= new Date()) {
      alert('Please choose a date in the future');
    } else if (timerId) {
      return;
    } else {
      btnStartEl.disabled = false;

      msDates = datesStopTimer.getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartTimer() {
  btnStartEl.disabled = true;
  dateInputEl.disabled = true;
  timerId = setInterval(() => {
    const currentMs = msDates - Date.now();
    if (currentMs <= 0) {
      clearInterval(timerId);
      timerId = null;

      renderTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      dateInputEl.disabled = false;
      return;
    }
    const timeFromMs = convertMs(currentMs);
    renderTime(timeFromMs);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderTime({ days, hours, minutes, seconds }) {
  const daysText = addLeadingZero(days);
  const hoursText = addLeadingZero(hours);
  const minutesText = addLeadingZero(minutes);
  const secondsText = addLeadingZero(seconds);

  daysEl.textContent = daysText;
  hoursEl.textContent = hoursText;
  minutesEl.textContent = minutesText;
  secondsEl.textContent = secondsText;
}
