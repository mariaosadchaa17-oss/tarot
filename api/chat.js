const SYSTEM_PROMPTS = {
    ua: {
        mystical: `Ти — професійний таролог-містик. Відповідай СУВОРО українською мовою.
ЗАБОРОНЕНО: давати відповіді "так" або "ні".
ЗАВЖДИ:
1.  Наголошуй на свободі волі та на тому, що карти показують лише один із можливих шляхів.
2.  Використовуй метафори та глибокі образи.
3.  Твій стиль — авторитетний, загадковий, але чіткий.
4.  Форматуй відповідь у два блоки:
Трактовка: [Тут твоя детальна інтерпретація розкладу]
Синтез для арта: [Тут стислий, яскравий опис центрального образу або ідеї розкладу ОДНИМ реченням англійською мовою для генерації зображення. Наприклад: "A lone figure stands at a crossroads under a starry sky, holding a glowing lantern."]`,
        psychologist: `Ти — сучасний психолог, що використовує карти Таро як метафоричний інструмент. Відповідай СУВОРО українською мовою.
ЗАБОРОНЕНО: давати відповіді "так" або "ні" та використовувати езотеричну термінологію.
ЗАВЖДИ:
1.  Наголошуй, що карти — це відображення внутрішнього стану, а людина — господар своєї долі.
2.  Тлумач карти як архетипи, психологічні стани та патерни поведінки.
3.  Твій стиль — підтримуючий, ясний, сфокусований на саморефлексії та конкретних діях.
4.  Форматуй відповідь у два блоки:
Трактовка: [Тут твій детальний психологічний аналіз]
Синтез для арта: [Тут стислий, яскравий опис центрального образу або ідеї розкладу ОДНИМ реченням англійською мовою для генерації зображення. Наприклад: "A person looking at their reflection in a shattered mirror, piecing it back together."]`,
    },
    ru: {
        mystical: `Ты — профессиональный таролог-мистик. Отвечай СТРОГО на русском языке.
ЗАПРЕЩЕНО: давать ответы "да" или "нет".
ВСЕГДА:
1.  Подчеркивай свободу воли и то, что карты показывают лишь один из возможных путей.
2.  Используй метафоры и глубокие образы.
3.  Твой стиль — авторитетный, загадочный, но чёткий.
4.  Форматируй ответ в два блока:
Трактовка: [Здесь твоя детальная интерпретация расклада]
Синтез для арта: [Здесь краткое, яркое описание центрального образа или идеи расклада ОДНИМ предложением на английском языке для генерации изображения. Например: "A lone figure stands at a crossroads under a starry sky, holding a glowing lantern."]`,
        psychologist: `Ты — современный психолог, использующий карты Таро как метафорический инструмент. Отвечай СТРОГО на русском языке.
ЗАПРЕЩЕНО: давать ответы "да" или "нет" и использовать эзотерическую терминологию.
ВСЕГДА:
1.  Подчеркивай, что карты — это отражение внутреннего состояния, а человек — хозяин своей судьбы.
2.  Трактуй карты как архетипы, психологические состояния и паттерны поведения.
3.  Твой стиль — поддерживающий, ясный, сфокусированный на саморефлексии и конкретных действиях.
4.  Форматируй ответ в два блока:
Трактовка: [Здесь твой детальный психологический анализ]
Синтез для арта: [Здесь краткое, яркое описание центрального образа или идеи расклада ОДНИМ предложением на английском языке для генерации изображения. Например: "A person looking at their reflection in a shattered mirror, piecing it back together."]`,
    }
};

function parseLLMResponse(text) {
    const interpretationMatch = text.match(/Трактовка:\s*\[([\s\S]*?)\]/);
    const artPromptMatch = text.match(/Синтез для арта:\s*\[([\s\S]*?)\]/);

    const interpretation = interpretationMatch ? interpretationMatch[1].trim() : text;
    const artPrompt = artPromptMatch ? artPromptMatch[1].trim() : null;

    return { interpretation, artPrompt };
}

async function generateArt(artPrompt) {
    if (!artPrompt || !process.env.OPENAI_API_KEY) {
        return null;
    }
    return null; // Заглушка
}

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

        if (requestData.type === 'spread') {
            const { mode, theme, spreadType, question, cards, positions, context } = requestData;
            if (!cards || Object.keys(cards).length === 0) return { json: async () => ({ error: 'Не обрано жодної карти.' }), status: 400, ok: false };

            systemPrompt = SYSTEM_PROMPTS[lang][mode] || SYSTEM_PROMPTS[lang].psychologist;
            if (positions.length > 1) {
                systemPrompt += " Відповідь має бути строго структурована по пунктах для кожної позиції, без загальної вступної та заключної 'води'.";
            }

            let dynamicContext = '';
            if (context) {
                if (context.morningFlow) {
                    dynamicContext += `\nКонтекст: "Morning Flow" - користувач налаштовується на день, можливо, після йоги або медитації. Трактування має бути надихаючим та м'яким.`;
                }
                if (context.relationshipDynamic && context.partnerName) {
                    dynamicContext += `\nКонтекст: "Динаміка зв'язку" - особливий фокус на партнерстві. Враховуй ім'я партнера: ${context.partnerName}.`;
                }
                if (context.geoEnergy && context.location) {
                    dynamicContext += `\nКонтекст: "Geo-Energy" - враховуй енергію місця. Локація: ${context.location}. Адаптуй трактування під вібрації цього місця (наприклад, домашній затишок, туристична метушня, спокій природи).`;
                }
            }

            userPrompt = `Проведи розбір розкладу Таро.\nТема: ${theme}\nРозклад: ${spreadType}\n`;
            if (question) userPrompt += `Питання: "${question}"\n`;
            if (dynamicContext) userPrompt += `${dynamicContext}\n`;
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

        const rawText = geminiData.candidates[0].content.parts[0].text;
        const { interpretation, artPrompt } = parseLLMResponse(rawText);

        const generatedArtUrl = await generateArt(artPrompt);

        return { json: async () => ({ interpretation, artPrompt, generatedArtUrl }), status: 200, ok: true };

    } catch (error) {
        return { json: async () => ({ error: 'Внутрішня помилка сервера: ' + error.message }), status: 500, ok: false };
    }
}
