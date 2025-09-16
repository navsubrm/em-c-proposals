export async function updateProposal(
	platform: App.Platform | undefined,
	proposal: App.ProposalRecord
) {
	const result = await platform?.env.DB.prepare(
		`
        UPDATE proposals 
        SET last_name = ?, 
            first_name = ?, 
            email = ?, 
            position = ?, 
            organization = ?, 
            cost_savings = ?, 
            time_savings = ?, 
            title = ?, 
            system = ?, 
            type = ?, 
            category = ?, 
            priority = ?, 
            problem_statement = ?, 
            change_statement = ?, 
            mission_impact = ?, 
            other_considerations = ? 
        WHERE _id = ?`
	)
		.bind(
			proposal.last_name,
			proposal.first_name,
			proposal.email,
			proposal.position,
			proposal.organization,
			proposal.cost_savings,
			proposal.time_savings,
			proposal.title,
			proposal.system,
			proposal.type,
			proposal.category,
			proposal.priority,
			proposal.problem_statement,
			proposal.change_statement,
			proposal.mission_impact,
			proposal.other_considerations,
			proposal._id
		)
		.run();

	return result;
}
