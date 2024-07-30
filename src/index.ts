import { Hono } from 'hono';

export interface Env {
	DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	return c.text('Hello World! Im DAVID!');
});

app.get('/essay-list', async (c) => {
	return c.text('essay list');
});

app.get('/essay/:id', async (c) => {
	const data = await c.env.DB.prepare('SELECT * FROM Essays WHERE EssayId = ?').bind(c.req.param('id')).all();
	// console.log(data);

	const essays = data.results;

	console.log(essays);

	const id: string = c.req.param('id');
	return c.text(`${JSON.stringify(essays)}` + id);
});

export default app;
