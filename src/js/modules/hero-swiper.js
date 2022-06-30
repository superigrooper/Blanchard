const heroSwiper = new Swiper(".hero__swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 3000,
  autoplay: {
    delay: 4000,
  },
  effect: "fade",
});

console.log('hello swiper')