#!/bin/bash

# Перелік всіх HTML-файлів
HTML_FILES=$(find . -name "*.html" -not -path "./index.html" -not -path "./support.html")

# Додавання CSS для теми
for file in $HTML_FILES; do
  # Додавання CSS
  sed -i 's|<link rel="stylesheet" href="./styles/decorations.css" />|<link rel="stylesheet" href="./styles/decorations.css" />\n  <link rel="stylesheet" href="./styles/theme-toggle.css" />|g' $file
  sed -i 's|<link rel="stylesheet" href="./styles/decorations.css">|<link rel="stylesheet" href="./styles/decorations.css">\n  <link rel="stylesheet" href="./styles/theme-toggle.css">|g' $file

  # Додавання кнопки перемикання теми
  sed -i 's|<button id="login-tg" class="auth-btn tg">Войти через TG</button>|<button id="login-tg" class="auth-btn tg">Войти через TG</button>\n            <button id="theme-toggle" class="theme-toggle-btn" title="Переключить тему">\n              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                <circle cx="12" cy="12" r="5"></circle>\n                <line x1="12" y1="1" x2="12" y2="3"></line>\n                <line x1="12" y1="21" x2="12" y2="23"></line>\n                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>\n                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>\n                <line x1="1" y1="12" x2="3" y2="12"></line>\n                <line x1="21" y1="12" x2="23" y2="12"></line>\n                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>\n                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>\n              </svg>\n            </button>|g' $file

  # Додавання JS для теми та чату
  sed -i 's|<script src="./assets/particles.js" defer></script>|<script src="./assets/particles.js" defer></script>\n  <script src="./assets/theme-switcher.js" defer></script>\n  <script src="./assets/chat-toggle.js" defer></script>|g' $file
done

echo "Всі файли оновлено!"
