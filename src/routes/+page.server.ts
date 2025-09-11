export async function load({ platform }) {
	if (!platform?.env?.DB) {
		console.log('Binding not found.');
		return { proposals: [] };
	}

	//const result = await platform.env.DB.prepare('SELECT * FROM proposals LIMIT 5').run();

	//return { initString: IS_DEV ? (await parent()).initString : null };

	return {};
}
