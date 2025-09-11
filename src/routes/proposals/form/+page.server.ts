import { fail } from '@sveltejs/kit';

const dev = false;

export async function load() {
	return {};
}

export const actions = {
	'new-proposal': async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			return {
				fail: true,
				connection_error: true
			};
		}

		const formData: FormData = await request.formData();
		const requestData = Object.fromEntries(formData);

		/**
		 * !! Add validators here for each property.
		 */
		const proposal: App.NewProposalRequestData = {
			_id: !requestData?._id ? crypto.randomUUID() : requestData?._id,
			last_name: requestData.last_name.toString(),
			first_name: requestData.first_name.toString(),
			email: requestData.email.toString(),
			position: requestData.position.toString(),
			organization: requestData.organization.toString(),
			cost_savings: Number(requestData.cost_savings.toString()),
			time_savings: Number(requestData.time_savings.toString()),
			title: requestData.title.toString(),
			system: JSON.parse(requestData.system.toString()).value,
			type: JSON.parse(requestData.type.toString()).value,
			category: JSON.parse(requestData.category.toString()).value,
			priority: JSON.parse(requestData.priority.toString()).value,
			problem_statement: requestData.problem_statement.toString(),
			change_statement: requestData.change_statement.toString(),
			mission_impact: requestData.mission_impact.toString(),
			other_considerations: requestData.other_considerations.toString(),
			date_filed: new Date().toUTCString(),
			date_approved: null,
			status: 'Filed',
			projected_pi: null,
			completed_pi: null
		};

		console.log('Proposal Content: ', proposal);

		if (dev) {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			return fail(409, {
				success: true,
				fail: true,
				first_name_missing: true,
				last_name_missing: true,
				email_missing: true,
				position_missing: true,
				organization_missing: true,
				cost_savings_missing: true,
				time_savings_missing: true,
				title_missing: true,
				system_missing: true,
				type_missing: true,
				category_missing: true,
				priority_missing: true,
				problem_statement_missing: true,
				change_statement_missing: true,
				mission_impact_missing: true,
				other_considerations_missing: true,
				unknown_error: true,
				connection_error: true,
				...proposal
			});
		}

		/**
		 * ?? Handle validations for length, sanitization, and accuracy with individual functions.
		 */

		try {
			const result = await platform.env.DB.prepare(
				`INSERT INTO proposals (_id, last_name, first_name, email, position, organization, cost_savings, time_savings, title, system, type, category, priority, problem_statement, change_statement, mission_impact, other_considerations, date_filed, date_approved, status, projected_pi, completed_pi) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22)`
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

			console.log('Result from form submission: ', result);

			return { proposal, success: true };
		} catch (err) {
			console.log('Error from new submission handler: ', err);

			return fail(500, { fail: true, unknown_error: true });
		}
	}
};
