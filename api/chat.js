const SYSTEM_PROMPTS = {
    ua: {
        mystical: `Ти — професійний таролог, що говорить з позиції класичної езотерики. Відповідай СУВОРО українською мовою. Тлумач карти як знаки долі, енергетичні потоки та духовні уроки. Твій стиль — авторитетний, трохи загадковий, але чіткий. Уникай води.`,
        psychologist: `Ти — сучасний психолог, що використовує карти Таро як метафоричний інструмент. Відповідай СУВОРО українською мовою. Тлумач карти як архетипи та психологічні стани. Твій стиль — підтримуючий, ясний, без езотерики. Фокусуйся на конкретних діях.`,
        card_of_the_day: `Ти — редактор красивих таро-послань дня. Відповідай СУВОРО українською мовою. Не роби повну трактовку і не використовуй пафосні кліше. Формат відповіді: 1) "Фраза дня: ..." — одна жива, образна фраза до 90 символів; 2) "Порада: ..." — одна конкретна м'яка дія на сьогодні. Не повторюй назву карти більше одного разу.`
    },
    ru: {
        mystical: `Ты — профессиональный таролог, говорящий с позиции классической эзотерики. Отвечай СТРОГО на русском языке. Трактуй карты как знаки судьбы, энергетические потоки и духовные уроки. Твой стиль — авторитетный, немного загадочный, но чёткий. Избегай воды.`,
        psychologist: `Ты — современный психолог, использующий карты Таро как метафорический инструмент. Отвечай СТРОГО на русском языке. Трактуй карты как архетипы и психологические состояния. Твой стиль — поддерживающий, ясный, без эзотерики. Фокусируйся на конкретных действиях.`,
        card_of_the_day: `Ты — редактор красивых таро-посланий дня. Отвечай СТРОГО на русском языке. Не делай полную трактовку и не используй пафосные клише. Формат ответа: 1) "Фраза дня: ..." — одна живая, образная фраза до 90 символов; 2) "Совет: ..." — одно конкретное мягкое действие на сегодня. Не повторяй название карты больше одного раза.`
    }
};

const FULL_DECK = ["Дурень", "Маг", "Верховна Жриця", "Імператриця", "Імператор", "Ієрофант", "Закохані", "Колісниця", "Сила", "Відлюдник", "Колесо Фортуни", "Справедливість", "Повішений", "Смерть", "Помірність", "Диявол", "Вежа", "Зірка", "Місяць", "Сонце", "Суд", "Світ", "Туз Жезлів", "Двійка Жезлів", "Трійка Жезлів", "Четвірка Жезлів", "П'ятірка Жезлів", "Шістка Жезлів", "Сімка Жезлів", "Вісімка Жезлів", "Дев'ятка Жезлів", "Десятка Жезлів", "Паж Жезлів", "Лицар Жезлів", "Королева Жезлів", "Король Жезлів", "Туз Кубків", "Двійка Кубків", "Трійка Кубків", "Четвірка Кубків", "П'ятірка Кубків", "Шістка Кубків", "Сімка Кубків", "Вісімка Кубків", "Дев'ятка Кубків", "Десятка Кубків", "Паж Кубків", "Лицар Кубків", "Королева Кубків", "Король Кубків", "Туз Мечів", "Двійка Мечів", "Трійка Мечів", "Четвірка Мечів", "П'ятірка Мечів", "Шістка Мечів", "Сімка Мечів", "Вісімка Мечів", "Дев'ятка Мечів", "Десятка Мечів", "Паж Мечів", "Лицар Мечів", "Королева Мечів", "Король Мечів", "Туз Пентаклів", "Двійка Пентаклів", "Трійка Пентаклів", "Четвірка Пентаклів", "П'ятірка Пентаклів", "Шістка Пентаклів", "Сімка Пентаклів", "Вісімка Пентаклів", "Дев'ятка Пентаклів", "Десятка Пентаклів", "Паж Пентаклів", "Лицар Пентаклів", "Королева Пентаклів", "Король Пентаклів"];

async function fetchFromGemini(payload, modelName, apiKey) {
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
    return await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
}

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const req = { json: async () => request.body };
    const res = await POST(req);
    const data = await res.json();
    return response.status(res.status).json(data);
}

