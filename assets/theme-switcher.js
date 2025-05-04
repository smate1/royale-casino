
// Скрипт для управління темою (темна/світла тема)
document.addEventListener('DOMContentLoaded', function () {
	// Перевіряємо збережену тему в localStorage або використовуємо темну за замовчуванням
	const savedTheme = localStorage.getItem('theme') || 'dark'

	// Функція для встановлення теми
	function setTheme(theme) {
		if (theme === 'light') {
			document.documentElement.classList.add('light-theme')
			document.documentElement.classList.remove('dark-theme')
		} else {
			document.documentElement.classList.add('dark-theme')
			document.documentElement.classList.remove('light-theme')
		}
		// Зберігаємо тему в localStorage
		localStorage.setItem('theme', theme)

		// Міняємо іконку кнопки перемикача теми
		updateThemeButtonIcon(theme)
	}

	// Функція для оновлення іконки кнопки теми
	function updateThemeButtonIcon(theme) {
		const themeToggle = document.getElementById('theme-toggle')
		if (themeToggle) {
			// Змінюємо іконку в залежності від активної теми
			if (theme === 'light') {
				themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`
				themeToggle.setAttribute('title', 'Переключить на темную тему')
			} else {
				themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`
				themeToggle.setAttribute('title', 'Переключить на светлую тему')
			}
		}
	}


	// Встановлюємо початкову тему
	setTheme(savedTheme)

	// Знаходимо кнопку перемикання теми
	const themeToggle = document.getElementById('theme-toggle')
	if (themeToggle) {
		// Додаємо слухач подій на кнопку перемикання теми
		themeToggle.addEventListener('click', function () {
			const currentTheme = localStorage.getItem('theme') || 'dark'
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
			setTheme(newTheme)
		})
	}
})


