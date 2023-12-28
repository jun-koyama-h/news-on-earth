import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello News on Earth!'))

app.get('/api/', (c) => c.text('This is api!'))

export default app
