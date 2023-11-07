// Описаний в документації
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const selectors = {
  input: document.getElementById('datetime-picker'),
  btn: document.querySelector('button'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  label: document.querySelectorAll('.label'),
  value: document.querySelectorAll('.value'),
  timerBox: document.querySelector('.timer'),
};

let counter = 0;
let markup = {};

selectors.btn.disabled = true;
selectors.btn.addEventListener('click', handlerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = options.defaultDate;
    let selectedDate = Number(selectedDates[0]);
    if (currentDate >= selectedDate) {
      Notiflix.Report.warning(
        'Warning',
        'Please choose a date in the future',
        'Ok'
      );
    } else {
      selectors.btn.removeAttribute('disabled');
      counter = selectedDate - currentDate;
      markup = convertMs(counter);
      console.log(markup);
      addLeadingZero(markup);
    }
  },
};

const fp = flatpickr(selectors.input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // days
  const days = Math.floor(ms / day);
  // hours
  const hours = Math.floor((ms % day) / hour);
  // minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  selectors.days.textContent = `${days}`.padStart(2, '0');
  selectors.hours.textContent = `${hours}`.padStart(2, '0');
  selectors.minutes.textContent = `${minutes}`.padStart(2, '0');
  selectors.seconds.textContent = `${seconds}`.padStart(2, '0');
}

function handlerStart() {
  const timerIdInterval = setInterval(() => {
    if (counter <= 1000) {
      clearInterval(timerIdInterval);
      Notiflix.Report.success('Timer is finished', 'Nice job!', 'Done!');
      return;
    }

    counter -= 1000;
    markup = convertMs(counter);
    addLeadingZero(markup);
  }, 1000);

  selectors.btn.disabled = true;
}
