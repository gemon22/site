// Основные функции для работы сайта

// Функция открытия модального окна заказа звонка
function openCallbackForm() {
    document.getElementById('callbackModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Функция открытия калькулятора
function openCalculator() {
    document.getElementById('calculatorModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    calculatePrice(); // Рассчитываем начальную цену
}

// Функция закрытия модальных окон
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Функция расчета стоимости
function calculatePrice() {
    const area = document.getElementById('area').value;
    const ceilingType = document.getElementById('ceilingType').value;
    const totalPrice = area * ceilingType;
    
    document.getElementById('totalPrice').textContent = formatPrice(totalPrice);
}

// Функция форматирования цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

// Функция переключения чата
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const isVisible = chatWindow.style.display === 'flex';
    
    if (isVisible) {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        document.getElementById('chatInput').focus();
    }
}

// Функция отправки сообщения в чате
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Имитация ответа бота
        setTimeout(() => {
            const botResponses = [
                'Спасибо за ваш вопрос! Наш специалист свяжется с вами в ближайшее время.',
                'Отличный вопрос! Давайте обсудим детали. Можете оставить свой номер телефона?',
                'Для точного расчета стоимости нужен замер. Хотите заказать бесплатный замер?',
                'У нас есть несколько вариантов потолков. Какой тип вас интересует?',
                'Спасибо! Мы перезвоним вам в течение 15 минут.'
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    }
}

// Функция добавления сообщения в чат
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Функция валидации формы
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#FF6B6B';
            isValid = false;
        } else {
            input.style.borderColor = '#E0E0E0';
        }
    });
    
    return isValid;
}

// Функция отправки формы
function submitForm(formId, successMessage) {
    const form = document.getElementById(formId);
    
    if (validateForm(form)) {
        // Здесь должна быть логика отправки данных на сервер
        alert(successMessage);
        form.reset();
        closeModal(formId === 'contactForm' ? 'callbackModal' : 'calculatorModal');
    } else {
        alert('Пожалуйста, заполните все обязательные поля');
    }
}

// Функция плавной прокрутки к секциям
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Функция анимации появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.portfolio-item, .team-member, .step, .price-card, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Функция обработки нажатия Enter в чате
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Функция инициализации сайта
function initSite() {
    // Добавляем обработчики событий
    document.addEventListener('DOMContentLoaded', function() {
        // Обработчик для калькулятора
        const areaInput = document.getElementById('area');
        const ceilingTypeSelect = document.getElementById('ceilingType');
        
        if (areaInput) {
            areaInput.addEventListener('input', calculatePrice);
        }
        
        if (ceilingTypeSelect) {
            ceilingTypeSelect.addEventListener('change', calculatePrice);
        }
        
        // Обработчик для чата
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', handleChatKeyPress);
        }
        
        // Обработчики для форм
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitForm('contactForm', 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            });
        }
        
        const callbackForm = document.getElementById('callbackForm');
        if (callbackForm) {
            callbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitForm('callbackForm', 'Спасибо! Мы перезвоним вам в течение 15 минут.');
            });
        }
        
        // Закрытие модальных окон при клике вне их
        window.addEventListener('click', function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    closeModal(modal.id);
                }
            });
        });
        
        // Анимация при скролле
        window.addEventListener('scroll', animateOnScroll);
        
        // Инициализация анимации
        animateOnScroll();
        
        // Добавляем стили для анимации
        const style = document.createElement('style');
        style.textContent = `
            .portfolio-item, .team-member, .step, .price-card, .contact-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
        `;
        document.head.appendChild(style);
    });
}

// Функция для защиты от спама (простая реализация)
function preventSpam(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправляется...';
        
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.getAttribute('data-original-text') || 'Отправить';
        }, 3000);
    }
}

// Функция для валидации телефона
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Функция для валидации email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        background-color: ${type === 'success' ? '#4CAF50' : '#FF6B6B'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем CSS анимации для уведомлений
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Функция для отслеживания событий (аналитика)
function trackEvent(eventName, eventData = {}) {
    // Здесь можно добавить интеграцию с Google Analytics или другими сервисами
    console.log('Event tracked:', eventName, eventData);
}

// Функция для оптимизации производительности
function optimizePerformance() {
    // Ленивая загрузка изображений
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Функция для проверки поддержки браузером
function checkBrowserSupport() {
    const features = {
        flexbox: typeof document.createElement('div').style.flex !== 'undefined',
        grid: typeof document.createElement('div').style.grid !== 'undefined',
        webp: false
    };
    
    // Проверка поддержки WebP
    const webpTest = new Image();
    webpTest.onload = function() {
        features.webp = (webpTest.width > 0) && (webpTest.height > 0);
    };
    webpTest.onerror = function() {
        features.webp = false;
    };
    webpTest.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAADsAD+JaQAA3AAAAAA';
    
    return features;
}

// Инициализация сайта
initSite();

// Экспорт функций для использования в HTML
window.openCallbackForm = openCallbackForm;
window.openCalculator = openCalculator;
window.closeModal = closeModal;
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.calculatePrice = calculatePrice; 