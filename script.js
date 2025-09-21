const sheetUrls = [
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBc6F7PeogNf_R0i_CvNAuKsDAugTAej-etqTmKqg9CU2u16f7DIDYhSvf4hRTmAHqXttKvP9C_7Re/pub?output=tsv'
  // 2-й слайд: лидер дня
];

let currentIndex = 0;
let slides = [];

async function loadAllSheets() {
  const container = document.getElementById('slider-content');
  container.innerHTML = '';
  slides = [];

  for (let i = 0; i < sheetUrls.length; i++) {
    const data = await loadCSV(sheetUrls[i]);
    let content;

    if (i === 0) {
      // первый слайд = таблица
      content = renderTable(data);
    } else {
      // второй слайд = карточка лидера дня
      content = renderLeaderCard(data);
    }

    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.appendChild(content);

    container.appendChild(slide);
    slides.push(slide);
  }

  // Добавляем новый слайд с iframe
  const iframeSlide = document.createElement('div');
  iframeSlide.classList.add('slide');
  
  const iframe = document.createElement('iframe');
  iframe.src = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTC1dGgA54hZEK2GKMnBdKLLy6IClu2kZohTAlxeQq6WR0lvAMTd0XOmOwDi4OQCFgh9GvEi2A-mzXN/pubhtml?gid=0&single=true&widget=true&headers=false";
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  
  iframeSlide.appendChild(iframe);
  container.appendChild(iframeSlide);
  slides.push(iframeSlide);

  if (slides.length > 0) {
    showSlide(0);
  }
}

async function loadCSV(url) {
  try {
    const res = await fetch(url + '&t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    const rows = text.trim().split(/\r?\n/);
    return rows.map(r => r.split(/,|;|\t/));
  } catch (e) {
    console.error(e);
    return [['Ошибка загрузки']];
  }
}

function renderTable(data) {
  const tbl = document.createElement('table');
  data.forEach((row, i) => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const el = document.createElement(i === 0 ? 'th' : 'td');
      el.textContent = cell;
      tr.appendChild(el);
    });
    tbl.appendChild(tr);
  });
  return tbl;
}

function renderLeaderCard(data) {
  // предполагаем, что заголовки в первой строке
  const headers = data[0];
  const rows = data.slice(1);

  // ищем колонку "Очки" (или "Score")
  const scoreIndex = headers.findIndex(h => /очк|score/i.test(h));
  if (scoreIndex === -1) {
    return document.createTextNode("Не найдена колонка 'Очки'");
  }

  // находим лидера
  let leader = rows[0];
  let maxScore = parseFloat(rows[0][scoreIndex]) || 0;

  for (let r of rows) {
    const score = parseFloat(r[scoreIndex]) || 0;
    if (score > maxScore) {
      maxScore = score;
      leader = r;
    }
  }

  // создаём карточку
  const card = document.createElement('div');
  card.classList.add('leader-card');

  const nameIndex = headers.findIndex(h


