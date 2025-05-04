// Скрипт для роботи бургер-меню
document.addEventListener('DOMContentLoaded', function() {
  const burgerBtn = document.querySelector('.burger-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (!burgerBtn || !mainNav || !menuOverlay) {
    console.error('Елементи бургер-меню не знайдені на сторінці');
    return;
  }

  // Функція для відкриття/закриття меню
  function toggleMenu() {
    burgerBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  // Прослуховувач для кнопки бургер
  burgerBtn.addEventListener('click', toggleMenu);

  // Прослуховувач для оверлея (закриття при кліку)
  menuOverlay.addEventListener('click', toggleMenu);

  // Прослуховувач для пунктів меню (закриття при вибору пункту)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mainNav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
});
