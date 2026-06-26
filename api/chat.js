// api/chat.js

export async function POST(request) {
    try {
        // 1. Отримуємо дані з фронтенду
        const { theme, spreadType, question, cards, positions } = await request.json();

        if (!cards || Object.keys(cards).length === 0) {
            return new Response(JSON.stringify({ error: 'Не обрано жодної карти.' }), { status: 400 });
        }

        // 2. Формуємо системний промпт для ШІ
        const systemPrompt = `Ти — професійний таролог-психолог. Твоє завдання — дати глибоке, але лаконічне тлумачення розкладу.
- Відповідай СУВОРО українською мовою.
- Аналізуй кожну карту в контексті її позиції.
- Зроби загальний висновок та дай чітку, практичну пораду.
- Уникай "води", езотеричної пафосності та загальних фраз. Будь конкретним та корисним.
- Структуруй відповідь: короткий аналіз кожної позиції, потім загальний висновок і порада.`;

        // 3. Формуємо користувацький промпт на основі даних
        let userPrompt = `Проведи для мене розбір розкладу Таро.\n\n`;
        userPrompt += `🔮 Сфера запиту: ${theme}\n`;
        userPrompt += `📐 Тип розкладу: ${spreadType}\n`;
        if (question) {
            userPrompt += `❓ Моє питання: "${question}"\n`;
        }
        userPrompt += `\n🃏 Випавші карти:\n`;

        positions.forEach(pos => {
            const card = cards[pos];
            if (card) {
                const orientation = card.isInverted ? "Перевернуте" : "Пряме";
                userPrompt += `- Позиція "${pos}": [${card.name}] (${orientation} положення)\n`;
            }
        });

        // 4. Надсилаємо запит до Gemini API
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API-ключ не налаштовано на сервері.' }), { status: 500 });
        }

        const modelName = 'gemini-3.5-flash'; // Використовуємо перевірену модель
        const API_URL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

        const payload = {
            // Нова структура з системною інструкцією
            system_instruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: [{
                parts: [{ text: userPrompt }]
            }]
        };

        const geminiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error("Помилка Gemini API:", errorBody);
            return new Response(JSON.stringify({ error: `Помилка від API Google: ${errorBody}` }), { status: geminiResponse.status });
        }

        const geminiData = await geminiResponse.json();

        if (!geminiData.candidates || !geminiData.candidates[0].content.parts[0].text) {
             return new Response(JSON.stringify({ error: 'ШІ повернув порожню або некоректну відповідь.' }), { status: 500 });
        }

        const responseText = geminiData.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ text: responseText }), { status: 200 });

    } catch (error) {
        console.error("Внутрішня помилка проксі:", error);
        return new Response(JSON.stringify({ error: 'Внутрішня помилка сервера: ' + error.message }), { status: 500 });
    }
}
