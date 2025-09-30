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
			//Page 1
			cost_savings: form.getTextField('Projected Cost Savings').getText(),
			first_name: form.getTextField('First Name').getText(),
			last_name: form.getTextField('Last Name').getText(),
			email: form?.getTextField('Email')?.getText() || '',
			organization: form.getTextField('Submitting Organization').getText(),
			position: form.getTextField('Title or Position').getText(),
			time_savings: form.getTextField('Projected Time Savings').getText(),
			title: form.getTextField('Request Title').getText(),
			priority: form.getDropdown('Request Priority').getSelected(),
			associated_system: form.getDropdown('Associated System').getSelected(),
			change_type: form.getDropdown('Change Type').getSelected(),
			change_category: form.getDropdown('Change Category').getSelected(),
			mission_impact_statement: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('Mission Impact').getText() }] }
			}),
			problem_statement: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('Problem Statement').getText() }] }
			}),

			//Page 2
			recommended_solution: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('Recommended Solution').getText() }] }
			}),
			other_considerations: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('Other Considerations').getText() }] }
			}),
			stakeholder_comments: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('Stakeholder Comments').getText() }] }
			}),
			submitter_signature: processSingleSignature(pdfDoc, 'Submitter Signature'),
			stakeholder_signature: processSingleSignature(pdfDoc, 'Stakholder Signature'),
			stakeholder_concur: form.getDropdown('Stakholder Concur').getSelected(),

			//Page 3
			ccb_comments: JSON.stringify({
				styled: { ops: [{ insert: form.getTextField('CCB Comments').getText() }] }
			}),
			ccb_concur: form.getDropdown('CCB Concur').getSelected(),
			ccb_signature: processSingleSignature(pdfDoc, 'CCB Signature'),
			projected_start_pi_number: form.getTextField('Projected StartPI Number').getText(),
			projected_release_oa_number: form.getTextField('Projected Release OA').getText(),
			approved: form.getDropdown('Approved').getSelected(),
			approval_signature: processSingleSignature(pdfDoc, 'Approval Signature')
		};

		return { success: true, ...newProposal };
	}
};
