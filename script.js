// Функция для создания окошка с таблицей в формате CSV
function createCSVTableWindow() {
    // Создаем iframe для таблицы
    const iframe = document.createElement('iframe');
    iframe.classList.add('table-window');
    iframe.src = 'https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/export?format=csv';
    iframe.frameBorder = 0;
    
    // Добавляем стили через JavaScript
    const styles = `
    body {
        margin: 0;
        padding: 0;
        position: relative;
        background-color: #f5f5f5;
    }

    .table-window {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 400px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        overflow: auto;
        border: 1px solid #ddd;
    }

    .csv-content {
        padding: 15px;
        font-family: monospace;
        white-space: pre-wrap;
        word-break: break-all;
        line-height: 1.5;
        color: #333;
    }
    `;
    
    // Создаем элемент style и добавляем стили
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles;
    document.head.appendChild(style);
    
    // Создаем контейнер для CSV содержимого
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('csv-content');
    
    // Получаем CSV данные
    fetch('https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/export?format=csv')
        .then(response => response.text())
        .then(data => {
            contentContainer.innerText = data;
        })
        .catch(error => {
            contentContainer.innerText = 'Ошибка при загрузке данных';
        });
    
    // Добавляем контейнер в body
    document.body.appendChild(contentContainer);
}

// Функция для инициализации
function init() {
    try {
        createCSVTableWindow();
    } catch (error) {
        console.error('Ошибка при создании таблицы:', error);
        alert('Не удалось отобразить таблицу');
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', init);
