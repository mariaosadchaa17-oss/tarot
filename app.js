const App = {
    state: {
        lang: 'ua', aiMode: 'mystical', sphere: 'love', target: 'self', theme: 'neon',
        spreadKey: 'cross', activeSuit: null, selectedCards: {}, activePositionIndex: 0,
        cardBackStyle: 'cosmic', previewReversed: false, apiKey: ''
    },
    translations: {
        ua: {
            page_title: "Таро AI Компаньйон", main_title: "🔮 Таро AI Компаньйон",
            rules_toggle: "📜 Свод правил таролога",
            journal_toggle: "📖 Журнал розкладів",
            rules_list: ["Формулюйте запит чітко та екологічно (без злого умислу).", "Не дублюйте один і той же запит картам декілька разів на день.", "Підходьте до розкладу у спокійному, медитативному стані.", "Пам'ятайте: карти показують найбільш вірогідний вектор, але фінальний вибір завжди за вами."],
            section_title_mode_sphere: "✨ 1. Режим та Сфера", label_ai_mode: "Режим ШІ",
            mode_mystical: "Містичний", mode_psychologist: "Психологічний",
            label_sphere: "Сфера життя",
            section_title_context_spread: "🃏 2. Контекст та Розклад", label_target: "На кого ворожимо?",
            target_self: "На себе", target_other: "На партнера", target_friend: "На друга", target_rival: "На ворога",
            label_other_person: "Ім'я / опис іншої людини",
            label_question: "Ваше питання", label_card_back: "Вибір сорочки карт",
            card_back_cosmic: "Космічна", card_back_witchy: "Відьминська", card_back_gold: "Золото",
            label_spread_type: "Тип розкладу",
            spread_category_basic: "⚡ БАЗОВІ ТА ШВИДКІ РОЗКЛАДИ",
            spread_category_love: "💖 РОЗКЛАДИ ДЛЯ СТОСУНКІВ ТА КОХАННЯ",
            spread_category_deep: "🌟 СКЛАДНІ ТА КЛАСИЧНІ СХЕМИ",
            section_title_constructor: "🛠️ 3. Конструктор карт",
            constructor_step1: "Крок 1: Оберіть групу/масть",
            constructor_step2: "Крок 2: Оберіть карту",
            constructor_reversed: "🔄 Зробити перевернутою",
            btn_random_draw: "🎲 Витягнути випадкову карту",
            section_title_schema: "🌙 4. Схема розкладу", btn_reset: "Скинути",
            section_title_interpretation: "✨ 5. Тлумачення від ШІ", btn_get_interpretation: "Отримати тлумачення",
            btn_save_reading: "💾 Зберегти в журнал", btn_copy_reading: "📋 Копіювати",
            placeholder_ai_response: "Оберіть дію...",
            hint_select_card_for: "👉 Оберіть карту для позиції:", hint_spread_filled: "✅ Розклад повністю заповнено!",
            alert_spread_not_filled: "Будь ласка, заповніть усі позиції в розкладі.",
            alert_card_already_in: (card) => `Карта "${card}" вже є в розкладі.`,
            alert_no_card_selected: "Будь ласка, оберіть карту зі списку.",
            recommendation_love: "💡 Для стосунків найкраще підходить розклад 'Хрест'.",
            recommendation_work: "💡 Аналізуємо перспективи та варіанти розвитку.",
            recommendation_health: "💡 Для швидкої оцінки стану достатньо однієї карти.",
            recommendation_destiny: "💡 Глибокий розклад 'Шлях' покаже ваш вектор.",
            suit_major: "✨ Старші Аркани", suit_wands: "🔥 Жезли", suit_cups: "💧 Кубки", suit_swords: "🌪 Мечі", suit_pentacles: "⛰ Пентаклі",
            moon_phases: ['Молодик', 'Молодий місяць', 'Перша чверть', 'Прибуваючий місяць', 'Повня', 'Спадаючий місяць', 'Остання чверть', 'Старий місяць'],
            loading_text: "Зчитуємо інформацію з простору...",
            btn_reverse: "⤾ Перевернути",
            api_key_hint: "🔑 Введіть свій Anthropic API ключ для отримання тлумачень (зберігається лише у вашому браузері):",
            daily_card_title: "Карта дня",
            daily_card_cta: "Натисніть, щоб дізнатись карту дня",
            journal_empty: "Поки що немає збережених розкладів. Зробіть розклад і натисніть «Зберегти в журнал».",
            saved_to_journal: "✅ Розклад збережено в журнал!",
            copied_to_clipboard: "✅ Скопійовано!",
            position_names: { cross: ["Суть", "Перешкода", "Порада", "Результат"] }
        },
        ru: {
            page_title: "Таро AI Компаньон", main_title: "🔮 Таро AI Компаньон",
            rules_toggle: "📜 Свод правил таролога",
            journal_toggle: "📖 Журнал раскладов",
            rules_list: ["Формулируйте запрос четко и экологично (без злого умысла).", "Не дублируйте один и тот же запрос картам несколько раз в день.", "Подходите к раскладу в спокойном, медитативном состоянии.", "Помните: карты показывают наиболее вероятный вектор, но финальный выбор всегда за вами."],
            section_title_mode_sphere: "✨ 1. Режим и Сфера", label_ai_mode: "Режим ИИ",
            mode_mystical: "Мистический", mode_psychologist: "Психологический",
            label_sphere: "Сфера жизни",
            section_title_context_spread: "🃏 2. Контекст и Расклад", label_target: "На кого гадаем?",
            target_self: "На себя", target_other: "На партнера", target_friend: "На друга", target_rival: "На врага",
            label_other_person: "Имя / описание другого человека",
            label_question: "Ваш вопрос", label_card_back: "Выбор рубашки карт",
            card_back_cosmic: "Космическая", card_back_witchy: "Ведьминская", card_back_gold: "Золото",
            label_spread_type: "Тип расклада",
            spread_category_basic: "⚡ БАЗОВЫЕ И БЫСТРЫЕ РАСКЛАДЫ",
            spread_category_love: "💖 РАСКЛАДЫ ДЛЯ ОТНОШЕНИЙ И ЛЮБВИ",
            spread_category_deep: "🌟 СЛОЖНЫЕ И КЛАССИЧЕСКИЕ СХЕМЫ",
            section_title_constructor: "🛠️ 3. Конструктор карт",
            constructor_step1: "Шаг 1: Выберите группу/масть",
            constructor_step2: "Шаг 2: Выберите карту",
            constructor_reversed: "🔄 Сделать перевернутой",
            btn_random_draw: "🎲 Вытянуть случайную карту",
            section_title_schema: "🌙 4. Схема расклада", btn_reset: "Сбросить",
            section_title_interpretation: "✨ 5. Толкование от ИИ", btn_get_interpretation: "Получить толкование",
            btn_save_reading: "💾 Сохранить в журнал", btn_copy_reading: "📋 Копировать",
            placeholder_ai_response: "Выберите действие...",
            hint_select_card_for: "👉 Выберите карту для позиции:", hint_spread_filled: "✅ Расклад полностью заполнен!",
            alert_spread_not_filled: "Пожалуйста, заполните все позиции в раскладе.",
            alert_card_already_in: (card) => `Карта "${card}" уже есть в раскладе.`,
            alert_no_card_selected: "Пожалуйста, выберите карту из списка.",
            recommendation_love: "💡 Для отношений лучше всего подходит расклад 'Крест'.",
            recommendation_work: "💡 Анализируем перспективы и варианты развития.",
            recommendation_health: "💡 Для быстрой оценки состояния достаточно одной карты.",
            recommendation_destiny: "💡 Глубокий расклад 'Путь' покажет ваш вектор.",
            suit_major: "✨ Старшие Арканы", suit_wands: "🔥 Жезлы", suit_cups: "💧 Кубки", suit_swords: "🌪 Мечи", suit_pentacles: "⛰ Пентакли",
            moon_phases: ['Новолуние', 'Молодая луна', 'Первая четверть', 'Прибывающая луна', 'Полнолуние', 'Убывающая луна', 'Последняя четверть', 'Старая луна'],
            loading_text: "Считываем информацию из пространства...",
            btn_reverse: "⤾ Перевернуть",
            api_key_hint: "🔑 Введите свой Anthropic API ключ для получения толкований (хранится только в вашем браузере):",
            daily_card_title: "Карта дня",
            daily_card_cta: "Нажмите, чтобы узнать карту дня",
            journal_empty: "Пока нет сохранённых раскладов. Сделайте расклад и нажмите «Сохранить в журнал».",
            saved_to_journal: "✅ Расклад сохранён в журнал!",
            copied_to_clipboard: "✅ Скопировано!",
            position_names: { cross: ["Суть", "Препятствие", "Совет", "Результат"] }
        }
    },
    data: {
        spheres: [
            { key: 'love', icon: '❤️', ua: 'Кохання', ru: 'Любовь', rec: 'cross', rec_key: 'recommendation_love' },
            { key: 'career', icon: '💼', ua: 'Кар\'єра', ru: 'Карьера', rec: 'three-cards', rec_key: 'recommendation_work' },
            { key: 'finance', icon: '💰', ua: 'Фінанси', ru: 'Финансы', rec: 'three-cards', rec_key: 'recommendation_work' },
            { key: 'health', icon: '🌿', ua: 'Здоров\'я', ru: 'Здоровье', rec: 'yes-no', rec_key: 'recommendation_health' },
            { key: 'destiny', icon: '🌌', ua: 'Призначення', ru: 'Предназначение', rec: 'path', rec_key: 'recommendation_destiny' },
            { key: 'general', icon: '🪐', ua: 'Загальний аналіз', ru: 'Общий анализ', rec: 'three-cards', rec_key: null },
        ],
        targets: [
            { key: 'self', ua: 'На себе', ru: 'На себя' }, { key: 'partner', ua: 'На партнера', ru: 'На партнера' },
            { key: 'friend', ua: 'На друга', ru: 'На друга' }, { key: 'rival', ua: 'На ворога', ru: 'На врага' }
        ],
        spreadCategories: {
            basic: { spreads: ['yes-no', 'card-of-day', 'three-cards'], ua: '⚡ БАЗОВІ ТА ШВИДКІ РОЗКЛАДИ', ru: '⚡ БАЗОВЫЕ И БЫСТРЫЕ РАСКЛАДЫ' },
            love: { spreads: ['cross', 'venus-circle', 'choice'], ua: '💖 РОЗКЛАДИ ДЛЯ СТОСУНКІВ ТА КОХАННЯ', ru: '💖 РАСКЛАДЫ ДЛЯ ОТНОШЕНИЙ И ЛЮБВИ' },
            deep: { spreads: ['celtic-cross', 'chakras', 'astro-circle'], ua: '🌟 СКЛАДНІ ТА КЛАСИЧНІ СХЕМИ', ru: '🌟 СЛОЖНЫЕ И КЛАССИЧЕСКИЕ СХЕМЫ' }
        },
        spreads: {
            "card-of-day": { cards: 1, ua: "Карта дня (1)", ru: "Карта дня (1)", hint_ua: "Задає головну тему або настрій доби", hint_ru: "Задает главную тему или настроение дня", positions: { ua: ["Енергія дня"], ru: ["Энергия дня"] }, grid: `"pos1"` },
            "yes-no": { cards: 3, ua: "Так/Ні (3)", ru: "Да/Нет (3)", hint_ua: "Баланс позитивних та негативних відповідей", hint_ru: "Баланс положительных и отрицательных ответов", positions: { ua: ["Відповідь 1", "Відповідь 2", "Відповідь 3"], ru: ["Ответ 1", "Ответ 2", "Ответ 3"] }, grid: `"pos1 pos2 pos3"` },
            "three-cards": { cards: 3, ua: "Три Карти (3)", ru: "Три Карты (3)", hint_ua: "Минуле – Теперішнє – Майбутнє. Оцінка будь-якої ситуації", hint_ru: "Прошлое – Настоящее – Будущее. Оценка любой ситуации", positions: { ua: ["Минуле", "Теперішнє", "Майбутнє"], ru: ["Прошлое", "Настоящее", "Будущее"] }, grid: `"pos1 pos2 pos3"` },
            "cross": { cards: 4, ua: "Хрест (4)", ru: "Крест (4)", hint_ua: "Класична схема для глибокого аналізу ситуації", hint_ru: "Классическая схема для глубокого анализа ситуации", positions: { ua: ["Суть", "Перешкода", "Порада", "Результат"], ru: ["Суть", "Препятствие", "Совет", "Результат"] }, gridClass: 'spread-cross' },
            "venus-circle": { cards: 7, ua: "Венерине коло (7)", ru: "Венерин круг (7)", hint_ua: "Почуття обох партнерів, наміри, приховані мотиви та перспективи", hint_ru: "Чувства обоих партнеров, намерения, скрытые мотивы и перспективы", positions: { ua: ["Ви", "Партнер", "Зв'язок", "Минуле", "Майбутнє", "Совет", "Підсумок"], ru: ["Вы", "Партнер", "Связь", "Прошлое", "Будущее", "Совет", "Итог"] }, grid: `"pos1 pos2 pos3 pos4 pos5 pos6 pos7"` },
            "choice": { cards: 5, ua: "Вибір (5)", ru: "Выбор (5)", hint_ua: "Любовний трикутник або рішення: що буде, якщо залишитися, і якщо піти", hint_ru: "Любовный треугольник или решение: что будет, если остаться, и если уйти", positions: { ua: ["Суть", "Варіант А", "Результат А", "Варіант Б", "Результат Б"], ru: ["Суть", "Вариант А", "Результат А", "Вариант Б", "Результат Б"] }, grid: `". pos1 ." "pos2 . pos4" "pos3 . pos5"` },
            "celtic-cross": { cards: 10, ua: "Кельтський хрест (10)", ru: "Кельтский крест (10)", hint_ua: "Суть проблеми, підсвідомі страхи, минуле, майбутнє та підсумок", hint_ru: "Суть проблемы, подсознательные страхи, прошлое, будущее и итог", positions: { ua: ["Основа", "Перехрестя", "Минуле", "Майбутнє", "Вище", "Нижче", "Позиція", "Оточення", "Надії", "Підсумок"], ru: ["Основа", "Перекрестие", "Прошлое", "Будущее", "Высшее", "Низшее", "Позиция", "Окружение", "Надежды", "Итог"] }, grid: `"pos3 pos5 pos4" "pos1 pos2 pos7" "pos6 pos8 pos9" ". . pos10"` },
            "chakras": { cards: 7, ua: "Сім чакр (7)", ru: "Семь чакр (7)", hint_ua: "Аналіз енергетичних центрів, психологічний та духовний стан", hint_ru: "Анализ энергетических центров, психологическое и духовное состояние", positions: { ua: ["Муладхара", "Свадхістхана", "Маніпура", "Анахата", "Вішудха", "Аджна", "Сахасрара"], ru: ["Муладхара", "Свадхистана", "Манипура", "Анахата", "Вишудха", "Аджна", "Сахасрара"] }, grid: `"pos7" "pos6" "pos5" "pos4" "pos3" "pos2" "pos1"` },
            "astro-circle": { cards: 12, ua: "Астрологічне коло (12)", ru: "Астрологический круг (12)", hint_ua: "12 сфер життя (гроші, кар'єра, дім, кохання) на обраний період", hint_ru: "12 сфер жизни (деньги, карьера, дом, любовь) на выбранный период", positions: { ua: ["1 дім", "2 дім", "3 дім", "4 дім", "5 дім", "6 дім", "7 дім", "8 дім", "9 дім", "10 дім", "11 дім", "12 дім"], ru: ["1 дом", "2 дом", "3 дом", "4 дом", "5 дом", "6 дом", "7 дом", "8 дом", "9 дом", "10 дом", "11 дом", "12 дом"] }, grid: `"pos10 pos11 pos12 pos1" "pos9 . . pos2" "pos8 . . pos3" "pos7 pos6 pos5 pos4"` }
        },
        cards: {
            major: {
                ua: ["Дурень", "Маг", "Верховна Жриця", "Імператриця", "Імператор", "Ієрофант", "Коханці", "Колісниця", "Сила", "Відлюдник", "Колесо Фортуни", "Справедливість", "Вішальник", "Смерть", "Поміркованість", "Диявол", "Вежа", "Зірка", "Місяць", "Сонце", "Суд", "Світ"],
                ru: ["Шут", "Маг", "Верховная Жрица", "Императрица", "Император", "Иерофант", "Влюбленные", "Колесница", "Сила", "Отшельник", "Колесо Фортуны", "Справедливость", "Повешенный", "Смерть", "Умеренность", "Дьявол", "Башня", "Звезда", "Луна", "Солнце", "Суд", "Мир"],
                imageIds: ['ar00', 'ar01', 'ar02', 'ar03', 'ar04', 'ar05', 'ar06', 'ar07', 'ar08', 'ar09', 'ar10', 'ar11', 'ar12', 'ar13', 'ar14', 'ar15', 'ar16', 'ar17', 'ar18', 'ar19', 'ar20', 'ar21']
            },
            minor: {
                ua: ["Туз", "Двійка", "Трійка", "Четвірка", "П'ятірка", "Шістка", "Сімка", "Вісімка", "Дев'ятка", "Десятка", "Паж", "Лицар", "Королева", "Король"],
                ru: ["Туз", "Двойка", "Тройка", "Четвёрка", "Пятёрка", "Шестёрка", "Семёрка", "Восьмёрка", "Девятка", "Десятка", "Паж", "Рыцарь", "Королева", "Король"],
                imageIds: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14']
            },
            suits: {
                ua: { wands: "Жезлів", cups: "Кубків", swords: "Мечів", pentacles: "Пентаклів" },
                ru: { wands: "Жезлов", cups: "Кубков", swords: "Мечей", pentacles: "Пентаклей" }
            },
            suitCodes: { wands: 'wa', cups: 'cu', swords: 'sw', pentacles: 'pe' }
        }
    },

    // ===================== IMAGES =====================
    TAROT_CDN_BASE: 'https://raw.githubusercontent.com/lenmorld/tarot-api/master/static/card-images',
    TAROT_CDN_FALLBACK_BASE: 'https://sacred-texts.com/tarot/pkt/img',

    majorFileNames: [
        'fool','magician','high-priestess','empress','emperor',
        'hierophant','lovers','chariot','strength','hermit',
        'wheel-of-fortune','justice','hanged-man','death','temperance',
        'devil','tower','star','moon','sun','judgement','world'
    ],
    minorRankNames: ['ace','two','three','four','five','six','seven','eight','nine','ten','page','knight','queen','king'],
    suitFolders: { wands: 'wands', cups: 'cups', swords: 'swords', pentacles: 'pentacles' },

    // sacred-texts fallback uses short codes like ar01, cu02, pe10, sw14 etc.
    fallbackSuitCode: { wands: 'wa', cups: 'cu', swords: 'sw', pentacles: 'pe' },

    getCardImageURLById(cardId) {
        const [suit, rankIndexStr] = cardId.split('_');
        const rankIndex = parseInt(rankIndexStr, 10);
        const base = this.TAROT_CDN_BASE;
        if (suit === 'major') {
            const name = this.majorFileNames[rankIndex];
            if (!name) return this.fallbackCardImage(cardId);
            return `${base}/majors/${name}.jpg`;
        } else {
            const folder = this.suitFolders[suit];
            const rank = this.minorRankNames[rankIndex];
            if (!folder || !rank) return this.fallbackCardImage(cardId);
            return `${base}/minors/${folder}/${rank}-of-${folder}.jpg`;
        }
    },

    // Secondary CDN attempt before generic placeholder (sacred-texts numbering: 00-21 majors, 01-14 per suit)
    getFallbackImageURLById(cardId) {
        const [suit, rankIndexStr] = cardId.split('_');
        const rankIndex = parseInt(rankIndexStr, 10);
        if (suit === 'major') {
            const num = String(rankIndex).padStart(2, '0');
            return `${this.TAROT_CDN_FALLBACK_BASE}/ar${num}.jpg`;
        } else {
            const code = this.fallbackSuitCode[suit];
            const num = String(rankIndex + 1).padStart(2, '0');
            return `${this.TAROT_CDN_FALLBACK_BASE}/${code}${num}.jpg`;
        }
    },

    fallbackCardImage(cardId) {
        return this.getFallbackImageURLById(cardId);
    },

    finalPlaceholder() {
        return 'https://via.placeholder.com/200x340/1a0b2e/f3c66f?text=%F0%9F%94%AE';
    },

    getCardImageURL(cardName) { return this.finalPlaceholder(); },

    translateCardName(cardId) {
        const [suit, rankIndex] = cardId.split('_');
        if (suit === 'major') {
            return this.data.cards.major[this.state.lang][rankIndex];
        } else {
            const rank = this.data.cards.minor[this.state.lang][rankIndex];
            const suitName = this.data.cards.suits[this.state.lang][suit];
            return `${rank} ${suitName}`;
        }
    },

    // ===================== INIT =====================
    init() {
        this.loadFromLocalStorage();
        this.addEventListeners();
        this.renderAllDynamicContent();
        this.restoreActiveStates();
        this.applyTheme(this.state.theme);
        this.renderDailyCardWidget();
        this.checkApiKeyBanner();
    },

    loadFromLocalStorage() {
        const savedLang = localStorage.getItem('tarot_lang');
        const savedTheme = localStorage.getItem('tarot_theme');
        const savedKey = localStorage.getItem('tarot_api_key');
        if (savedLang) this.state.lang = savedLang;
        if (savedTheme) this.state.theme = savedTheme;
        if (savedKey) this.state.apiKey = savedKey;
    },

    checkApiKeyBanner() {
        const banner = document.getElementById('api-key-banner');
        const input = document.getElementById('api-key-input');
        if (this.state.apiKey) {
            input.value = this.state.apiKey;
        }
        banner.style.display = 'block';
        input.addEventListener('change', () => {
            this.state.apiKey = input.value.trim();
            localStorage.setItem('tarot_api_key', this.state.apiKey);
        });
    },

    restoreActiveStates() {
        this.handleSelection('mode', this.state.aiMode, false);
        this.handleSelection('target', this.state.target, false);
        this.handleSelection('cardBack', this.state.cardBackStyle, false);
        this.handleSelection('sphere', this.state.sphere, false);
        this.handleSelection('spread', this.state.spreadKey, false);
        this.updateUI();
    },

    renderAllDynamicContent() {
        this.applyLanguage();
        this.renderAllSelectors();
        this.updateUI();
        this.displayMoonPhase();
    },

    renderAllSelectors() {
        const createButtons = (containerId, data, group, nameKey) => {
            const container = document.getElementById(containerId);
            container.innerHTML = data.map(item => `<button class="control-card" data-group="${group}" data-key="${item.key}">${item.icon || ''} <span>${item[nameKey]}</span></button>`).join('');
        };
        createButtons('mode-selector', [{key: 'mystical', icon: '🔮', ua: this.translations.ua.mode_mystical, ru: this.translations.ru.mode_mystical}, {key: 'psychologist', icon: '🧠', ua: this.translations.ua.mode_psychologist, ru: this.translations.ru.mode_psychologist}], 'mode', this.state.lang);
        createButtons('sphere-selector', this.data.spheres, 'sphere', this.state.lang);
        createButtons('target-selector', this.data.targets, 'target', this.state.lang);

        // NEW LOCATION: card-back picker rendered as visual swatches (moved to Schema section)
        this.renderCardBackPicker();

        this.renderSpreadSelector();
        this.renderSuitSelector();
    },

    renderCardBackPicker() {
        const cardBackData = [
            { key: 'cosmic', icon: '🌌', name: this.translations[this.state.lang].card_back_cosmic },
            { key: 'witchy', icon: '🔮', name: this.translations[this.state.lang].card_back_witchy },
            { key: 'gold', icon: '⚜️', name: this.translations[this.state.lang].card_back_gold }
        ];
        const container = document.getElementById('card-back-selector');
        container.innerHTML = cardBackData.map(item => `
            <div class="cardback-swatch card-back-${item.key} ${this.state.cardBackStyle === item.key ? 'active' : ''}" data-group="cardBack" data-key="${item.key}" title="${item.name}">
                <span>${item.icon}</span>
                <span class="swatch-label">${item.name}</span>
            </div>
        `).join('');
    },

    renderSpreadSelector() {
        const container = document.getElementById('spread-selector');
        let html = '';
        Object.keys(this.data.spreadCategories).forEach(catKey => {
            const category = this.data.spreadCategories[catKey];
            html += `<div class="spread-category">`;
            html += `<div class="spread-category-title">${category[this.state.lang]}</div>`;
            html += `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">`;
            category.spreads.forEach(spreadKey => {
                const spread = this.data.spreads[spreadKey];
                const hint = spread[`hint_${this.state.lang}`];
                html += `<button class="control-card spread-card" data-group="spread" data-key="${spreadKey}">
                    <span>${spread[this.state.lang]}</span>
                    <div class="spread-hint">${hint}</div>
                </button>`;
            });
            html += `</div></div>`;
        });
        container.innerHTML = html;
    },

    renderSuitSelector() {
        const suits = [
            { key: 'major', icon: '✨', name: this.translations[this.state.lang].suit_major },
            { key: 'wands', icon: '🔥', name: this.translations[this.state.lang].suit_wands },
            { key: 'cups', icon: '💧', name: this.translations[this.state.lang].suit_cups },
            { key: 'swords', icon: '🌪', name: this.translations[this.state.lang].suit_swords },
            { key: 'pentacles', icon: '⛰', name: this.translations[this.state.lang].suit_pentacles }
        ];
        const container = document.getElementById('suit-grid');
        container.innerHTML = suits.map(suit => `
            <div class="suit-selector-card ${this.state.activeSuit === suit.key ? 'active' : ''}" onclick="App.selectSuit('${suit.key}')">
                <div class="suit-icon">${suit.icon}</div>
                <div class="suit-name">${suit.name}</div>
            </div>
        `).join('');
    },

    selectSuit(suitKey) {
        this.state.activeSuit = suitKey;
        this.renderSuitSelector();
        this.renderCardCarousel();
        document.getElementById('card-selection-step').style.display = 'block';
    },

    renderCardCarousel() {
        const carousel = document.getElementById('card-carousel');
        const isMajor = this.state.activeSuit === 'major';
        const ranks = isMajor ? this.data.cards.major[this.state.lang] : this.data.cards.minor[this.state.lang];
        let html = '';
        ranks.forEach((rank, index) => {
            const cardId = isMajor ? `major_${index}` : `${this.state.activeSuit}_${index}`;
            const cardName = isMajor ? rank : `${rank} ${this.data.cards.suits[this.state.lang][this.state.activeSuit]}`;
            const isUsed = Object.values(this.state.selectedCards).some(c => c.id === cardId);
            const disabledClass = isUsed ? 'disabled' : '';
            html += `
                <div class="card-item ${disabledClass}" onclick="App.selectCardFromCarousel('${cardId}', '${cardName}', ${isUsed})">
                    <div class="card-item-name">${rank}</div>
                </div>
            `;
        });
        carousel.innerHTML = html;
    },

    selectCardFromCarousel(cardId, cardName, isUsed) {
        if (isUsed) {
            alert(this.translations[this.state.lang].alert_card_already_in(cardName));
            return;
        }
        const schema = this.data.spreads[this.state.spreadKey];
        if (this.state.activePositionIndex >= schema.cards) return;

        const posName = schema.positions[this.state.lang][this.state.activePositionIndex];
        this.state.selectedCards[posName] = {
            id: cardId, name: cardName, isReversed: this.state.previewReversed,
            imageURL: this.getCardImageURLById(cardId)
        };

        this.playSound('card-select-sound');
        this.state.previewReversed = false;
        document.getElementById('reversed-checkbox').checked = false;

        const nextIndex = schema.positions[this.state.lang].findIndex((_, i) => !this.state.selectedCards[schema.positions[this.state.lang][i]]);
        this.state.activePositionIndex = (nextIndex === -1) ? schema.cards : nextIndex;

        this.updateUI();
    },

    // NEW FEATURE: random card draw — picks a random not-yet-used card for the active position
    randomDraw() {
        const schema = this.data.spreads[this.state.spreadKey];
        if (this.state.activePositionIndex >= schema.cards) return;

        const allCardIds = [];
        for (let i = 0; i < 22; i++) allCardIds.push(`major_${i}`);
        ['wands', 'cups', 'swords', 'pentacles'].forEach(suit => {
            for (let i = 0; i < 14; i++) allCardIds.push(`${suit}_${i}`);
        });
        const usedIds = Object.values(this.state.selectedCards).map(c => c.id);
        const available = allCardIds.filter(id => !usedIds.includes(id));
        if (available.length === 0) return;

        const randomId = available[Math.floor(Math.random() * available.length)];
        const randomReversed = Math.random() < 0.35; // ~35% chance reversed, like a real shuffle
        const cardName = this.translateCardName(randomId);

        const posName = schema.positions[this.state.lang][this.state.activePositionIndex];
        this.state.selectedCards[posName] = {
            id: randomId, name: cardName, isReversed: randomReversed,
            imageURL: this.getCardImageURLById(randomId)
        };

        this.playSound('mystical-chime');
        const nextIndex = schema.positions[this.state.lang].findIndex((_, i) => !this.state.selectedCards[schema.positions[this.state.lang][i]]);
        this.state.activePositionIndex = (nextIndex === -1) ? schema.cards : nextIndex;
        this.updateUI();
    },

    toggleReversedPreview() {
        this.state.previewReversed = !this.state.previewReversed;
        document.getElementById('reversed-checkbox').checked = this.state.previewReversed;
    },

    toggleCardReversed(posName) {
        if (this.state.selectedCards[posName]) {
            this.state.selectedCards[posName].isReversed = !this.state.selectedCards[posName].isReversed;
            this.updateUI();
        }
    },

    // ===================== EVENTS =====================
    addEventListeners() {
        document.getElementById('lang-toggle').addEventListener('click', () => this.toggleLanguage());
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetSpread());
        document.getElementById('ai-btn').addEventListener('click', () => this.getSpreadInterpretation());
        document.getElementById('music-toggle').addEventListener('click', () => this.toggleMusic());
        document.getElementById('rules-toggle').addEventListener('click', () => this.toggleAccordion('rules-wrapper', 'journal-wrapper'));
        document.getElementById('journal-toggle').addEventListener('click', () => { this.renderJournal(); this.toggleAccordion('journal-wrapper', 'rules-wrapper'); });
        document.getElementById('refine-question-btn').addEventListener('click', () => this.refineQuestion());
        document.getElementById('random-draw-btn').addEventListener('click', () => this.randomDraw());
        document.getElementById('save-reading-btn').addEventListener('click', () => this.saveReadingToJournal());
        document.getElementById('copy-reading-btn').addEventListener('click', () => this.copyReadingToClipboard());

        document.getElementById('target-selector').addEventListener('click', e => {
            const button = e.target.closest('button');
            if (button && button.dataset.group) this.handleSelection(button.dataset.group, button.dataset.key);
        });

        ['mode-selector', 'sphere-selector', 'spread-selector', 'card-back-selector'].forEach(id => {
            document.getElementById(id).addEventListener('click', e => {
                const el = e.target.closest('[data-group]');
                if (el) this.handleSelection(el.dataset.group, el.dataset.key);
            });
        });
    },

    toggleAccordion(showId, hideId) {
        const showEl = document.getElementById(showId);
        const hideEl = document.getElementById(hideId);
        const wasActive = showEl.classList.contains('active');
        hideEl.classList.remove('active');
        showEl.classList.toggle('active', !wasActive);
    },

    handleSelection(group, key, doUpdate = true) {
        document.querySelectorAll(`[data-group="${group}"]`).forEach(btn => btn.classList.remove('active'));
        const button = document.querySelector(`[data-group="${group}"][data-key="${key}"]`);
        if (button) button.classList.add('active');

        switch (group) {
            case 'mode':
                this.state.aiMode = key;
                this.applyTheme(this.state.theme);
                break;
            case 'sphere':
                this.state.sphere = key;
                const sphereData = this.data.spheres.find(s => s.key === key);
                if (sphereData && sphereData.rec) {
                    document.getElementById('recommendation-text').textContent = sphereData.rec_key ? this.translations[this.state.lang][sphereData.rec_key] : '';
                    if (doUpdate) { this.handleSelection('spread', sphereData.rec, true); }
                    return;
                }
                break;
            case 'target':
                this.state.target = key;
                document.getElementById('other-person-wrapper').style.display = (key === 'partner' || key === 'friend' || key === 'rival') ? 'block' : 'none';
                if (doUpdate) this.resetSpread();
                break;
            case 'spread': this.state.spreadKey = key; if (doUpdate) this.resetSpread(); break;
            case 'cardBack': this.state.cardBackStyle = key; this.renderCardBackPicker(); if (doUpdate) this.updateUI(); break;
        }
        if (doUpdate) this.updateUI();
    },

    resetSpread() {
        this.state.selectedCards = {};
        this.state.activePositionIndex = 0;
        this.state.activeSuit = null;
        this.state.previewReversed = false;
        document.getElementById('question').value = '';
        document.getElementById('card-selection-step').style.display = 'none';
        document.getElementById('ai-response-box').innerHTML = `<span id="ai-placeholder">${this.translations[this.state.lang].placeholder_ai_response}</span>`;
        this.updateUI();
    },

    updateUI() {
        this.renderSchema();
        this.updateHint();
        if (this.state.activeSuit) this.renderCardCarousel();
    },

    // ===================== SCHEMA RENDER =====================
    renderSchema() {
        const schema = this.data.spreads[this.state.spreadKey];
        const container = document.getElementById('spread-schema-container');
        container.innerHTML = '';
        container.className = `schema-container ${schema.gridClass || ''}`;

        if (!schema.gridClass) {
            container.style.gridTemplateAreas = schema.grid;
            const gridMatch = schema.grid.match(/"(.*?)"/);
            if (gridMatch) {
                const columns = gridMatch[1].trim().split(/\s+/).filter(x => x !== '.').length;
                container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            }
        }

        schema.positions[this.state.lang].forEach((posName, index) => {
            const cardData = this.state.selectedCards[posName];

            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.gap = '0.4rem';
            wrapper.style.alignItems = 'stretch';

            if (this.state.spreadKey === 'cross') {
                wrapper.classList.add(`cross-pos-${index + 1}`);
            } else {
                wrapper.style.gridArea = `pos${index + 1}`;
            }

            const flipContainer = document.createElement('div');
            flipContainer.className = `card-flip-container ${cardData ? 'flipped card-flight-animation' : ''}`;

            if (index === this.state.activePositionIndex && !cardData) {
                flipContainer.classList.add('schema-position-active');
            }

            flipContainer.onclick = () => {
                if (cardData) {
                    this.playFlipSound();
                    flipContainer.classList.toggle('flipped');
                } else {
                    this.state.activePositionIndex = index;
                    this.updateUI();
                }
            };

            const inner = document.createElement('div');
            inner.className = 'card-flip-inner';

            const front = document.createElement('div');
            front.className = `card-front card-back-${this.state.cardBackStyle}`;
            const backPatterns = { cosmic: '🌌', witchy: '🔮', gold: '⚜️' };
            const backPattern = backPatterns[this.state.cardBackStyle] || '🔮';
            front.innerHTML = `
                <div style="font-size:2.5rem;opacity:0.5;">${backPattern}</div>
                <div class="slot-number" style="font-size:1.4rem;opacity:0.3;">${index + 1}</div>
                <div class="slot-position-name" style="margin-top:0.25rem;">${posName}</div>
            `;

            const back = document.createElement('div');
            back.className = 'card-back';
            back.style.cssText = 'padding:0;overflow:hidden;border-radius:0.75rem;';

            if (cardData) {
                const imageURL = cardData.imageURL || this.getCardImageURLById(cardData.id);
                const fallbackURL = this.getFallbackImageURLById(cardData.id);
                const finalURL = this.finalPlaceholder();
                const reversedStyle = cardData.isReversed ? 'transform:rotate(180deg);' : '';
                back.innerHTML = `
                    <img
                        src="${imageURL}"
                        alt="${cardData.name}"
                        class="tarot-card-img"
                        style="width:100%;height:100%;object-fit:cover;border-radius:0.75rem;display:block;${reversedStyle}"
                        data-fallback-tried="0"
                        onerror="App.handleImageError(this, '${fallbackURL}', '${finalURL}')"
                    >
                `;
            } else {
                back.innerHTML = `<div class="slot-position-name">${posName}</div>`;
            }

            inner.appendChild(front);
            inner.appendChild(back);
            flipContainer.appendChild(inner);
            wrapper.appendChild(flipContainer);

            if (cardData) {
                const translatedName = cardData.id ? this.translateCardName(cardData.id) : cardData.name;
                const footer = document.createElement('div');
                footer.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0.2rem;';

                const nameEl = document.createElement('div');
                nameEl.className = 'slot-card-name text-gold';
                nameEl.style.cssText = 'font-size:0.75rem;text-align:center;line-height:1.2;';
                nameEl.textContent = translatedName + (cardData.isReversed ? ` ↻` : '');

                const revBtn = document.createElement('button');
                revBtn.className = 'reverse-btn';
                revBtn.textContent = this.translations[this.state.lang].btn_reverse;
                revBtn.onclick = (e) => { e.stopPropagation(); this.toggleCardReversed(posName); };

                footer.appendChild(nameEl);
                footer.appendChild(revBtn);
                wrapper.appendChild(footer);
            }

            container.appendChild(wrapper);
        });
    },

    // Robust image fallback chain: primary CDN -> secondary CDN -> generic placeholder
    handleImageError(imgEl, fallbackURL, finalURL) {
        const tried = parseInt(imgEl.dataset.fallbackTried || '0', 10);
        if (tried === 0) {
            imgEl.dataset.fallbackTried = '1';
            imgEl.src = fallbackURL;
        } else {
            imgEl.onerror = null;
            imgEl.src = finalURL;
        }
    },

    updateHint() {
        const schema = this.data.spreads[this.state.spreadKey];
        const hint = document.getElementById('current-position-hint');
        if (this.state.activePositionIndex < schema.cards) {
            hint.innerHTML = `${this.translations[this.state.lang].hint_select_card_for} <strong class="text-gold">"${schema.positions[this.state.lang][this.state.activePositionIndex]}"</strong>`;
        } else {
            hint.textContent = this.translations[this.state.lang].hint_spread_filled;
        }
    },

    // ===================== LANGUAGE / THEME =====================
    toggleLanguage() {
        const prevLang = this.state.lang;
        this.state.lang = this.state.lang === 'ua' ? 'ru' : 'ua';
        localStorage.setItem('tarot_lang', this.state.lang);
        document.documentElement.lang = this.state.lang;
        document.getElementById('lang-pill').style.transform = this.state.lang === 'ua' ? 'translateX(0px)' : 'translateX(20px)';

        const schema = this.data.spreads[this.state.spreadKey];
        const oldPositions = schema.positions[prevLang];
        const newPositions = schema.positions[this.state.lang];
        const newSelectedCards = {};
        oldPositions.forEach((oldPosName, index) => {
            if (this.state.selectedCards[oldPosName]) {
                newSelectedCards[newPositions[index]] = this.state.selectedCards[oldPosName];
            }
        });
        this.state.selectedCards = newSelectedCards;

        this.applyLanguage();
        this.renderAllSelectors();
        this.restoreActiveStates();
        this.displayMoonPhase();
        this.renderDailyCardWidget();

        if (this.state.activeSuit) {
            document.getElementById('card-selection-step').style.display = 'block';
            this.renderCardCarousel();
        }
    },

    toggleTheme() {
        this.state.theme = this.state.theme === 'neon' ? 'witchy' : 'neon';
        localStorage.setItem('tarot_theme', this.state.theme);
        this.applyTheme(this.state.theme);
        document.getElementById('theme-pill').style.transform = this.state.theme === 'neon' ? 'translateX(0px)' : 'translateX(26px)';
    },

    applyTheme(theme) {
        document.body.classList.remove('theme-witchy', 'theme-psychologist');
        if (theme === 'witchy') {
            document.body.classList.add('theme-witchy');
        } else if (this.state.aiMode === 'psychologist') {
            document.body.classList.add('theme-psychologist');
        }
    },

    applyLanguage() {
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            const translation = this.translations[this.state.lang][key];
            if (translation && key !== 'rules_list') {
                el.textContent = translation;
            }
        });

        const rulesList = document.getElementById('rules-list');
        if (rulesList) {
            rulesList.innerHTML = this.translations[this.state.lang].rules_list.map(rule => `<li>${rule}</li>`).join('');
        }

        const questionField = document.getElementById('question');
        if (questionField) {
            questionField.placeholder = questionField.dataset[`placeholder${this.state.lang === 'ua' ? 'Ua' : 'Ru'}`];
        }

        const otherPersonInput = document.getElementById('other-person-input');
        if (otherPersonInput) {
            otherPersonInput.placeholder = this.state.lang === 'ua' ? 'Напр.: Олена, 28 років...' : 'Напр.: Елена, 28 лет...';
        }

        const apiKeyHintEl = document.querySelector('[data-translate-key="api_key_hint"]');
        if (apiKeyHintEl) apiKeyHintEl.textContent = this.translations[this.state.lang].api_key_hint;
    },

    // ===================== AI: PROMPT BUILDING & REQUEST =====================
    // Builds an authoritative reference block from the embedded guide data (TAROT_MEANINGS)
    // so the AI grounds its interpretation in the actual Rider-Waite tradition instead of guessing.
    buildCardReferenceBlock(cardsObj, lang) {
        const lines = [];
        Object.entries(cardsObj).forEach(([posName, card]) => {
            const meaningText = (typeof getCardMeaningText === 'function') ? getCardMeaningText(card.id, card.isReversed, lang) : '';
            const orientationLabel = card.isReversed ? (lang === 'ua' ? 'перевернута' : 'перевёрнутая') : (lang === 'ua' ? 'пряма' : 'прямая');
            const cardLabel = this.translateCardName(card.id);
            lines.push(`• [${posName}] ${cardLabel} (${orientationLabel}): ${meaningText || '(довідкове значення відсутнє, спирайся на загальні знання)'}`);
        });
        return lines.join('\n');
    },

    buildSystemPrompt(lang, mode) {
        const isUa = lang === 'ua';
        const modeInstruction = mode === 'psychologist'
            ? (isUa
                ? 'Працюй у психологічному режимі: трактуй карти як архетипи та метафори внутрішніх процесів, уникай тверджень про "долю" чи "майбутнє" як факт, фокусуйся на самопізнанні, паттернах поведінки та практичних кроках.'
                : 'Работай в психологическом режиме: трактуй карты как архетипы и метафоры внутренних процессов, избегай утверждений о "судьбе" или "будущем" как факте, фокусируйся на самопознании, паттернах поведения и практических шагах.')
            : (isUa
                ? 'Працюй у містичному режимі традиційного таро: говори мовою символів, інтуїції та класичної традиції Таро Райдера-Уейта, але залишайся теплим і підтримуючим.'
                : 'Работай в мистическом режиме традиционного таро: говори языком символов, интуиции и классической традиции Таро Райдера-Уэйта, но оставайся тёплым и поддерживающим.');

        return isUa
            ? `Ти — досвідчений, теплий і чесний таролог-консультант. Тобі надано ДОВІДКОВІ значення карт з класичного гайду по Таро Райдера-Уейта (видавництво ORNER) — використовуй їх як основу трактування, не вигадуй власних значень карт, що суперечать наданим. ${modeInstruction}
Правила:
- Завжди враховуй ПРЯМЕ чи ПЕРЕВЕРНУТЕ положення кожної карти — це принципово змінює сенс.
- Пов'язуй карти одна з одною в межах позицій розкладу, а не описуй їх ізольовано.
- Уникай категоричних передбачень ("точно станеться X"); формулюй як вірогідний вектor за поточних обставин.
- НЕ давай медичних, юридичних чи фінансових інструкцій як остаточну істину — лише як символічний орієнтир.
- Якщо запитання людини закрите (так/ні), допоможи побачити ширшу картину, а не лише відповідь.
- Пиши українською мовою, теплим, але впевненим тоном, структуровано (короткий вступ → по картах/позиціях → загальний висновок і практична порада).
- Обсяг: 250-450 слів, без зайвої публіцистики.`
            : `Ты — опытный, тёплый и честный таролог-консультант. Тебе предоставлены СПРАВОЧНЫЕ значения карт из классического гайда по Таро Райдера-Уэйта (издательство ORNER) — используй их как основу трактовки, не придумывай собственных значений карт, противоречащих предоставленным. ${modeInstruction}
Правила:
- Всегда учитывай ПРЯМОЕ или ПЕРЕВЁРНУТОЕ положение каждой карты — это принципиально меняет смысл.
- Связывай карты друг с другом в рамках позиций расклада, а не описывай их изолированно.
- Избегай категоричных предсказаний ("точно случится X"); формулируй как вероятный вектор при текущих обстоятельствах.
- НЕ давай медицинских, юридических или финансовых инструкций как окончательную истину — только как символический ориентир.
- Если вопрос человека закрытый (да/нет), помоги увидеть более широкую картину, а не только ответ.
- Пиши на русском языке, тёплым, но уверенным тоном, структурированно (короткое вступление → по картам/позициям → общий вывод и практический совет).
- Объём: 250-450 слов, без лишней публицистики.`;
    },

    buildUserPrompt(requestData) {
        const lang = requestData.lang;
        const isUa = lang === 'ua';
        const cardRef = this.buildCardReferenceBlock(requestData.cards, lang);
        const targetLabel = {
            self: isUa ? 'на себе' : 'на себя',
            partner: isUa ? 'на партнера' : 'на партнёра',
            friend: isUa ? 'на друга' : 'на друга',
            rival: isUa ? 'на ворога/суперника' : 'на врага/соперника'
        }[requestData.target] || (isUa ? 'на себе' : 'на себя');

        let prompt = isUa
            ? `Зроби розклад Таро "${requestData.spreadType}" у сфері "${requestData.theme}", читання ${targetLabel}.`
            : `Сделай расклад Таро "${requestData.spreadType}" в сфере "${requestData.theme}", чтение ${targetLabel}.`;

        if (requestData.targetPerson) {
            prompt += isUa ? `\nІнша людина: ${requestData.targetPerson}.` : `\nДругой человек: ${requestData.targetPerson}.`;
        }
        if (requestData.question) {
            prompt += isUa ? `\nПитання: "${requestData.question}"` : `\nВопрос: "${requestData.question}"`;
        }
        prompt += isUa
            ? `\n\nДОВІДКОВІ ЗНАЧЕННЯ ВИТЯГНУТИХ КАРТ (з офіційного гайду по Rider-Waite Tarot):\n${cardRef}\n\nДай зв'язне тлумачення всього розкладу на основі цих карт і їх положень, а не лише перелік значень.`
            : `\n\nСПРАВОЧНЫЕ ЗНАЧЕНИЯ ВЫТЯНУТЫХ КАРТ (из официального гайда по Rider-Waite Tarot):\n${cardRef}\n\nДай связную трактовку всего расклада на основе этих карт и их положений, а не просто перечень значений.`;

        return prompt;
    },

    async callClaudeAPI(systemPrompt, userPrompt) {
        if (!this.state.apiKey) {
            throw new Error(this.state.lang === 'ua'
                ? 'Будь ласка, введіть свій Anthropic API ключ у полі вище.'
                : 'Пожалуйста, введите свой Anthropic API ключ в поле выше.');
        }
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.state.apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-6',
                max_tokens: 1500,
                system: systemPrompt,
                messages: [{ role: 'user', content: userPrompt }]
            })
        });
        if (!response.ok) {
            const errBody = await response.json().catch(() => ({}));
            throw new Error(errBody?.error?.message || `HTTP ${response.status}`);
        }
        const data = await response.json();
        const textBlock = data.content.find(b => b.type === 'text');
        return textBlock ? textBlock.text : '';
    },

    async refineQuestion() {
        const question = document.getElementById('question').value.trim();
        if (!question) return;
        this.playSound('mystical-chime');

        const isUa = this.state.lang === 'ua';
        const sphereLabel = this.data.spheres.find(s => s.key === this.state.sphere)[this.state.lang];
        const systemPrompt = isUa
            ? 'Ти допомагаєш людині переформулювати запитання для розкладу Таро так, щоб воно було відкритим, конструктивним і екологічним (без закритих "так/ні" формулювань, без негативного умислу). Поверни ЛИШЕ перефразоване питання, без пояснень.'
            : 'Ты помогаешь человеку переформулировать вопрос для расклада Таро так, чтобы он был открытым, конструктивным и экологичным (без закрытых "да/нет" формулировок, без негативного умысла). Верни ТОЛЬКО перефразированный вопрос, без объяснений.';
        const userPrompt = isUa
            ? `Сфера: ${sphereLabel}. Питання користувача: "${question}". Переформулюй його.`
            : `Сфера: ${sphereLabel}. Вопрос пользователя: "${question}". Переформулируй его.`;

        document.getElementById('loading-overlay').classList.add('active');
        try {
            const refined = await this.callClaudeAPI(systemPrompt, userPrompt);
            document.getElementById('question').value = refined.trim().replace(/^["']|["']$/g, '');
            this.playSound('card-select-sound');
        } catch (error) {
            alert(error.message);
        } finally {
            document.getElementById('loading-overlay').classList.remove('active');
        }
    },

    async getSpreadInterpretation() {
        const schema = this.data.spreads[this.state.spreadKey];
        if (Object.keys(this.state.selectedCards).length < schema.cards) {
            alert(this.translations[this.state.lang].alert_spread_not_filled);
            return;
        }

        this.playSound('mystical-chime');

        const requestData = {
            lang: this.state.lang, mode: this.state.aiMode,
            theme: this.data.spheres.find(s => s.key === this.state.sphere)[this.state.lang],
            spreadType: this.data.spreads[this.state.spreadKey][this.state.lang],
            question: document.getElementById('question').value.trim(),
            cards: this.state.selectedCards,
            target: this.state.target,
            targetPerson: (this.state.target !== 'self') ? (document.getElementById('other-person-input')?.value.trim() || null) : null
        };

        document.getElementById('loading-overlay').classList.add('active');
        try {
            const systemPrompt = this.buildSystemPrompt(requestData.lang, requestData.mode);
            const userPrompt = this.buildUserPrompt(requestData);
            const text = await this.callClaudeAPI(systemPrompt, userPrompt);
            const responseBox = document.getElementById('ai-response-box');
            responseBox.innerHTML = `<div class="ai-text-block">${this.formatAIText(text)}</div>`;
            this._lastInterpretation = text;
        } catch (error) {
            document.getElementById('ai-response-box').innerHTML = `<span class="text-red-400">${this.state.lang === 'ua' ? 'Помилка' : 'Ошибка'}: ${error.message}</span>`;
        } finally {
            document.getElementById('loading-overlay').classList.remove('active');
        }
    },

    formatAIText(text) {
        return text.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
    },

    // ===================== JOURNAL (NEW FEATURE) =====================
    // Saves the current spread + interpretation locally so the person can revisit past readings.
    saveReadingToJournal() {
        if (!this._lastInterpretation) {
            alert(this.state.lang === 'ua' ? 'Спочатку отримайте тлумачення.' : 'Сначала получите толкование.');
            return;
        }
        const journal = JSON.parse(localStorage.getItem('tarot_journal') || '[]');
        const schema = this.data.spreads[this.state.spreadKey];
        const cardsSummary = Object.entries(this.state.selectedCards).map(([pos, c]) => {
            const name = this.translateCardName(c.id);
            return `${pos}: ${name}${c.isReversed ? ' ↻' : ''}`;
        }).join(', ');

        journal.unshift({
            date: new Date().toISOString(),
            spreadName: schema[this.state.lang],
            sphere: this.data.spheres.find(s => s.key === this.state.sphere)[this.state.lang],
            question: document.getElementById('question').value.trim(),
            cardsSummary,
            interpretation: this._lastInterpretation
        });

        if (journal.length > 50) journal.length = 50; // cap to avoid bloating localStorage
        localStorage.setItem('tarot_journal', JSON.stringify(journal));

        const msg = document.createElement('div');
        msg.textContent = this.translations[this.state.lang].saved_to_journal;
        msg.style.cssText = 'color: var(--text-gold); font-size: 0.8rem; text-align:center; margin-top: 0.5rem;';
        const container = document.getElementById('ai-response-container');
        container.appendChild(msg);
        setTimeout(() => msg.remove(), 2500);
    },

    renderJournal() {
        const journal = JSON.parse(localStorage.getItem('tarot_journal') || '[]');
        const list = document.getElementById('journal-list');
        if (journal.length === 0) {
            list.innerHTML = `<div class="journal-empty">${this.translations[this.state.lang].journal_empty}</div>`;
            return;
        }
        list.innerHTML = journal.map((entry, idx) => {
            const date = new Date(entry.date);
            const dateStr = date.toLocaleDateString(this.state.lang === 'ua' ? 'uk-UA' : 'ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            return `
                <div class="journal-entry" onclick="App.openJournalEntry(${idx})">
                    <div class="journal-entry-date">${dateStr} · ${entry.sphere}</div>
                    <div class="journal-entry-title">${entry.spreadName}${entry.question ? ' — ' + entry.question : ''}</div>
                    <div class="journal-entry-summary">${entry.cardsSummary}</div>
                </div>
            `;
        }).join('');
    },

    openJournalEntry(idx) {
        const journal = JSON.parse(localStorage.getItem('tarot_journal') || '[]');
        const entry = journal[idx];
        if (!entry) return;
        document.getElementById('journal-wrapper').classList.remove('active');
        const responseBox = document.getElementById('ai-response-box');
        responseBox.innerHTML = `<div class="ai-text-block"><div class="text-xs text-purple mb-2">${entry.cardsSummary}</div>${this.formatAIText(entry.interpretation)}</div>`;
        this._lastInterpretation = entry.interpretation;
        document.getElementById('ai-response-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    copyReadingToClipboard() {
        if (!this._lastInterpretation) return;
        navigator.clipboard.writeText(this._lastInterpretation).then(() => {
            const msg = document.createElement('div');
            msg.textContent = this.translations[this.state.lang].copied_to_clipboard;
            msg.style.cssText = 'color: var(--text-gold); font-size: 0.8rem; text-align:center; margin-top: 0.5rem;';
            const container = document.getElementById('ai-response-container');
            container.appendChild(msg);
            setTimeout(() => msg.remove(), 2000);
        }).catch(() => {});
    },

    // ===================== DAILY CARD (NEW FEATURE) =====================
    // Deterministic "card of the day" derived from the date, so it's the same card all day
    // (re-shuffles automatically the next day) without needing a backend.
    getDailyCardId() {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const allCardIds = [];
        for (let i = 0; i < 22; i++) allCardIds.push(`major_${i}`);
        ['wands', 'cups', 'swords', 'pentacles'].forEach(suit => {
            for (let i = 0; i < 14; i++) allCardIds.push(`${suit}_${i}`);
        });
        const index = seed % allCardIds.length;
        const isReversed = (seed % 7) === 0; // simple deterministic reversal pattern
        return { id: allCardIds[index], isReversed };
    },

    renderDailyCardWidget() {
        const widget = document.getElementById('daily-card-widget');
        const { id, isReversed } = this.getDailyCardId();
        const cardName = this.translateCardName(id);
        const todayKey = new Date().toDateString();
        const revealed = sessionStorage.getItem('daily_card_revealed') === todayKey;

        if (!revealed) {
            widget.innerHTML = `<div style="font-size:1.5rem;">🔮</div><div><div class="text-xs text-purple">${this.translations[this.state.lang].daily_card_title}</div><div class="text-sm text-gold">${this.translations[this.state.lang].daily_card_cta}</div></div>`;
            widget.onclick = () => {
                sessionStorage.setItem('daily_card_revealed', todayKey);
                this.playFlipSound();
                this.renderDailyCardWidget();
            };
        } else {
            const imageURL = this.getCardImageURLById(id);
            const fallbackURL = this.getFallbackImageURLById(id);
            const finalURL = this.finalPlaceholder();
            widget.innerHTML = `
                <img src="${imageURL}" alt="${cardName}" data-fallback-tried="0" onerror="App.handleImageError(this, '${fallbackURL}', '${finalURL}')" style="${isReversed ? 'transform:rotate(180deg);' : ''}">
                <div><div class="text-xs text-purple">${this.translations[this.state.lang].daily_card_title}</div><div class="text-sm text-gold font-semibold">${cardName}${isReversed ? ' ↻' : ''}</div></div>
            `;
            widget.onclick = () => this.showDailyCardMeaning(id, isReversed, cardName);
        }
    },

    showDailyCardMeaning(cardId, isReversed, cardName) {
        const meaning = (typeof getCardMeaningText === 'function') ? getCardMeaningText(cardId, isReversed, this.state.lang) : '';
        alert(`${cardName}${isReversed ? ' (↻)' : ''}\n\n${meaning}`);
    },

    // ===================== SOUND =====================
    playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.volume = 0.4;
            sound.play().catch(e => console.error("Sound play failed:", e));
        }
    },

    playFlipSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            oscillator.type = 'sine';
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.3);
        } catch (e) { console.error("Web Audio API failed:", e); }
    },

    toggleMusic() {
        const music = document.getElementById('ambient-music');
        const button = document.getElementById('music-toggle');
        if (music.paused) {
            music.volume = 0.2;
            music.play().catch(e => console.error("Audio play failed:", e));
            button.textContent = '🔊';
        } else {
            music.pause();
            button.textContent = '🔇';
        }
    },

    displayMoonPhase() {
        const icons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
        const day = new Date().getDate();
        const index = Math.floor((day % 30) / 3.75);
        document.getElementById('moon-widget').innerHTML = `<div class="text-2xl">${icons[index]}</div><div>${this.translations[this.state.lang].moon_phases[index]}</div>`;
    }
};
document.addEventListener('DOMContentLoaded', () => App.init());
