// Функция для создания фоновой таблицы
function createBackgroundSheet() {
    // Создаем iframe для таблицы
    const iframe = document.createElement('iframe');
    iframe.classList.add('background-sheet');
    iframe.src = 'https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/edit?usp=sharing=csv';
    iframe.frameBorder = 0;
    
    // Добавляем стили через JavaScript
    const styles = `
    body {
        margin: 0;
        padding: 0;
        position: relative;
    }

    .background-sheet {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.8; /* Прозрачность фона */
        transform: scale(1.1); /* Легкий эффект увеличения */
    }

    .content-wrapper {
        position: relative;
        z-index: 1;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.9); /* Полупрозрачный белый фон */
    }
    `;
    
    // Создаем элемент style и добавляем стили
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles;
    document.head.appendChild(style);
    
    // Добавляем iframe в body
    document.body.appendChild(iframe);
    
    // Создаем контейнер для контента
    const content = document.createElement('div');
    content.classList.add('content-wrapper');
    document.body.appendChild(content);
}

// Функция для инициализации
function init() {
    try {
        createBackgroundSheet();
    } catch (error) {
        console.error('Ошибка при создании таблицы:', error);
        alert('Не удалось отобразить таблицу');
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Функция для обновления размера iframe
function resizeIframe() {
    const iframe = document.querySelector('.background-sheet');
    if (iframe) {
        iframe.style.width = window.innerWidth + 'px';
        iframe.style.height = window.innerHeight + 'px';
    }
}

// Добавляем обработчик изменения размера окна
window.addEventListener('resize', resizeIframe);

// Вызываем первый раз при инициализации
resizeIframe();

