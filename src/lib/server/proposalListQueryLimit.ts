export async function proposalListQueryLimit(platform: App.Platform | undefined, limit: number) {
	return await platform?.env?.DB?.prepare(
		`
		SELECT * 
		FROM proposals
        LIMIT ${limit}
		`
	).run();
}
