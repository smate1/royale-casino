// Глобальный чат и панель выигрышей
document.addEventListener('DOMContentLoaded', function() {
  // ======== ГЛОБАЛЬНЫЙ ЧАТ ========

  // Проверка существования контейнеров и создание, если их нет
  function initializeGlobalChat() {
    if (!document.querySelector('.global-chat-container')) {
      const chatHTML = `
        <div class="global-chat-container global-chat-hidden">
          <div class="global-chat-header">
            <h3 class="global-chat-title">Общий чат</h3>
            <div class="global-chat-controls">
              <button class="global-chat-minimize-btn" title="Свернуть/развернуть чат">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
              <button class="global-chat-toggle-btn" title="Закрыть чат">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <div class="global-chat-messages" id="global-chat-messages">
            <!-- Сообщения будут добавляться динамически -->
          </div>
          <div class="global-chat-input-container">
            <input type="text" class="global-chat-input" id="global-chat-input" placeholder="Введите сообщение...">
            <button class="global-chat-send-btn" id="global-chat-send-btn">Отправить</button>
          </div>
        </div>
        <button class="global-chat-toggle" id="global-chat-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      `;
      document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    if (!document.querySelector('.live-wins-container')) {
      const winsHTML = `
        <div class="live-wins-container">
          <div class="live-wins-header">
            <h3 class="live-wins-title">
              <span class="live-indicator"></span>
              Live Выигрыши
            </h3>
            <button class="live-wins-toggle-btn" title="Скрыть панель">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul class="live-wins-list" id="live-wins-list">
            <!-- Выигрыши будут добавляться динамически -->
          </ul>
        </div>
        <button class="live-wins-toggle" id="live-wins-toggle">
          <span>ВЫИГРЫШИ</span>
        </button>
      `;
      document.body.insertAdjacentHTML('beforeend', winsHTML);
    }
  }

  // Инициализируем чат и панель выигрышей
  initializeGlobalChat();

  // Получаем элементы
  const globalChatContainer = document.querySelector('.global-chat-container');
  const globalChatToggle = document.getElementById('global-chat-toggle');
  const globalChatMinimizeBtn = document.querySelector('.global-chat-minimize-btn');
  const globalChatCloseBtn = document.querySelector('.global-chat-toggle-btn');
  const globalChatInput = document.getElementById('global-chat-input');
  const globalChatSendBtn = document.getElementById('global-chat-send-btn');
  const globalChatMessages = document.getElementById('global-chat-messages');

  const liveWinsContainer = document.querySelector('.live-wins-container');
  const liveWinsToggle = document.getElementById('live-wins-toggle');
  const liveWinsCloseBtn = document.querySelector('.live-wins-toggle-btn');
  const liveWinsList = document.getElementById('live-wins-list');

  // Загружаем сохраненные состояния
  const isChatHidden = localStorage.getItem('globalChatHidden') === 'true';
  const isChatCollapsed = localStorage.getItem('globalChatCollapsed') === 'true';
  const isWinsHidden = localStorage.getItem('liveWinsHidden') === 'true';

  // Установка начальных состояний
  if (!isChatHidden) {
    globalChatContainer.classList.remove('global-chat-hidden');
  }

  if (isChatCollapsed) {
    globalChatContainer.classList.add('global-chat-collapsed');
    globalChatMinimizeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;
  }

  if (isWinsHidden) {
    liveWinsContainer.classList.add('live-wins-collapsed');
  }

  // Функции для управления чатом
  function toggleChatVisibility() {
    const isHidden = globalChatContainer.classList.toggle('global-chat-hidden');
    localStorage.setItem('globalChatHidden', isHidden);
  }

  function toggleChatCollapse() {
    const isCollapsed = globalChatContainer.classList.toggle('global-chat-collapsed');

    if (isCollapsed) {
      globalChatMinimizeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;
    } else {
      globalChatMinimizeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
    }

    localStorage.setItem('globalChatCollapsed', isCollapsed);
  }

  function toggleWinsVisibility() {
    const isHidden = liveWinsContainer.classList.toggle('live-wins-collapsed');
    localStorage.setItem('liveWinsHidden', isHidden);
  }

  // Обработчики событий
  globalChatToggle.addEventListener('click', function() {
    globalChatContainer.classList.remove('global-chat-hidden');
    localStorage.setItem('globalChatHidden', false);
  });

  globalChatCloseBtn.addEventListener('click', toggleChatVisibility);
  globalChatMinimizeBtn.addEventListener('click', toggleChatCollapse);
  liveWinsCloseBtn.addEventListener('click', toggleWinsVisibility);
  liveWinsToggle.addEventListener('click', function() {
    liveWinsContainer.classList.remove('live-wins-collapsed');
    localStorage.setItem('liveWinsHidden', false);
  });

  // Отправка сообщения в чат
  function sendChatMessage() {
    const message = globalChatInput.value.trim();
    if (message) {
      // Генерируем случайное имя пользователя для демонстрации
      const randomUsernames = ['Player123', 'LuckyOne', 'GoldenStar', 'WinMaster', 'JackpotKing', 'CasinoQueen'];
      const username = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];

      // Добавляем сообщение в чат
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

      const messageHTML = `
        <div class="chat-message">
          <div class="chat-message-avatar">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' fill='none' stroke='%23FF6B00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E" alt="${username}">
          </div>
          <div class="chat-message-content">
            <div class="chat-message-username" data-username="${username}">${username}</div>
            <div class="chat-message-bubble">${message}</div>
            <div class="chat-message-time">${timeString}</div>
          </div>
        </div>
      `;

      globalChatMessages.insertAdjacentHTML('beforeend', messageHTML);
      globalChatInput.value = '';

      // Прокрутка к последнему сообщению
      globalChatMessages.scrollTop = globalChatMessages.scrollHeight;
    }
  }

  globalChatSendBtn.addEventListener('click', sendChatMessage);
  globalChatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });

  // Обработчик клика на имя пользователя (открывает его профиль)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('chat-message-username') || e.target.classList.contains('live-win-user')) {
      const username = e.target.dataset.username || e.target.textContent;
      window.location.href = `./profile.html?user=${encodeURIComponent(username)}`;
    }
  });

  // Демо-данные для чата при первой загрузке
  function populateDemoChat() {
    const demoMessages = [
      { username: 'CasinoKing', message: 'Всем привет! Как игра сегодня?', time: '14:25' },
      { username: 'LuckyGirl', message: 'Только что выиграла в Dice 5000 монет!', time: '14:26' },
      { username: 'Player007', message: 'Поздравляю! Я на x50 уже третий раз проигрываю(', time: '14:28' },
      { username: 'RichBoy', message: 'Кто знает, когда будет следующий розыгрыш?', time: '14:30' },
      { username: 'Gambler123', message: 'Мины сегодня щедрые, попробуйте', time: '14:32' }
    ];

    demoMessages.forEach(msg => {
      const messageHTML = `
        <div class="chat-message">
          <div class="chat-message-avatar">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' fill='none' stroke='%23FF6B00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E" alt="${msg.username}">
          </div>
          <div class="chat-message-content">
            <div class="chat-message-username" data-username="${msg.username}">${msg.username}</div>
            <div class="chat-message-bubble">${msg.message}</div>
            <div class="chat-message-time">${msg.time}</div>
          </div>
        </div>
      `;

      globalChatMessages.insertAdjacentHTML('beforeend', messageHTML);
    });

    // Прокрутка к последнему сообщению
    globalChatMessages.scrollTop = globalChatMessages.scrollHeight;
  }

  // Демо-данные для раздела Live выигрыши
  function populateDemoWins() {
    const games = ['Dice', 'Mines', 'X50', 'Jackpot'];
    const users = ['GoldenPlayer', 'LuckyOne', 'BigWinner', 'RichGamer', 'KingOfJackpot', 'DiamondHunter'];
    const amounts = [500, 1200, 3500, 10000, 2000, 1800, 4500, 7500];

    // Создаем список случайных выигрышей
    for (let i = 0; i < 10; i++) {
      const game = games[Math.floor(Math.random() * games.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      const minutes = Math.floor(Math.random() * 59);
      const time = `${14}:${minutes.toString().padStart(2, '0')}`;

      const winHTML = `
        <li class="live-win-item">
          <div class="live-win-game">
            <div class="live-win-game-name">${game}</div>
            <div class="live-win-time">${time}</div>
          </div>
          <div class="live-win-details">
            <div class="live-win-user" data-username="${user}">${user}</div>
            <div class="live-win-amount">+${amount} ₽</div>
          </div>
        </li>
      `;

      liveWinsList.insertAdjacentHTML('afterbegin', winHTML);
    }
  }

  // Добавляем демо данные
  if (!localStorage.getItem('chatInitialized')) {
    populateDemoChat();
    populateDemoWins();
    localStorage.setItem('chatInitialized', true);
  }

  // Имитация появления новых выигрышей
  setInterval(function() {
    if (Math.random() > 0.6) { // 40% шанс получения нового выигрыша
      const games = ['Dice', 'Mines', 'X50', 'Jackpot'];
      const users = ['GoldenPlayer', 'LuckyOne', 'BigWinner', 'RichGamer', 'KingOfJackpot', 'DiamondHunter'];
      const amounts = [500, 1200, 3500, 10000, 2000, 1800, 4500, 7500];

      const game = games[Math.floor(Math.random() * games.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];

      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

      const winHTML = `
        <li class="live-win-item">
          <div class="live-win-game">
            <div class="live-win-game-name">${game}</div>
            <div class="live-win-time">${time}</div>
          </div>
          <div class="live-win-details">
            <div class="live-win-user" data-username="${user}">${user}</div>
            <div class="live-win-amount">+${amount} ₽</div>
          </div>
        </li>
      `;

      // Добавляем новый элемент вверху списка
      liveWinsList.insertAdjacentHTML('afterbegin', winHTML);

      // Удаляем последний элемент, если их больше 15
      if (liveWinsList.children.length > 15) {
        liveWinsList.lastElementChild.remove();
      }
    }
  }, 3000); // Каждые 15 секунд
});
