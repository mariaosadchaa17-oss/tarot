const SYSTEM_PROMPTS = {
    ua: {
        mystical: `Ти — професійний таролог, що говорить з позиції класичної езотерики. Відповідай СУВОРО українською мовою. Тлумач карти як знаки долі, енергетичні потоки та духовні уроки. Твій стиль — авторитетний, трохи загадковий, але чіткий. Уникай води.`,
        psychologist: `Ти — сучасний психолог, що використовує карти Таро як метафоричний інструмент. Відповідай СУВОРО українською мовою. Тлумач карти як архетипи та психологічні стани. Твій стиль — підтримуючий, ясний, без езотерики. Фокусуйся на конкретних діях.`,
        card_of_the_day: `Ти — мудрий містик. Дай коротку, але глибоку пораду на сьогодні одним-двома реченнями за випавшою картою. Відповідай СУВОРО українською мовою. Відповідь має бути не довшою за 300 символів.`
    },
    ru: {
        mystical: `Ты — профессиональный таролог, говорящий с позиции классической эзотерики. Отвечай СТРОГО на русском языке. Трактуй карты как знаки судьбы, энергетические потоки и духовные уроки. Твой стиль — авторитетный, немного загадочный, но чёткий. Избегай воды.`,
        psychologist: `Ты — современный психолог, использующий карты Таро как метафорический инструмент. Отвечай СТРОГО на русском языке. Трактуй карты как архетипы и психологические состояния. Твой стиль — поддерживающий, ясный, без эзотерики. Фокусируйся на конкретных действиях.`,
        card_of_the_day: `Ты — мудрый мистик. Дай краткий, но глубокий совет на сегодня одним-двумя предложениями по выпавшей карте. Отвечай СТРОГО на русском языке. Ответ должен быть не длиннее 300 символов.`
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
            const randomCard = FULL_DECK[Math.floor(Math.random() * FULL_DECK.length)];
            systemPrompt = SYSTEM_PROMPTS[lang].card_of_the_day;
            userPrompt = `Карта дня: [${randomCard}]. Дай містичну мікро-пораду.`;
        } else if (requestData.type === 'spread') {
            const { mode, theme, spreadType, question, cards, positions, targetPerson } = requestData;
            if (!cards || Object.keys(cards).length === 0) return { json: async () => ({ error: 'Не обрано жодної карти.' }), status: 400, ok: false };

            systemPrompt = SYSTEM_PROMPTS[lang][mode] || SYSTEM_PROMPTS[lang].psychologist;
            if (positions.length > 1) {
                systemPrompt += " Відповідь має бути строго структурована по пунктах для кожної позиції, без загальної вступної та заключної 'води'.";
            }

            let targetInfo = targetPerson ? ` для іншої людини (${targetPerson})` : '';
            userPrompt = `Проведи розбір розкладу Таро${targetInfo}.\nТема: ${theme}\nРозклад: ${spreadType}\n`;
            if (question) userPrompt += `Питання: "${question}"\n`;
            userPrompt += `\nКарти:\n`;
            positions.forEach(pos => {
                const card = cards[pos];
                if (card) userPrompt += `- ${pos}: ${card.name} (${card.isInverted ? "Перевернута" : "Пряма"})\n`;
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
