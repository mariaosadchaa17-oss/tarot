// api/list-models.js
// Это временный файл для диагностики.
// Он покажет нам, какие именно модели Gemini доступны для твоего API-ключа.

export async function GET(request) {
    try {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API-ключ не настроен на сервере.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Используем стабильную v1 для запроса списка моделей
        const API_URL = `https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`;

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.text();
            return new Response(JSON.stringify({ error: `Ошибка от API Google: ${errorBody}` }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const data = await response.json();

        // Возвращаем ответ как есть, чтобы увидеть полный список
        return new Response(JSON.stringify(data, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Внутренняя ошибка:", error);
        return new Response(JSON.stringify({ error: 'Произошла внутренняя ошибка: ' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
