import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

app.get('/', (c) => c.text('Hello News on Earth!'))

app.get('/api/', (c) => c.text('This is api!'))

export default app
