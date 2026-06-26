// api/gemini-proxy.js

export async function POST(request) {
    try {
        const body = await request.json();
        const promptText = body.prompt;

        if (!promptText) {
            return new Response(JSON.stringify({ error: 'Текст промпта отсутствует' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API-ключ не настроен на сервере.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // ПОБЕДА! Используем правильное имя модели из списка, который мы получили.
        const modelName = 'gemini-3.5-flash';
        const API_URL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

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
            return new Response(JSON.stringify({ error: `Ошибка от API Google: ${errorBody}` }), {
                status: geminiResponse.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const geminiData = await geminiResponse.json();

        if (!geminiData.candidates || !geminiData.candidates[0].content || !geminiData.candidates[0].content.parts[0].text) {
             return new Response(JSON.stringify({ error: 'ИИ вернул пустой или некорректный ответ.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

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
