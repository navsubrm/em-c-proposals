export async function load({ platform }) {
	if (!platform?.env?.DB) {
		console.log('Binding not found.');
		return { proposals: [] };
	}

	const tables = await platform.env.DB.prepare(
		"SELECT name FROM sqlite_master WHERE type='table';"
	).all();

	console.log('Tables: ', tables);

	const result = await platform.env.DB.prepare('SELECT * FROM proposals LIMIT 5').run();

	console.log('Result: ', result);

	return {};
}
