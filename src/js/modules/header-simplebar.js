document.querySelectorAll(".simplebar-container").forEach((item) => {
  new SimpleBar(item, {
    autoHide: false,
    scrollbarMaxSize: 25,
  });
});