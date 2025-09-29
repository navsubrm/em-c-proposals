import { fail } from '@sveltejs/kit';
import { PDFDocument } from 'pdf-lib';
import { processSingleSignature } from './utils/signatureHandler';
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
			cost_savings: form.getTextField('dollars per year').getText(),
			first_name: form.getTextField('first_name').getText(),
			last_name: form.getTextField('last_name').getText(),
			// email: form?.getTextField('email')?.getText() || '',
			organization: form.getTextField('organization_name').getText(),
			position: form.getTextField('organization_title_rank').getText(),
			time_savings: form.getTextField('time_savings').getText(),
			title: form.getTextField('request_title').getText(),
			priority: form.getDropdown('priority').getSelected(),
			associated_system: form.getDropdown('associated_system').getSelected(),
			change_type: form.getDropdown('change_type').getSelected(),
			change_category: form.getDropdown('change_category').getSelected(),
			mission_impact_statement: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('mission_impact_statement').getText() }] }
			}),
			recommended_solution: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('recommended_solution').getText() }] }
			}),
			other_considerations: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('other_considerations').getText() }] }
			}),
			stakeholder_comments: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('stakeholder_comments').getText() }] }
			}),
			submitter_signature: processSingleSignature(pdfDoc, 'submitter_signature'),
			stakeholder_signature: processSingleSignature(pdfDoc, 'stakholder_signature'),
			stakeholder_concur: form.getDropdown('stakholder_concur').getSelected(),
			ccb_comments: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('ccb_comments').getText() }] }
			}),
			ccb_concur: form.getDropdown('ccb_concur').getSelected(),
			ccb_signature: processSingleSignature(pdfDoc, 'ccb_signature'),
			projected_start_pi_number: form.getTextField('projected_start_pi_number').getText(),
			projected_release_oa_number: form.getTextField('projected_release_oa_number').getText(),
			road_map_approval: processSingleSignature(pdfDoc, 'road_map_approval'),
			date_submitted: form.getTextField('date_submitted').getText()
			// problem_statement: JSON.stringify({
			// 	styled: { ops: [{ insert: form.getTextField('problem_statement').getText() }] }
			// })
		};

		return { success: true, ...newProposal };
	}
};
