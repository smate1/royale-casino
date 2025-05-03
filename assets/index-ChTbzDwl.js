document.addEventListener('DOMContentLoaded', () => {
	const auth = new d()
	new m(auth)
	new h()
})
localStorage.getItem('user')

var u = Object.defineProperty
var l = (a, e, t) =>
	e in a
		? u(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
		: (a[e] = t)
var o = (a, e, t) => l(a, typeof e != 'symbol' ? e + '' : e, t)
;(function () {
	const e = document.createElement('link').relList
	if (e && e.supports && e.supports('modulepreload')) return
	for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s)
	new MutationObserver(s => {
		for (const n of s)
			if (n.type === 'childList')
				for (const i of n.addedNodes)
					i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i)
	}).observe(document, { childList: !0, subtree: !0 })
	function t(s) {
		const n = {}
		return (
			s.integrity && (n.integrity = s.integrity),
			s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy),
			s.crossOrigin === 'use-credentials'
				? (n.credentials = 'include')
				: s.crossOrigin === 'anonymous'
				? (n.credentials = 'omit')
				: (n.credentials = 'same-origin'),
			n
		)
	}
	function r(s) {
		if (s.ep) return
		s.ep = !0
		const n = t(s)
		fetch(s.href, n)
	}
})()
class d {
	constructor() {
		o(this, 'currentUser', null)
		this.initAuthButtons(), this.checkAuthState()
	}
	initAuthButtons() {
		const e = document.getElementById('login-vk'),
			t = document.getElementById('login-tg')
		e && e.addEventListener('click', () => this.loginWithVK()),
			t && t.addEventListener('click', () => this.loginWithTelegram()),
			document.querySelectorAll('.auth-method').forEach(n => {
				n.addEventListener('click', i => {
					const c = i.currentTarget
					c.classList.contains('vk')
						? this.loginWithVK()
						: c.classList.contains('tg') && this.loginWithTelegram()
				})
			})
		const s = document.querySelector('.close-modal')
		s &&
			s.addEventListener('click', () => {
				const n = document.getElementById('auth-modal')
				n && (n.style.display = 'none')
			})
	}
	checkAuthState() {
		const e = localStorage.getItem('user')
		if (e)
			try {
				;(this.currentUser = JSON.parse(e)), this.updateUI()
			} catch (t) {
				console.error('Failed to parse user data:', t),
					localStorage.removeItem('user')
			}
	}
	updateUI() {
		const e = document.querySelector('.auth-container')
		if (e)
			if (this.currentUser) {
				e.innerHTML = `
        <div class="user-info">
          <img src="${this.currentUser.avatar}" alt="${
					this.currentUser.username
				}" class="user-avatar">
          <div class="user-details">
            <span class="user-name rank-${this.currentUser.rank.toLowerCase()}">${
					this.currentUser.username
				}</span>
            <span class="user-balance">${this.currentUser.balance.toFixed(
							2
						)} ₽</span>
          </div>
          <button id="logout-btn" class="auth-btn">Выйти</button>
        </div>
      `
				const t = document.getElementById('logout-btn')
				t && t.addEventListener('click', () => this.logout())
			} else
				(e.innerHTML = `
        <button id="login-vk" class="auth-btn vk">Войти через VK</button>
        <button id="login-tg" class="auth-btn tg">Войти через Telegram</button>
      `),
					this.initAuthButtons()
	}
	loginWithVK() {
		console.log('Логин через VK'),
			(this.currentUser = {
				id: 'vk' + Math.floor(Math.random() * 1e6),
				username: 'VK_User' + Math.floor(Math.random() * 100),
				avatar: './images/profile.svg',
				balance: 1e3,
				rank: 'BRONZE',
				totalDeposits: 5e3,
			}),
			localStorage.setItem('user', JSON.stringify(this.currentUser)),
			this.updateUI()
		const e = document.getElementById('auth-modal')
		e && (e.style.display = 'none')
	}
	loginWithTelegram() {
		console.log('Логин через Telegram'),
			(this.currentUser = {
				id: 'tg' + Math.floor(Math.random() * 1e6),
				username: 'TG_User' + Math.floor(Math.random() * 100),
				avatar: './images/profile.svg',
				balance: 2e3,
				rank: 'SILVER',
				totalDeposits: 12e3,
			}),
			localStorage.setItem('user', JSON.stringify(this.currentUser)),
			this.updateUI()
		const e = document.getElementById('auth-modal')
		e && (e.style.display = 'none')
	}
	logout() {
		;(this.currentUser = null), localStorage.removeItem('user'), this.updateUI()
	}
	getCurrentUser() {
		return this.currentUser
	}
}
class m {
	constructor(e) {
		o(this, 'messages', [])
		o(this, 'messagesContainer')
		o(this, 'messageInput')
		o(this, 'sendButton')
		o(this, 'auth')
		;(this.auth = e),
			(this.messagesContainer = document.getElementById('chat-messages')),
			(this.messageInput = document.getElementById('chat-input')),
			(this.sendButton = document.getElementById('chat-send-btn')),
			this.initChat()
	}
	initChat() {
		this.loadDemoMessages(),
			this.sendButton &&
				this.messageInput &&
				(this.sendButton.addEventListener('click', () => this.sendMessage()),
				this.messageInput.addEventListener('keypress', e => {
					e.key === 'Enter' && this.sendMessage()
				}))
	}
	loadDemoMessages() {
		const e = [
			{
				id: '1',
				userId: 'user1',
				username: 'Player123',
				userRank: 'BRONZE',
				content: 'Привет всем! Как дела?',
				timestamp: new Date(Date.now() - 36e5),
			},
			{
				id: '2',
				userId: 'user2',
				username: 'GoldMaster',
				userRank: 'GOLD',
				content:
					'Я только что выиграл 5000 в Jackpot! Кто хочет поучаствовать в следующей игре?',
				timestamp: new Date(Date.now() - 18e5),
			},
			{
				id: '3',
				userId: 'user3',
				username: 'DiamondQueen',
				userRank: 'DIAMOND',
				content: 'Запускаю розыгрыш через 10 минут! Приз - 1000 рублей',
				timestamp: new Date(Date.now() - 9e5),
			},
		]
		;(this.messages = e), this.renderMessages()
	}
	renderMessages() {
		this.messagesContainer &&
			((this.messagesContainer.innerHTML = ''),
			this.messages.forEach(e => {
				var r
				const t = document.createElement('div')
				;(t.className = 'chat-message'),
					(t.innerHTML = `
        <div class="message-header">
          <span class="message-username rank-${e.userRank.toLowerCase()}">${
						e.username
					}</span>
          <span class="message-time">${this.formatTime(e.timestamp)}</span>
        </div>
        <div class="message-content">${e.content}</div>
      `),
					(r = this.messagesContainer) == null || r.appendChild(t)
			}),
			(this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight))
	}
	formatTime(e) {
		return e.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}
	sendMessage() {
		if (!this.messageInput) return
		const e = this.messageInput.value.trim()
		if (!e) return
		const t = this.auth.getCurrentUser()
		if (!t) {
			const s = document.getElementById('auth-modal')
			s && (s.style.display = 'flex')
			return
		}
		const r = {
			id: Date.now().toString(),
			userId: t.id,
			username: t.username,
			userRank: t.rank,
			content: e,
			timestamp: new Date(),
		}
		this.messages.push(r), this.renderMessages(), (this.messageInput.value = '')
	}
}
class h {
	constructor() {
		o(this, 'games', ['jackpot', 'x50', 'dice', 'mines'])
		this.initGameCards()
	}
	initGameCards() {
		document.querySelectorAll('.game-card').forEach(t => {
			t.addEventListener('click', r => {
				if (!r.target.closest('.play-btn')) {
					r.preventDefault()
					const s = t.dataset.game
					s && this.navigateToGame(s)
				}
			})
		})
	}
	navigateToGame(e) {
		this.games.includes(e) && (window.location.href = `/games/${e}`)
	}
}
document.addEventListener('DOMContentLoaded', () => {
	const a = new d()
	new m(a), new h()
})
