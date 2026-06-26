// api/gemini-proxy.js

// ИЗМЕНЕНО: Экспортируем именованную функцию POST, чтобы использовать Web API стандарт в Vercel.
export async function POST(request) {
    // Проверка на POST-метод больше не нужна, Vercel сделает это за нас.

    try {
        const body = await request.json();
        const promptText = body.prompt;

        if (!promptText) {
            return new Response(JSON.stringify({ error: 'Текст промпта отсутствует' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ВАЖНО: Получаем API-ключ из переменных окружения на стороне сервера
        // Убедись, что ты добавила GEMINI_API_KEY в настройках проекта на Vercel!
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API-ключ не настроен на сервере. Обратитесь к администратору.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ИСПРАВЛЕНО: Указываем точное имя модели 'gemini-1.5-flash' вместо '...-latest'
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const payload = {
            contents: [{
                parts: [{
                    text: promptText
                }]
            }]
        };

        const geminiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error("Ошибка Gemini API:", errorBody);
            return new Response(JSON.stringify({ error: `Ошибка при запросе к Gemini API. Статус: ${geminiResponse.status}` }), {
                status: geminiResponse.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const geminiData = await geminiResponse.json();
        const responseText = geminiData.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ text: responseText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Внутренняя ошибка прокси:", error);
        return new Response(JSON.stringify({ error: 'Произошла внутренняя ошибка: ' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
