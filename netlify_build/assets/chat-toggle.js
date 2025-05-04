// Скрипт для згортання/розгортання чату
document.addEventListener('DOMContentLoaded', function() {
  const chatContainer = document.querySelector('.chat-container');

  // Якщо на сторінці немає чату, виходимо
  if (!chatContainer) return;

  // Додаємо кнопку згортання/розгортання чату
  const chatHeader = chatContainer.querySelector('.section-title');

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'chat-toggle-btn';
  toggleBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  toggleBtn.setAttribute('title', 'Свернуть/развернуть чат');

  // Додаємо кнопку після заголовка чату
  if (chatHeader) {
    chatHeader.appendChild(toggleBtn);

    // Додаємо стилі для кнопки в заголовку чату
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
  }

  // Знаходимо блок ranks-container, щоб змінити його розмір при згортанні чату
  const featuresSection = chatContainer.closest('.features-section');
  const ranksContainer = featuresSection ? featuresSection.querySelector('.ranks-container') : null;

  // Перевіряємо, чи був чат згорнутий раніше
  const isChatCollapsed = localStorage.getItem('chatCollapsed') === 'true';

  // Функція для згортання/розгортання чату
  function toggleChat() {
    const isCurrentlyCollapsed = chatContainer.classList.toggle('chat-collapsed');

    // Змінюємо іконку кнопки
    if (isCurrentlyCollapsed) {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;
      toggleBtn.setAttribute('title', 'Развернуть чат');

      // Збільшуємо блок з рангами, якщо він існує
      if (ranksContainer) {
        ranksContainer.style.flexGrow = '2';
      }
    } else {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
      toggleBtn.setAttribute('title', 'Свернуть чат');

      // Повертаємо звичайний розмір блоку з рангами
      if (ranksContainer) {
        ranksContainer.style.flexGrow = '1';
      }
    }

    // Зберігаємо стан чату
    localStorage.setItem('chatCollapsed', isCurrentlyCollapsed);
  }

  // Додаємо обробник події для кнопки
  toggleBtn.addEventListener('click', toggleChat);

  // Встановлюємо початковий стан чату
  if (isChatCollapsed) {
    toggleChat();
  }
});
