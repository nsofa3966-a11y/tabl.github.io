<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Скуби-Ду</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #30D5C8;
        }
        .section-title {
            background-color: #30D5C8;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>СКУБИ-ДУ</h1>
    <div id="content"></div>

    <script>
        // Данные о мультсериалах
        const seriesData = [
            { name: 'Скуби-Ду, где ты!', seasons: '2(25)', year: '1969—1970' },
            { name: 'Новые дела Скуби-Ду', seasons: '2(24)', year: '1972—1973' },
            { name: 'Скуби-Ду Шоу', seasons: '3(40)', year: '1976—1978' },
            { name: 'Весёлая Олимпиада Скуби', seasons: '2(24)', year: '1977—1978' },
            { name: 'Скуби и Скрэппи-Ду', seasons: '5(62)', year: '1979—1980' },
            { name: 'Скуби и Скрэппи-Ду (короткометражные)', seasons: '3(99)', year: '1980—1982' },
            { name: 'Новые приключения Скуби и Скрэппи', seasons: '2(52)', year: '1983—1984' },
            { name: '12 призраков Скуби-Ду', seasons: '1(13)', year: '1985' },
            { name: 'Щенок по кличке Скуби-Ду', seasons: '4(30)', year: '1988—1991' },
            { name: 'Что новенького, Скуби-Ду?', seasons: '3(42)', year: '2002—2005' },
            { name: 'Шэгги и Скуби-Ду ключ найдут!', seasons: '2(26)', year: '2006—2008' },
            { name: 'Скуби-Ду: Мистическая корпорация', seasons: '2(52)', year: '2010—2013' },
            { name: 'Будь классным, Скуби-Ду!', seasons: '2(52)', year: '2015 — 2018' },
            { name: 'Скуби-Ду и угадай кто?', seasons: '2(52)', year: '2019—2021' },
            { name: 'Велма', seasons: '2(20)', year: '2023' }
        ];

        // Данные о специальных эпизодах
        const specialEpisodesData = [
            { name: 'Скуби-Ду! Жуткие игры', year: '2012' },
            { name: 'Скуби-Ду! Отдых с привидениями', year: '2012' },
            { name: 'Скуби-Ду и Пугало', year: '2013' },
            { name: 'Скуби-Ду и Маниакальный Меха Болван', year: '2013' },
            { name: 'Скуби-Ду! Призрачные голы', year: '2014' },
            { name: 'Скуби-Ду! и Пляжное Чудище', year: '2015' }
        ];

        // Данные о полнометражных фильмах
        const featureFilmsData = [
            { name: 'Скуби-Ду', year: '2002' },
            { name: 'Скуби-Ду 2: Монстры на свободе', year: '2004' },
            { name: 'Скуби-Ду 3: Тайна начинается', year: '2009' },
            { name: 'Скуби-Ду 4: Проклятье озёрного монстра', year: '2010' },
            { name: 'Дафна и Велма', year: '2018' }
        ];

        // Данные о полнометражных мультфильмах
        const animatedFilmsData = [
            { name: 'Скуби-Ду на Острове мертвецов', year: '1998' },
            { name: 'Скуби-Ду и призрак ведьмы', year: '1999' },
            { name: 'Скуби-Ду и нашествие инопланетян', year: '2000' },
            { name: 'Скуби-Ду и кибер-погоня', year: '2001' },
            { name: 'Скуби-Ду и легенда о вампире', year: '2003' },
            { name: 'Скуби-Ду и монстр из Мексики', year: '2003' },
            { name: 'Скуби-Ду и тайна лох-несского чудовища', year: '2004' },
            { name: 'Алоха, Скуби-Ду!', year: '2005' },
            { name: 'Скуби-Ду, где моя мумия?', year: '2005' },
            { name: 'Скуби-Ду. Пираты на борту!', year: '2006' },
            { name: 'Отдыхай, Скуби-Ду!', year: '2007' },
            { name: 'Скуби-Ду и король гоблинов', year: '2008' },
            { name: 'Скуби-Ду и меч самурая', year: '2009' },
            { name: 'Скуби-Ду! Абракадабра-Ду', year: '2010' },
            { name: 'Скуби-Ду! Истории летнего лагеря', year: '2010' },
            { name: 'Скуби-Ду! Легенда о Фантозавре', year: '2011' },
            { name: 'Скуби-Ду! Музыка вампира', year: '2012' },
            { name: 'Скуби-Ду! Под куполом цирка', year: '2012' },
            { name: 'Скуби-Ду! Маска Голубого сокола', year: '2013' },
            { name: 'Скуби-Ду! Боязнь сцены', year: '2013' },
            { name: 'Скуби-Ду! Искусство борьбы', year: '2014' },
            { name: 'Скуби-Ду: Франкен-монстр', year: '2014' },
            { name: 'Скуби-Ду! Безумие лунного монстра', year: '2015' },
            { name: 'Скуби-Ду и KISS: Тайна рок-н-ролла', year: '2015' },
            { name: 'LEGO Скуби-Ду!: Призрачный Голливуд', year: '2016' },
            { name: 'Скуби-Ду! и проклятье демона скорости', year: '2016' },
            { name: 'Скуби-Ду! На Диком Западе', year: '2017' },
            { name: 'LEGO Скуби-Ду!: Улётный пляж', year: '2017' },
            { name: 'Скуби-Ду и Бэтмен: Отважный и смелый', year: '2018' },
            { name: 'Скуби-Ду и Призрак-гурман', year: '2018' },
            { name: 'Скуби-Ду и проклятье тринадцатого призрака', year: '2019' },
            { name: 'Скуби-Ду! Возвращение на остров зомби', year: '2019' },
            { name: 'Скуби-Ду', year: '2020' },
            { name: 'Счастливого Хэллоуина, Скуби-Ду!', year: '2020' },
            { name: 'Скуби-Ду! Меч и Скуб', year: '2021' },
            { name: 'Прямиком из Нигде: Скуби-Ду! Встречает Куража, трусливого пса', year: '2021' },
            { name: 'Скуби-Ду! Шалость или сладость', year: '2022' },
            { name: 'Скуби-Ду! И Крипто тоже!', year: '2023' }
        ];

        // Функция для создания таблицы
        function createTable(data, title, hasSeasons = true) {
            const content = document.getElementById('content');
            
            // Создаем заголовок раздела
            const sectionTitle = document.createElement('div');
            sectionTitle.classList.add('section-title');
            sectionTitle.textContent = title;
            content.appendChild(sectionTitle);

            // Создаем таблицу
            const table = document.createElement('table');
            
            // Создаем заголовок таблицы
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const nameHeader = document.createElement('th');
            nameHeader.textContent = 'Мультсериалы';
            headerRow.appendChild(nameHeader);
            
            if (hasSeasons) {
                const seasonsHeader = document.createElement('th');
                seasonsHeader.textContent = 'Количество сезонов, серий';
                headerRow.appendChild(seasonsHeader);
            }
            
            const yearHeader = document.createElement('th');
            yearHeader.textContent = 'Год';
            headerRow.appendChild(yearHeader);
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Создаем тело таблицы
            const tbody = document.createElement('tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                
                const nameCell = document.createElement('td');
                nameCell.textContent = item.name;
                row.appendChild(nameCell);
                
                if (hasSeasons) {
                    const seasonsCell = document.createElement('td');
                    seasonsCell.textContent = item.seasons || '';
                    row.appendChild(seasonsCell);
                }
                
                const yearCell = document.createElement('td');
                yearCell.textContent = item.year;
                row.appendChild(yearCell);
                
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            content.appendChild(table);
        }

        // Создаем таблицы для всех разделов
        createTable(seriesData, 'Мультсериалы');
        createTable(specialEpisodesData, 'Специальные эпизоды, выпущенные сразу на DVD', false);
        createTable(featureFilmsData, 'Полнометражные фильмы', false);
        createTable(animatedFilmsData, 'Полнометражные мультфильмы', false);
    </script>
</body>
</html>
