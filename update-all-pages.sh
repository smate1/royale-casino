#!/bin/bash

# Функция для добавления скрипта global-chat.js в HTML-файл
add_global_chat_script() {
  local file="$1"
  # Проверяем, есть ли уже скрипт в файле
  if ! grep -q "global-chat.js" "$file"; then
    # Добавляем скрипт перед закрывающим тегом body
    sed -i 's|</body>|  <script src="./assets/global-chat.js" defer></script>\n</body>|' "$file"
    echo "Добавлен global-chat.js в $file"
  else
    echo "global-chat.js уже присутствует в $file"
  fi
}

# Удалить лишнюю кнопку смены темы в auth-container
remove_duplicate_theme_buttons() {
  local file="$1"
  if grep -q "<button id=\"theme-toggle\" class=\"theme-toggle-btn\" title=\"Переключить тему\">" "$file"; then
    # Удаляем блок кнопки темы из div class="auth-container"
    sed -i '/<div class="auth-container">/,/<\/div>/ {
      /<button id="theme-toggle" class="theme-toggle-btn" title="Переключить тему">/,/<\/button>/ {
        /<button id="theme-toggle" class="theme-toggle-btn" title="Переключить тему">/d;
        /<svg xmlns=/d;
        /<circle cx=/d;
        /<line x1=/d;
        /<\/svg>/d;
        /<\/button>/d;
      }
    }' "$file"
    echo "Удалена дублирующаяся кнопка смены темы в $file"
  fi
}

# Удаляем старый скрипт chat-toggle.js из всех файлов
find . -name "*.html" -type f -exec sed -i 's|<script src="./assets/chat-toggle.js" defer></script>||g' {} \;
echo "Удален скрипт chat-toggle.js из всех HTML файлов"

# Удаляем дублирующиеся строки с theme-switcher.js
find . -name "*.html" -type f -exec sed -i '/^ *<script src="\.\/assets\/theme-switcher\.js" defer><\/script> *$/d' {} \;
find . -name "*.html" -type f -exec sed -i '0,/<script src="\.\/assets\/theme-switcher\.js" defer><\/script>/!d' {} \;
echo "Удалены дублирующиеся строки с theme-switcher.js"

# Удаляем дублирующиеся ссылки на theme-toggle.css
find . -name "*.html" -type f -exec sed -i '/^ *<link rel="stylesheet" href="\.\/styles\/theme-toggle\.css" \/> *$/d' {} \;
find . -name "*.html" -type f -exec sed -i '0,/<link rel="stylesheet" href="\.\/styles\/theme-toggle\.css">/!d' {} \;
echo "Удалены дублирующиеся ссылки на theme-toggle.css"

# Обрабатываем все HTML-файлы
for file in *.html; do
  if [ "$file" != "index.html" ]; then
    remove_duplicate_theme_buttons "$file"
  fi
  add_global_chat_script "$file"
done

echo "Обновление завершено!"
