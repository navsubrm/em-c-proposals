export async function checkTables(platform: App.Platform) {
	return await platform.env.DB.prepare(
		`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table';
        `
	).all();
}
