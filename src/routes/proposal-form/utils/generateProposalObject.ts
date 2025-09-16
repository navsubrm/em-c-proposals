export function generateProposalObject(
	requestData: App.NewProposalRequestData
): App.ProposalRecord {
	/**
	 * ?? Handle validations for length, sanitization, and accuracy with individual functions.
	 */

	const id = crypto.randomUUID();
	const last_name = requestData.last_name.toString();
	const first_name = requestData.first_name.toString();
	const email = requestData.email.toString();
	const position = requestData.position.toString();
	const organization = requestData.organization.toString();
	const cost_savings = Number(requestData.cost_savings.toString());
	const time_savings = Number(requestData.time_savings.toString());
	const title = requestData.title.toString();
	const system = JSON.parse(requestData.system.toString()).value;
	const type = JSON.parse(requestData.type.toString()).value;
	const category = JSON.parse(requestData.category.toString()).value;
	const priority = JSON.parse(requestData.priority.toString()).value;
	const problem_statement = requestData.problem_statement.toString();
	const change_statement = requestData.change_statement.toString();
	const mission_impact = requestData.mission_impact.toString();
	const other_considerations = requestData.other_considerations.toString();
	const date_filed = new Date().toUTCString();

	const proposal: App.ProposalRecord = {
		_id: id,
		last_name,
		first_name,
		email,
		position,
		organization,
		cost_savings,
		time_savings,
		title,
		system,
		type,
		category,
		priority,
		problem_statement,
		change_statement,
		mission_impact,
		other_considerations,
		date_filed,
		date_approved: null,
		status: 'Filed',
		projected_pi: null,
		completed_pi: null
	};

	return proposal;
}
