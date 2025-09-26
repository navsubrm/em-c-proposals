import { fail } from '@sveltejs/kit';
import { PDFDocument } from 'pdf-lib';
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
	},
	'upload-proposal': async ({ request, platform }) => {
		if (!dataBaseCheck(platform)) return fail(500, { fail: true, connection_error: true });
		if (PROPOSAL_FORM_TEST) await formTest();

		const data = Object.fromEntries(await request.formData());
		const file = data?.proposal_upload as File;
		if (file?.type !== 'application/pdf') return fail(409, { upload_type_error: true });
		const proposalBytes = await file?.arrayBuffer();
		if (!proposalBytes) return fail(500, { fail: true });
		const pdfDoc = await PDFDocument.load(proposalBytes);
		const form = pdfDoc.getForm();

		const newProposal = {
			last_name: form.getTextField('last_name').getText(),
			first_name: form.getTextField('first_name').getText(),
			position: form.getTextField('position').getText(),
			organization: form.getTextField('organization').getText(),
			date_filed: form.getTextField('dateFiled_es_:date').getText(),
			email: form.getTextField('email').getText(),
			status: form.getTextField('status').getText(),
			priority: form.getTextField('priority').getText(),
			title: form.getTextField('title').getText(),
			cost_savings: form.getTextField('costSavings').getText(),
			time_savings: form.getTextField('timeSavings').getText(),
			mission_impact: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('missionImpact').getText() }] }
			}),
			problem_statement: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('problemStatement').getText() }] }
			}),
			change_statement: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('changeStatement').getText() }] }
			}),
			other_considerations: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('otherConsiderations').getText() }] }
			}),
			approved_pi: form.getTextField('approvedPi').getText(),
			system: form.getTextField('system').getText(),
			type: form.getTextField('type').getText(),
			category: form.getTextField('category').getText()
		};

		/**
		 * ! Update this later to include digital signatures. Also, look at pushing the form directly to the database without intervention.
		 */

		return { success: true, ...newProposal };
	}
};
