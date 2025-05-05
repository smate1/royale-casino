document.addEventListener('DOMContentLoaded', function () {
	const savedTheme = localStorage.getItem('theme') || 'dark'

	function setTheme(theme) {
		if (theme === 'light') {
			document.documentElement.classList.add('light-theme')
			document.documentElement.classList.remove('dark-theme')
		} else {
			document.documentElement.classList.add('dark-theme')
			document.documentElement.classList.remove('light-theme')
		}
		localStorage.setItem('theme', theme)
		updateThemeButtonIcons(theme) // <== оновлюємо обидві іконки
	}

	function updateThemeButtonIcons(theme) {
		const toggleButtons = document.querySelectorAll('.theme-toggle-btn')
		toggleButtons.forEach(btn => {
			if (theme === 'light') {
				btn.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
					</svg>`
				btn.setAttribute('title', 'Переключить на темную тему')
			} else {
				btn.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
				btn.setAttribute('title', 'Переключить на светлую тему')
			}
		})
	}

	setTheme(savedTheme)

	// Додаємо обробник до всіх кнопок з класом .theme-toggle-btn
	document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
		btn.addEventListener('click', function () {
			const currentTheme = localStorage.getItem('theme') || 'dark'
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
			setTheme(newTheme)
		})
	})
})
