export async function proposalByIdQuery(
	platform: App.Platform | undefined,
	id: FormDataEntryValue
) {
	return await platform?.env?.DB.prepare(
		`
		SELECT * 
		FROM proposals 
		WHERE _id = '${id}'
		`
	).run();
}
