import { fail, type ActionFailure } from '@sveltejs/kit';

type ErrorResponse = {
	success: boolean;
	first_name_missing: boolean;
	last_name_missing: boolean;
	email_missing: boolean;
};

const dev = true;

export async function newSubmissionHandler(
	requestData: RequestData
): Promise<RequestData | ActionFailure<ErrorResponse>> {
	//const client = new ConvexHttpClient(PUBLIC_CONVEX_URL!);

	if (dev) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		return fail(409, {
			success: true,
			first_name_missing: true,
			last_name_missing: true,
			email_missing: true
		});
	} else {
		const proposal: RequestData = {
			last_name: requestData.last_name.toString(),
			first_name: requestData.first_name.toString(),
			email: requestData.email.toString(),
			position: requestData.position.toString(),
			organization: requestData.organization.toString(),
			cost_savings: Number(requestData.cost_savings.toString()),
			time_savings: Number(requestData.time_savings.toString()),
			title: requestData.title.toString(),
			system: requestData.system.toString(),
			type: requestData.type.toString(),
			category: requestData.category.toString(),
			priority: requestData.priority.toString(),
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

		console.log('Proposal: ', proposal);

		//const result = await client.mutation(api.proposals.postProposal, { ...proposal });

		//console.log('Result from form submission: ', result);

		return requestData satisfies RequestData;
	}
}
