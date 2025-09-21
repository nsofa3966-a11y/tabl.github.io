// Функция для создания и вставки таблицы
function createGoogleSheet() {
    // Создаем основные элементы
    const container = document.createElement('div');
    container.classList.add('table-container');
    
    const header = document.createElement('div');
    header.classList.add('table-header');
    
    const h2 = document.createElement('h2');
    h2.textContent = 'Наша таблица данных';
    
    const sheetWrapper = document.createElement('div');
    sheetWrapper.classList.add('sheet-wrapper');
    
    const iframe = document.createElement('iframe');
    iframe.classList.add('google-sheet');
    iframe.src = 'https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/edit?usp=sharing';
    iframe.frameBorder = 0;
    iframe.allowFullscreen = true;
    
    // Добавляем стили через JavaScript
    const styles = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .table-container {
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
            overflow: auto;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            border-radius: 8px;
            background-color: #fff;
        }
        
        .table-header {
            padding: 15px;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        
        .google-sheet {
            width: 100%;
            height: 600px;
            border: none;
            box-sizing: border-box;
        }
    `;
    
    // Создаем элемент style и добавляем стили
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles;
    document.head.appendChild(style);
    
    // Собираем структуру
    header.appendChild(h2);
    sheetWrapper.appendChild(iframe);
    container.appendChild(header);
    container.appendChild(sheetWrapper);
    
    // Добавляем контейнер в body
    document.body.appendChild(container);
}

// Функция для инициализации
function init() {
    try {
        createGoogleSheet();
    } catch (error) {
        console.error('Ошибка при создании таблицы:', error);
        alert('Не удалось отобразить таблицу');
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Дополнительно: функция для обновления высоты iframe
function resizeIframe() {
    const iframe = document.querySelector('.google-sheet');
    if (iframe) {
        iframe.style.height = window.innerHeight * 0.7 + 'px';
    }
}

// Добавляем обработчик изменения размера окна
window.addEventListener('resize', resizeIframe);

// Вызываем первый раз при инициализации
resizeIframe();


