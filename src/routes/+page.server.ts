export async function load({ platform }) {
	if (!platform?.env?.DB) {
		console.log('Binding not found.');
		return { proposals: [] };
	}

	const tables = await platform.env.DB.prepare('SELECT sqlite_version() AS version').all();

	console.log('Tables: ', tables);

	const result = await platform.env.DB.prepare('SELECT * FROM proposals LIMIT 5').run();

	console.log('Result: ', result);

	return {};
}
