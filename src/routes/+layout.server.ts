import { IS_DEV } from '$env/static/private';
import { checkProposalTableColumns } from '$lib/config/checkProposalTableColumns.js';
import { checkTables } from '$lib/server/checkTables.js';

export async function load({ platform }) {
	if (IS_DEV) {
		if (!platform?.env?.DB) return console.error('DB CONNECT NOT FOUND.');
		const tables = await checkTables(platform);
		const proposalColumns = await checkProposalTableColumns(platform);
		const initString = `You are in DEV mode using ${tables.meta.served_by} with the following tables, ' ${tables.results.map((el) => el.name).join(', ')}`;

		console.log(
			`Tables: ${tables.results.map((el) => el.name).join(', ')}, Proposal Columns: ${proposalColumns.results.map((el) => el.name).join(', ')}`
		);
		return { initString };
	}
}
