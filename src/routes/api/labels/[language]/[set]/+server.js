import fs from 'fs/promises';
import path from 'path';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const { language, set } = params;

    const filePath = path.resolve(`src/lib/data/${language}/res/${set}/labels.json`);
    try {
        const file = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(file);

        if (!json) return new Response('Not Found', { status: 404 });
        return new Response(JSON.stringify(json), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        return new Response('Error', { status: 500 });
    }
}