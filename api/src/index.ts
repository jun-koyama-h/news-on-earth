import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Ai } from '@cloudflare/ai';

type Bindings = {
    AI: any;
};

export interface Env {
    AI: any;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors());

app.get('/', (c) => c.text('Hello News on Earth!'));

app.get('/api/', (c) => c.text('This is api!'));

app.post('/api/translate/', async (c) => {
    try {
        const requestJson = await c.req.json();
        if (!requestJson) {
            return c.text('必須パラメータが見つかりません: text', 400);
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

export default app;
