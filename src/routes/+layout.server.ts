import { IS_DEV } from '$env/static/private';

export async function load({ platform }) {
	if (IS_DEV) {
		if (!platform?.env?.DB) return console.error('DB CONNECT NOT FOUND.');
		const tables = await platform.env.DB.prepare(
			"SELECT name FROM sqlite_master WHERE type='table';"
		).all();
		//const proposalsInfo = await platform.env.DB.prepare('PRAGMA table_xinfo("proposals");').all();

		//console.log(proposalsInfo);

		const initString = `You are in DEV mode using ${tables.meta.served_by} with the following tables, ' ${tables.results.map((el) => el.name).join(', ')}`;

		return { initString };
	}
}
