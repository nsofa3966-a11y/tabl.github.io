const sheetUrls = [
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBc6F7PeogNf_R0i_CvNAuKsDAugTAej-etqTmKqg9CU2u16f7DIDYhSvf4hRTmAHqXttKvP9C_7Re/pub?output=tsv',
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTC1dGgA54hZEK2GKMnBdKLLy6IClu2kZohTAlxeQq6WR0lvAMTd0XOmOwDi4OQCFgh9GvEi2A-mzXN/pub?output=xlsx'
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

  if (slides.length > 0) {
    showSlide(0);
  }
}

async function loadCSV(url) {
  try {
    const res = await fetch(url + '&t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    
    // Определяем формат данных
    if (url.includes('output=xlsx')) {
      // Для XLSX используем специальный парсер
      const blob = await res.blob();
      const workbook = XLSX.read(blob, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    } else {
      // Для TSV/CSV
      const text = await res.text();
      const rows = text.trim().split(/\r?\n/);
      return rows.map(r => r.split(/,|;|\t/));
    }
  } catch (e) {
    console.error(e);
    return [['Ошибка загрузки']];
  }
}

// Остальные функции остаются без изменений

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
  const headers = data[0];
  const rows = data.slice(1);

  const scoreIndex = headers.findIndex(h => /очк|score/i.test(h));
  if (scoreIndex === -1) {
    return document.createTextNode("Не найдена колонка 'Очки'");
  }

  let leader = rows[0];
  let maxScore = parseFloat(rows[0][scoreIndex]) || 0;

  for (let r of rows) {
    const score = parseFloat(r[scoreIndex]) || 0;
    if (score > maxScore) {
      maxScore = score;
      leader = r;
    }
  }

  const card = document.createElement('div');
  card.classList.add('leader-card');

  const nameIndex = headers.findIndex(h => /имя|name/i.test(h));
  const name = nameIndex !== -1 ? leader[nameIndex]
