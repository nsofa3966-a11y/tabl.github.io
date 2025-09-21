const sheetUrls = [
  'https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/export?format=csv',
  'https://docs.google.com/spreadsheets/d/1K_NeJM0b0Qk9SwMR-0-a27Xk2HXBo7yzuythjQH4LMY/export?format=csv'
];

let currentIndex = 0;
let slides = [];

async function loadAllSheets() {
  const container = document.createElement('div');
  container.classList.add('slides-container');
  
  const styles = `
  .slides-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    overflow: auto;
  }
  
  .slide {
    position: relative;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    display: none;
    background-color: #fff;
    overflow: auto;
  }
  
  .slide.active {
    display: block;
  }
  
  .csv-content {
    font-family: monospace;
    white-space: pre;
    word-break: break-all;
    line-height: 1.5;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
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
  
  for (let url of sheetUrls) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    
    const content = document.createElement('pre');
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
  
  document.body.appendChild(container);
  
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

document.querySelector('.next').addEventListener('click', () => {
  if (slides.length > 0) {
