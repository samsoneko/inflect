import fs from 'fs/promises';
import path from 'path';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { language, set, file, id } = params;

	const filePath = path.resolve(`src/lib/data/${language}/res/${set}/${file}`);
	try {
		const file = await fs.readFile(filePath, 'utf-8');
		const json = JSON.parse(file);

		let entry;
		if (id === 'random') {
			const keys = Object.keys(json);
			const randomKey = keys[Math.floor(Math.random() * keys.length)];
			entry = json[randomKey];
		} else {
			entry = json[id];
		}

		if (!entry) return new Response('Not Found', { status: 404 });
		return new Response(JSON.stringify(entry), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error(err);
		return new Response('Error', { status: 500 });
	}
}