import Notiflix from 'notiflix';

const selectors = {
  form: document.querySelector('.form'),
};

selectors.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  const delay = Number(selectors.form.elements.delay.value);
  const step = Number(selectors.form.elements.step.value);
  const amount = Number(selectors.form.elements.amount.value);
  const promises = [];

  if (amount <= 0) {
    Notiflix.Notify.failure('Please set the amount more than 0');
    promises = [];
  } else {
    promises.push(createPromise(1, delay));
  }

  for (let i = 1; i < amount; i += 1) {
    promises.push(createPromise(i + 1, i * step + delay));
  }

  Promise.allSettled(promises).then(items => {
    items.forEach((item, i) => {
      setTimeout(() => {
        if (item.status === 'fulfilled') {
          Notiflix.Notify.success(item.value);
        } else {
          Notiflix.Notify.failure(item.reason);
        }
      }, i * step + delay);
    });
  });
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      res(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      rej(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}
