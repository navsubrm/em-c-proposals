export async function checkProposalTableColumns(platform: App.Platform) {
	return await platform.env.DB.prepare('PRAGMA table_xinfo("proposals");').all();
}
