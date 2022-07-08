document.querySelectorAll(".simplebar-container").forEach((item) => {
  new SimpleBar(item, {
    autoHide: false,
    scrollbarMaxSize: 25,
  });
});

const btnDirections = document.querySelectorAll('.directions__btn');
const dropdowns = document.querySelectorAll('.directions__dropdown');

btnDirections.forEach((elem) => {
  elem.addEventListener('click', (e) => {

    let currentBtn = e.currentTarget;

    let dropdown = currentBtn
      .closest('.directions__item')
      .querySelector('.directions__dropdown');

    btnDirections.forEach((elem) => {
      if (elem != currentBtn) {
        elem.classList.remove('directions__btn--active');
      }
    });

    dropdowns.forEach((elem) => {
      if (elem != dropdown) {
        elem.classList.remove('directions__dropdown--active');
      }
    });

    dropdown.classList.toggle('directions__dropdown--active');
    currentBtn.classList.toggle('directions__btn--active');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.directions')) {
      btnDirections.forEach((elem) => {
        elem.classList.remove('directions__btn--active');
      });
      dropdowns.forEach((elem) => {
        elem.classList.remove('directions__dropdown--active');
      });
    }
  });
});
