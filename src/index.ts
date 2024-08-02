import { Hono } from 'hono';
import { cors } from 'hono/cors';

export interface Env {
	DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.use(cors());

app.get('/', async (c) => {
	return c.text('Hello World! Im DAVID!');
});

app.get('/essay-list', async (c) => {
	const data = await c.env.DB.prepare('SELECT EssayId, EssayTitle from Essays').all();
	return c.text(JSON.stringify(data.results));
});

app.get('/essay/:id', async (c) => {
	const data = await c.env.DB.prepare('SELECT * FROM Essays WHERE EssayId = ?').bind(c.req.param('id')).all();
	// console.log(data);

	const essays = data.results;

	console.log(essays);

	return c.text(JSON.stringify(essays));
});

export default app;
