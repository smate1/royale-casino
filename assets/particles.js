// Анімовані частинки для фону Casino Royale
document.addEventListener('DOMContentLoaded', function() {
  // Створюємо контейнер для частинок
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles-container');
  document.body.appendChild(particlesContainer);

  // Кількість частинок
  const particlesCount = 25;

  // Створюємо частинки
  for (let i = 0; i < particlesCount; i++) {
    createParticle(particlesContainer);
  }

  // Функція для створення частинки
  function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Випадковий розмір
    const size = Math.random() * 20 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Випадкова початкова позиція
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    // Випадкова прозорість
    const opacity = Math.random() * 0.2;
    particle.style.opacity = opacity;

    // Випадковий радіус рамки
    const borderRadius = Math.random() * 50;
    particle.style.borderRadius = `${borderRadius}%`;

    // Випадковий тип частинки (квадрат, коло, ромб)
    const particleType = Math.floor(Math.random() * 3);
    if (particleType === 0) {
      particle.style.borderRadius = '50%';
    } else if (particleType === 1) {
      particle.style.transform = 'rotate(45deg)';
    }

    // Випадкова тривалість анімації
    const animationDuration = Math.random() * 40 + 20;
    particle.style.animationDuration = `${animationDuration}s`;

    // Випадкова затримка анімації
    const animationDelay = Math.random() * 10;
    particle.style.animationDelay = `${animationDelay}s`;

    // Додаємо частинку до контейнера
    container.appendChild(particle);
  }
});
