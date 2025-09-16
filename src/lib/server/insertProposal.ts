export async function insertProposal(
	platform: App.Platform | undefined,
	proposal: App.ProposalRecord
) {
	const result = platform?.env?.DB?.prepare(
		`
        INSERT INTO proposals 
            (_id, 
            last_name, 
            first_name, 
            email, 
            position, 
            organization, 
            cost_savings, 
            time_savings, 
            title, system, 
            type, 
            category, 
            priority, 
            problem_statement,
            change_statement, 
            mission_impact, 
            other_considerations, 
            date_filed, 
            date_approved, 
            status, 
            projected_pi, 
            completed_pi) 
        VALUES (?1, 
            ?2, 
            ?3, 
            ?4, 
            ?5, 
            ?6, 
            ?7, 
            ?8, 
            ?9, 
            ?10, 
            ?11, 
            ?12, 
            ?13, 
            ?14, 
            ?15, 
            ?16, 
            ?17, 
            ?18, 
            ?19, 
            ?20, 
            ?21, 
            ?22)`
	)
		.bind(
			proposal._id,
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
			proposal.date_filed,
			proposal.date_approved,
			proposal.status,
			proposal.projected_pi,
			proposal.completed_pi
		)
		.run();

	return result;
}