async function POST(request) {
    try {
        const requestData = await request.json();
        const lang = requestData.lang === 'ru' ? 'ru' : 'ua';
        let systemPrompt, userPrompt;

        if (requestData.type === 'card-of-the-day') {
            const requestedCard = String(requestData.card || '').trim();
            const randomCard = requestedCard || FULL_DECK[Math.floor(Math.random() * FULL_DECK.length)];
            systemPrompt = SYSTEM_PROMPTS[lang].card_of_the_day;
            userPrompt = lang === 'ru'
                ? `Карта дня: [${randomCard}]. Составь фразу дня и совет строго в заданном формате.`
                : `Карта дня: [${randomCard}]. Склади фразу дня і пораду строго в заданому форматі.`;
        } else if (requestData.type === 'refine-question') {
            const question = String(requestData.question || '').trim();
            const sphere = String(requestData.sphere || '').trim();
            if (!question) return { json: async () => ({ error: 'Питання порожнє.' }), status: 400, ok: false };

            systemPrompt = lang === 'ru'
                ? 'Ты помогаешь формулировать вопросы для расклада Таро. Отвечай строго на русском языке. Верни только один улучшенный вопрос без пояснений, вступлений и кавычек. Формулировка должна быть экологичной, конкретной, открытой и сфокусированной на действиях/понимании, а не на контроле другого человека.'
                : 'Ти допомагаєш формулювати питання для розкладу Таро. Відповідай строго українською мовою. Поверни лише одне покращене питання без пояснень, вступів і лапок. Формулювання має бути екологічним, конкретним, відкритим і сфокусованим на діях/розумінні, а не на контролі іншої людини.';
            userPrompt = lang === 'ru'
                ? `Сфера: ${sphere || 'не указана'}\nИсходный вопрос: ${question}`
                : `Сфера: ${sphere || 'не вказана'}\nПочаткове питання: ${question}`;
        } else if (requestData.type === 'spread') {
            const { mode, theme, spreadType, question, cards, positions, targetPerson, client, tone, answerLength, focus, moodBefore, allowReversals } = requestData;
            if (!cards || Object.keys(cards).length === 0) return { json: async () => ({ error: 'Не обрано жодної карти.' }), status: 400, ok: false };
            if (!Array.isArray(positions) || positions.length === 0) return { json: async () => ({ error: 'Не передано позиції розкладу.' }), status: 400, ok: false };

            systemPrompt = SYSTEM_PROMPTS[lang][mode] || SYSTEM_PROMPTS[lang].psychologist;
            const isRu = lang === 'ru';
            const lowerTheme = String(theme || '').toLowerCase();
            const isYesNo = String(spreadType || '').toLowerCase().includes(isRu ? 'да/нет' : 'так/ні');
            const isHealth = lowerTheme.includes('здоров') || lowerTheme.includes('health');
            const isFinance = lowerTheme.includes('финанс') || lowerTheme.includes('фінанс');
            const toneLabels = isRu
                ? { soft: 'мягкий', honest: 'честный', short: 'лаконичный', deep: 'глубокий', practical: 'практичный' }
                : { soft: "м'який", honest: 'чесний', short: 'лаконічний', deep: 'глибокий', practical: 'практичний' };
            const focusLabels = isRu
                ? { feelings: 'чувства', actions: 'действия', risks: 'риски', advice: 'совет', forecast: 'прогноз' }
                : { feelings: 'почуття', actions: 'дії', risks: 'ризики', advice: 'порада', forecast: 'прогноз' };
            const lengthLabels = isRu
                ? { short: 'короткий ответ до 900 знаков', standard: 'стандартный ответ без лишних повторов', detailed: 'подробный, но без воды' }
                : { short: 'коротка відповідь до 900 знаків', standard: 'стандартна відповідь без зайвих повторів', detailed: 'детально, але без води' };

            systemPrompt += isRu
                ? ` Не повторяй название одной и той же карты в каждом абзаце: назови ее один раз в заголовке/первой строке, дальше используй "эта карта", "аркан", "сигнал". Структура обязательна: 1) короткий вердикт, 2) смысл, 3) что делать, 4) главный посыл одной фразой, 5) практический шаг на 24 часа. Тон: ${toneLabels[tone] || toneLabels.soft}. Длина: ${lengthLabels[answerLength] || lengthLabels.standard}. Фокус: ${focusLabels[focus] || focusLabels.advice}. Настроение клиента перед раскладом: ${moodBefore || 'neutral'}.`
                : ` Не повторюй назву однієї й тієї самої карти в кожному абзаці: назви її один раз у заголовку/першому рядку, далі використовуй "ця карта", "аркан", "сигнал". Обов'язкова структура: 1) короткий вердикт, 2) сенс, 3) що робити, 4) головний посил однією фразою, 5) практичний крок на 24 години. Тон: ${toneLabels[tone] || toneLabels.soft}. Довжина: ${lengthLabels[answerLength] || lengthLabels.standard}. Фокус: ${focusLabels[focus] || focusLabels.advice}. Настрій клієнта перед розкладом: ${moodBefore || 'neutral'}.`;
            if (isYesNo) {
                systemPrompt += isRu
                    ? ' Для расклада Да/Нет начни с отдельной строки "Вердикт: скорее да / скорее нет / не сейчас" и дай короткое объяснение без растекания.'
                    : ' Для розкладу Так/Ні почни з окремого рядка "Вердикт: скоріше так / скоріше ні / не зараз" і дай коротке пояснення без розтікання.';
            }
            if (isHealth || isFinance) {
                systemPrompt += isRu
                    ? ' Добавь мягкую фразу, что расклад подсвечивает направление и не заменяет профильного специалиста.'
                    : ' Додай мʼяку фразу, що розклад підсвічує напрям і не замінює профільного спеціаліста.';
            }
            if (positions.length > 1) {
                systemPrompt += isRu
                    ? " Ответ должен быть строго структурирован по пунктам для каждой позиции, без общей вступительной и заключительной воды."
                    : " Відповідь має бути строго структурована по пунктах для кожної позиції, без загальної вступної та заключної води.";
            }

            let targetInfo = targetPerson ? ` для іншої людини (${targetPerson})` : '';
            userPrompt = `Проведи розбір розкладу Таро${targetInfo}.\nТема: ${theme}\nРозклад: ${spreadType}\n`;
            if (client?.name) {
                userPrompt += lang === 'ru' ? `Клиент: ${client.name}\n` : `Клієнт: ${client.name}\n`;
                if (client.contact) userPrompt += lang === 'ru' ? `Контакт/ник: ${client.contact}\n` : `Контакт/нік: ${client.contact}\n`;
                if (client.notes) userPrompt += lang === 'ru' ? `Заметки таролога о клиенте: ${client.notes}\n` : `Нотатки таролога про клієнта: ${client.notes}\n`;
            }
            if (question) userPrompt += `Питання: "${question}"\n`;
            userPrompt += lang === 'ru'
                ? `Настройки чтения: перевернутые карты ${allowReversals === false ? 'не используются' : 'используются'}.\n`
                : `Налаштування читання: перевернуті карти ${allowReversals === false ? 'не використовуються' : 'використовуються'}.\n`;
            userPrompt += `\nКарти:\n`;
            positions.forEach(pos => {
                const card = cards[pos];
                if (card) userPrompt += `- ${pos}: ${card.name} (${card.isReversed ? "Перевернута" : "Пряма"})\n`;
            });
        } else {
            return { json: async () => ({ error: 'Невірний тип запиту.' }), status: 400, ok: false };
        }

        const fullPrompt = `${systemPrompt}\n\n--- ЗАВДАННЯ ---\n${userPrompt}`;
        const payload = { contents: [{ parts: [{ text: fullPrompt }] }] };

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) return { json: async () => ({ error: 'API-ключ не налаштовано.' }), status: 500, ok: false };

        const primaryModel = 'gemini-3.5-flash';
        const fallbackModel = 'gemini-2.5-flash';
        let geminiResponse = await fetchFromGemini(payload, primaryModel, GEMINI_API_KEY);

        if (geminiResponse.status === 503) {
            geminiResponse = await fetchFromGemini(payload, fallbackModel, GEMINI_API_KEY);
        }

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            return { json: async () => ({ error: `Помилка від API Google: ${errorBody}` }), status: geminiResponse.status, ok: false };
        }

        const geminiData = await geminiResponse.json();
        if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
             return { json: async () => ({ error: 'ШІ повернув порожню відповідь.' }), status: 500, ok: false };
        }

        const responseText = geminiData.candidates[0].content.parts[0].text;
        return { json: async () => ({ text: responseText }), status: 200, ok: true };

    } catch (error) {
        return { json: async () => ({ error: 'Внутрішня помилка сервера: ' + error.message }), status: 500, ok: false };
    }
}
