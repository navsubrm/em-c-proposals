export async function deleteProposalById(
	platform: App.Platform | undefined,
	id: FormDataEntryValue
) {
	return await platform?.env?.DB?.prepare(
		`
        DELETE 
        FROM proposals 
        WHERE _id = ?`
	)
		.bind(id)
		.run();
}
