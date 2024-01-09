import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Ai } from '@cloudflare/ai';

type Bindings = {
    AI: any;
    NEWS_API_KEY: string;
};

export interface Env {
    AI: any;
    NEWS_API_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors());

app.get('/', (c) => c.text('Hello News on Earth!'));

app.get('/api/', (c) => c.text('This is api!'));

app.post('/api/translate/', async (c) => {
    try {
        const requestJson = await c.req.json();
        if (!requestJson) {
            return c.text('必須パラメータが見つかりません', 400);
        }

        const ai = new Ai(c.env.AI);

        const translateText = requestJson.translateText

        const result = await ai.run('@cf/meta/m2m100-1.2b', {
            text: translateText,
            source_lang: "japanese",
            target_lang: "english"
        });

        console.log(JSON.stringify(result));

        return c.text(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        return c.text('エラー', 500);
    }
});

app.post('/api/news/', async (c) => {
    try {
        const requestJson = await c.req.json();
        if (!requestJson) {
            return c.text('必須パラメータが見つかりません', 400);
        }

        const apiUrl = 'https://newsapi.org/v2/everything';
        const params = {
            q: requestJson.q,
            from: requestJson.from,
            domains: requestJson.domains,
            sortBy: 'popularity',
            apiKey: c.env.NEWS_API_KEY,
        };

        const queryString = new URLSearchParams(params).toString();
        const urlWithParams = `${apiUrl}?${queryString}`;

        const response = await fetch(urlWithParams, {
            headers: {
                'User-Agent': 'news-on-earth',
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            const responseData = await response.json();
            return c.text(JSON.stringify(responseData));
        } else {
            const responseData = await response.json();
            console.log(JSON.stringify(responseData));
            return c.text('エラー1:' + JSON.stringify(response), 500);
        }
    } catch (error) {
        console.log(error);
        return c.text('エラー2', 500);
    }
});

app.post('/api/suggest/', async (c) => {
    try {
        const requestJson = await c.req.json();
        if (!requestJson) {
            return c.text('必須パラメータが見つかりません', 400);
        }

        const ai = new Ai(c.env.AI);

        // JavaScriptで文字列結合
        const promptKeyword = `「${requestJson.keyword}」の次の検索ワードを日本語のみで5個返してください。`;
        const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
            prompt: promptKeyword
          }
        );
        // パースしたJSONデータからkeywordプロパティを抽出
        const responseData = JSON.parse(JSON.stringify(response));
        return c.json(responseData);
    } catch (error) {
        console.error(error);
        return c.text('エラー', 500);
    }
});
export default app;
