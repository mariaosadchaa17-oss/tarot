// api/chat.js

// Системні інструкції для різних режимів
const SYSTEM_PROMPTS = {
    mystical: `Ти — професійний таролог, що говорить з позиції класичної езотерики.
- Твоя мова — виключно українська.
- Тлумач карти як знаки долі, енергетичні потоки та духовні уроки.
- Зроби короткий аналіз кожної позиції, а потім — загальний висновок та прогноз.
- Твій стиль — авторитетний, трохи загадковий, але чіткий. Уникай води.`,

    psychological: `Ти — сучасний психолог, що використовує карти Таро як метафоричний інструмент для самоаналізу за Юнгом.
- Твоя мова — виключно українська.
- Тлумач карти як архетипи, психологічні стани та моделі поведінки.
- Зроби короткий аналіз кожної позиції, а потім — загальний висновок та практичну пораду для роботи над собою.
- Твій стиль — підтримуючий, ясний, без езотерики. Фокусуйся на конкретних діях та внутрішніх змінах.`
};

export async function POST(request) {
    try {
        // 1. Отримуємо дані з фронтенду
        const { mode, theme, spreadType, question, cards, positions } = await request.json();

        if (!cards || Object.keys(cards).length === 0) {
            return new Response(JSON.stringify({ error: 'Не обрано жодної карти.' }), { status: 400 });
        }

        // 2. Вибираємо системний промпт залежно від режиму
        const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.psychological;

        // 3. Формуємо користувацький промпт
        let userPrompt = `Проведи розбір розкладу Таро.\n\n`;
        userPrompt += `Тема: ${theme}\n`;
        userPrompt += `Розклад: ${spreadType}\n`;
        if (question) userPrompt += `Питання: "${question}"\n`;
        userPrompt += `\nКарти:\n`;
        positions.forEach(pos => {
            const card = cards[pos];
            if (card) {
                const orientation = card.isInverted ? "Перевернута" : "Пряма";
                userPrompt += `- ${pos}: ${card.name} (${orientation})\n`;
            }
        });

        // 4. Надсилаємо запит до Gemini API
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API-ключ не налаштовано.' }), { status: 500 });
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const payload = {
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: userPrompt }] }]
        };

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
