import { fail } from '@sveltejs/kit';
import { PROPOSAL_FORM_TEST } from '$env/static/private';
import { dataBaseCheck } from '$lib/server/dataBaseCheck.js';
import { formTest } from './utils/formTest';
import { generateProposalObject } from './utils/generateProposalObject';
import { generateProposalUpdateObject } from './utils/generateProposalUpdateObject';
import { updateProposal } from '$lib/server/updateProposal';
import { insertProposal } from '$lib/server/insertProposal';

export async function load({ platform, url }) {
	if (!dataBaseCheck(platform)) return fail(500, { fail: true, connection_error: true });

	if (!url.searchParams.get('id') || url.searchParams.get('id') == '') return {};
	const query = `SELECT * FROM proposals WHERE _id = '${url?.searchParams.get('id')}'`;
	const results = await platform?.env?.DB.prepare(query).run();
	const proposal: App.ProposalRecord = results?.results[0] as App.ProposalRecord;

	return { proposal };
}

export const actions = {
	'new-proposal': async ({ request, platform }) => {
		if (!dataBaseCheck(platform)) return fail(500, { fail: true, connection_error: true });
		if (PROPOSAL_FORM_TEST) await formTest();

		try {
			const formData: FormData = await request.formData();
			const requestData = Object.fromEntries(formData) as App.NewProposalRequestData;
			const proposal = generateProposalObject(requestData);

			const result = await insertProposal(platform, proposal);

			console.log('Result from form submission: ', result);

			return { proposal, success: true };
		} catch (err) {
			console.log('Error from new submission handler: ', err);

			return fail(500, { fail: true, unknown_error: true });
		}
	},
	'edit-proposal': async ({ request, platform }) => {
		if (!dataBaseCheck(platform)) return fail(500, { fail: true, connection_error: true });
		if (PROPOSAL_FORM_TEST) await formTest();

		try {
			const formData: FormData = await request.formData();
			const requestData = Object.fromEntries(formData) as App.NewProposalRequestData;
			const proposal = generateProposalUpdateObject(requestData);

			const result = updateProposal(platform, proposal);

			console.log('Result from form submission: ', result);

			return { proposal, success: true };
		} catch (err) {
			console.log('Error from edit submission handler: ', err);

			return fail(500, { fail: true, unknown_error: true });
		}
	}
};
