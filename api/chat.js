// api/chat.js

const SYSTEM_PROMPTS = {
    mystical: `Ти — професійний таролог, що говорить з позиції класичної езотерики. Відповідай СУВОРО українською мовою. Тлумач карти як знаки долі, енергетичні потоки та духовні уроки. Твій стиль — авторитетний, трохи загадковий, але чіткий. Уникай води.`,
    psychological: `Ти — сучасний психолог, що використовує карти Таро як метафоричний інструмент. Відповідай СУВОРО українською мовою. Тлумач карти як архетипи та психологічні стани. Твій стиль — підтримуючий, ясний, без езотерики. Фокусуйся на конкретних діях.`,
    card_of_the_day: `Ти — мудрий містик. Дай коротку, але глибоку пораду на сьогодні одним-двома реченнями за випавшою картою. Відповідай СУВОРО українською мовою.`
};

const FULL_DECK = ["Дурень", "Маг", "Верховна Жриця", "Імператриця", "Імператор", "Ієрофант", "Закохані", "Колісниця", "Сила", "Відлюдник", "Колесо Фортуни", "Справедливість", "Повішений", "Смерть", "Помірність", "Диявол", "Вежа", "Зірка", "Місяць", "Сонце", "Суд", "Світ", "Туз Жезлів", "Двійка Жезлів", "Трійка Жезлів", "Четвірка Жезлів", "П'ятірка Жезлів", "Шістка Жезлів", "Сімка Жезлів", "Вісімка Жезлів", "Дев'ятка Жезлів", "Десятка Жезлів", "Паж Жезлів", "Лицар Жезлів", "Королева Жезлів", "Король Жезлів", "Туз Кубків", "Двійка Кубків", "Трійка Кубків", "Четвірка Кубків", "П'ятірка Кубків", "Шістка Кубків", "Сімка Кубків", "Вісімка Кубків", "Дев'ятка Кубків", "Десятка Кубків", "Паж Кубків", "Лицар Кубків", "Королева Кубків", "Король Кубків", "Туз Мечів", "Двійка Мечів", "Трійка Мечів", "Четвірка Мечів", "П'ятірка Мечів", "Шістка Мечів", "Сімка Мечів", "Вісімка Мечів", "Дев'ятка Мечів", "Десятка Мечів", "Паж Мечів", "Лицар Мечів", "Королева Мечів", "Король Мечів", "Туз Пентаклів", "Двійка Пентаклів", "Трійка Пентаклів", "Четвірка Пентаклів", "П'ятірка Пентаклів", "Шістка Пентаклів", "Сімка Пентаклів", "Вісімка Пентаклів", "Дев'ятка Пентаклів", "Десятка Пентаклів", "Паж Пентаклів", "Лицар Пентаклів", "Королева Пентаклів", "Король Пентаклів"];

export async function POST(request) {
    try {
        const requestData = await request.json();
        let systemPrompt, userPrompt;

        if (requestData.type === 'card-of-the-day') {
            const randomCard = FULL_DECK[Math.floor(Math.random() * FULL_DECK.length)];
            systemPrompt = SYSTEM_PROMPTS.card_of_the_day;
            userPrompt = `Карта дня: [${randomCard}]. Дай містичну мікро-пораду.`;
        } else if (requestData.type === 'spread') {
            const { mode, theme, spreadType, question, cards, positions } = requestData;
            if (!cards || Object.keys(cards).length === 0) {
                return new Response(JSON.stringify({ error: 'Не обрано жодної карти.' }), { status: 400 });
            }
            systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.psychological;
            userPrompt = `Проведи розбір розкладу Таро.\nТема: ${theme}\nРозклад: ${spreadType}\n`;
            if (question) userPrompt += `Питання: "${question}"\n`;
            userPrompt += `\nКарти:\n`;
            positions.forEach(pos => {
                const card = cards[pos];
                if (card) {
                    const orientation = card.isInverted ? "Перевернута" : "Пряма";
                    userPrompt += `- ${pos}: ${card.name} (${orientation})\n`;
                }
            });
        } else {
            return new Response(JSON.stringify({ error: 'Невірний тип запиту.' }), { status: 400 });
        }

        let fullPrompt = `${systemPrompt}\n\n--- ЗАВДАННЯ ---\n${userPrompt}`;

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API-ключ не налаштовано.' }), { status: 500 });
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const payload = { contents: [{ parts: [{ text: fullPrompt }] }] };

        const geminiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            return new Response(JSON.stringify({ error: `Помилка від API Google: ${errorBody}` }), { status: geminiResponse.status });
        }

        const geminiData = await geminiResponse.json();
        if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
             return new Response(JSON.stringify({ error: 'ШІ повернув порожню відповідь.' }), { status: 500 });
        }

        const responseText = geminiData.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ text: responseText }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Внутрішня помилка сервера: ' + error.message }), { status: 500 });
    }
}
