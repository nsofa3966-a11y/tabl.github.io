<div id="slider-content"></div>
<button class="prev">Prev</button>
<button class="next">Next</button>

<script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.2/papaparse.min.js"></script>
<script>
const csvUrls = [
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTC1dGgA54hZEK2GKMnBdKLLy6IClu2kZohTAlxeQq6WR0lvAMTd0XOmOwDi4OQCFgh9GvEi2A-mzXN/export?format=csv'
];

let currentIndex = 0;
let slides = [];

function createTableFromCsv(csvText) {
  const parsed = Papa.parse(csvText);
  const data = parsed.data;

  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';

  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const cellElement = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
      cellElement.textContent = cell;
      cellElement.style.border = '1px solid #ccc';
      cellElement.style.padding = '4px';
      tr.appendChild(cellElement);
    });
    table.appendChild(tr);
  });
  return table;
}

async function loadAllSheets() {
  const container = document.getElementById('slider-content');
  container.innerHTML = '';
  slides = [];

  for (let i = 0; i < csvUrls.length; i++) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.style.display = 'none';

    try {
      const response = await fetch(csvUrls[i] + '&t=' + Date.now());
      if (!response.ok) throw new Error('Network response was not ok');

      const csvText = await response.text();
      const table = createTableFromCsv(csvText);
      slide.appendChild(table);
    } catch (error) {
      slide.innerHTML = `<p>Не удалось загрузить CSV файл. <a href="${csvUrls[i]}" target="_blank">Открыть в новой вкладке</a></p>`;
      console.error('Ошибка загрузки CSV:', error);
    }

    container.appendChild(slide);
    slides.push(slide);
  }

  if (slides.length > 0) {
    showSlide(0);
  }
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
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
    showSlide((currentIndex + 1) % slides.length);
  }
});

loadAllSheets();
</script>
