// Функция для скачивания CSV файла
function downloadGoogleSheetAsCSV() {
    // Ваш URL таблицы Google Sheets
    const sheetId = '1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY';
    const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    // Создаем элемент ссылки
    const link = document.createElement('a');
    link.href = exportUrl;
    link.download = 'данные_таблицы.csv';
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

// Пример использования с HTML кнопкой
function init() {
    // Добавляем обработчик события к кнопке
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadGoogleSheetAsCSV);
    } else {
        console.warn('Кнопка скачивания не найдена');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Если нужно автоматическое скачивание при загрузке страницы
function autoDownload() {
    downloadGoogleSheetAsCSV();
}

// Раскомментируйте строку ниже для автоматического скачивания
// autoDownload();




