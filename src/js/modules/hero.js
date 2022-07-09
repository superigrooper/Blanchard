const heroSwiper = new Swiper(".hero__swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 3000,
  autoplay: {
    delay: 4000,
  },
  effect: "fade",
});

// Получаем высоту header и делаем отступ для hero, равный этой высоте
const header = document.querySelector('.header');
const offsetHeaderHeight = header.offsetHeight;
const hero = document.querySelector('.hero')
hero.style.paddingTop = `${offsetHeaderHeight}px`;