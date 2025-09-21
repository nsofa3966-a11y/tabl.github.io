// Функция для скачивания CSV файла
function downloadGoogleSheetAsCSV(sheetId, fileName = 'data.csv') {
    // Формируем URL для экспорта
    const exportUrl = `https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/edit?usp=sharing${sheetId}/export?format=csv`;
    
    // Создаем элемент ссылки
    const link = document.createElement('a');
    link.href = exportUrl;
    link.download = fileName;
    link.style.display = 'none'; // Скрываем ссылку
    
    // Добавляем ссылку в документ
    document.body.appendChild(link);
    
    try {
        // Имитируем клик по ссылке
        link.click();
        
        // Удаляем ссылку после скачивания
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
    } catch (error) {
        console.error('Ошибка при скачивании файла:', error);
        alert('Не удалось скачать файл. Попробуйте позже.');
    }
}

// Пример использования
function init() {
    // Ваш ID таблицы Google Sheets
    const sheetId = 'ВАШ_ID_ТАБЛИЦЫ';
    
    // Добавляем обработчик события к кнопке
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            downloadGoogleSheetAsCSV(sheetId, 'данные_таблицы.csv');
        });
    } else {
        console.warn('Кнопка скачивания не найдена');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Если нужно использовать без HTML кнопки
function downloadOnPageLoad() {
    const sheetId = 'ВАШ_ID_ТАБЛИЦЫ';
    downloadGoogleSheetAsCSV(sheetId, 'автоматический_экспорт.csv');
}

// Раскомментируйте строку ниже, если хотите автоматическое скачивание при загрузке
// downloadOnPageLoad();



