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

      const link = document.createElement('a');
      link.href = csvUrls[i].replace('/export?format=csv', '/pubhtml');
      link.target = '_blank';
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';
      link.appendChild(table);

      slide.appendChild(link);
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


