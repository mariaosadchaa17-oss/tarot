// api/gemini-proxy.js

// Это бессерверная функция, которая работает как прокси для Gemini API.
// Она ожидает POST-запрос с JSON-телом вида { "prompt": "Текст вашего промпта" }
export default async function handler(request) {
    // Разрешаем только POST-запросы
    if (request.method !== 'POST') {
        return new Response('Метод не разрешен', { status: 405 });
    }

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
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            // Эта ошибка будет показана пользователю, если ключ не установлен на сервере
            return new Response(JSON.stringify({ error: 'API-ключ не настроен на сервере. Обратитесь к администратору.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

        // Формируем тело запроса для Gemini API
        const payload = {
            contents: [{
                parts: [{
                    text: promptText
                }]
            }]
        };

        // Перенаправляем запрос в Gemini API
        const geminiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Обрабатываем ошибки от Gemini API
        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error("Ошибка Gemini API:", errorBody);
            return new Response(JSON.stringify({ error: `Ошибка при запросе к Gemini API. Статус: ${geminiResponse.status}` }), {
                status: geminiResponse.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const geminiData = await geminiResponse.json();

        // Извлекаем сгенерированный текст из ответа
        // Структура: { candidates: [ { content: { parts: [ { text: '...' } ] } } ] }
        const responseText = geminiData.candidates[0].content.parts[0].text;

        // Отправляем успешный ответ обратно клиенту
        return new Response(JSON.stringify({ text: responseText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Внутренняя ошибка прокси:", error);
        return new Response(JSON.stringify({ error: 'Произошла внутренняя ошибка.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
