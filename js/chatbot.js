// TNKL Chatbot - light mode
// Handles toggle, greeting, and simple echo

document.addEventListener('DOMContentLoaded', function () {
	var chatbotButton = document.getElementById('chatbot-button');
	var chatbotWindow = document.getElementById('chatbot-window');
	var chatbotClose = document.getElementById('chatbot-close');
	var chatbotForm = document.getElementById('chatbot-form');
	var chatbotInput = document.getElementById('chatbot-input');
	var chatbotMessages = document.getElementById('chatbot-messages');

	if (!chatbotButton || !chatbotWindow) return;

	function openChat() {
		chatbotWindow.style.display = 'block';
		chatbotWindow.setAttribute('aria-hidden', 'false');
		chatbotButton.classList.add('open');
		chatbotButton.setAttribute('aria-pressed', 'true');
		chatbotInput && chatbotInput.focus();
		if (chatbotMessages && !chatbotMessages.dataset.greeted) {
			appendBot("Hello! I'm the TNKL Assistant. How can I help you today?");
			chatbotMessages.dataset.greeted = '1';
		}
	}

	function closeChat() {
		chatbotWindow.style.display = 'none';
		chatbotWindow.setAttribute('aria-hidden', 'true');
		chatbotButton.classList.remove('open');
		chatbotButton.setAttribute('aria-pressed', 'false');
	}

	function appendMessage(text, isUser) {
		if (!chatbotMessages) return;
		var row = document.createElement('div');
		row.className = 'chat-row ' + (isUser ? 'user' : 'bot');
		var bubble = document.createElement('div');
		bubble.className = 'chat-bubble';
		bubble.textContent = text;
		row.appendChild(bubble);
		chatbotMessages.appendChild(row);
		chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
	}

	function appendBot(text) { appendMessage(text, false); }

	chatbotButton.addEventListener('click', function () {
		if (chatbotWindow.style.display === 'block') {
			closeChat();
		} else {
			openChat();
		}
	});

	if (chatbotClose) {
		chatbotClose.addEventListener('click', closeChat);
	}

	if (chatbotForm) {
		chatbotForm.addEventListener('submit', function (e) {
			e.preventDefault();
			if (!chatbotInput) return;
			var text = chatbotInput.value.trim();
			if (!text) return;
			appendMessage(text, true);
			chatbotInput.value = '';
			setTimeout(function () {
				appendBot('You said: ' + text);
			}, 250);
		});
	}
});


