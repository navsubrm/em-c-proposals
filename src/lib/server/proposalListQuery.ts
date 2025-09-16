export async function proposalListQuery(platform: App.Platform | undefined) {
	return await platform?.env?.DB?.prepare(
		`
		SELECT * 
		FROM proposals
		`
	).run();
}
