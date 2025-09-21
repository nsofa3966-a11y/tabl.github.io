const sheetUrls = [
  'https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/edit?usp=sharing/export?format=csv',
  'https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/edit?usp=sharing/export?format=csv'
];

let currentIndex = 0;
let slides = [];

// Функция для загрузки всех таблиц
async function loadAllSheets() {
  const container = document.createElement('div');
  container.classList.add('slides-container');
  
  // Создаем стили для слайдера
  const styles = `
  .slides-container {
    position: relative;
    width: 600px;
    height: 400px;
    margin: 50px auto;
  }
  
  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    display: none;
    background-color: #fff;
  }
  
  .slide.active {
    display: block;
  }
  
  .csv-content {
    font-family: monospace;
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.5;
    color: #333;
  }
  
  .controls {
    text-align: center;
    margin-top: 20px;
  }
  
  .prev, .next {
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
  }
  `;
  
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = styles;
  document.head.appendChild(style);
  
  // Загружаем каждую таблицу
  for (let url of sheetUrls) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    
    const content = document.createElement('div');
    content.classList.add('csv-content');
    
    try {
      const response = await fetch(url);
      const data = await response.text();
      content.innerText = data;
    } catch (error) {
      content.innerText = 'Ошибка при загрузке данных';
    }
    
    slide.appendChild(content);
    container.appendChild(slide);
    slides.push(slide);
  }
  
  // Добавляем контейнер в body
  document.body.appendChild(container);
  
  // Создаем кнопки управления
  const controls = document.createElement('div');
  controls.classList.add('controls');
  
  const prevButton = document.createElement('button');
  prevButton.classList.add('prev');
  prevButton.textContent = 'Назад';
  
  const nextButton = document.createElement('button');
  nextButton.classList.add('next');
  nextButton.textContent = 'Вперед';
  
  controls.appendChild(prevButton);
  controls.appendChild(nextButton);
  document.body.appendChild(controls);
  
  // Показываем первый слайд
  showSlide(0);
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  currentIndex = index;
}

document.querySelector('.prev').addEventListener('click', () => {
  if (slides.length > 0) {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  }
});

document.querySelector('.next').addEventListener('click',
// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

