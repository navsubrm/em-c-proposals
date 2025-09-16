import { fail } from '@sveltejs/kit';

export async function formTest() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return fail(409, {
		success: false,
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
		connection_error: true
	});
}
