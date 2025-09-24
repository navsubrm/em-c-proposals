import { fail, type Actions, type RequestEvent } from '@sveltejs/kit';
import { PDFDocument } from 'pdf-lib';
import { TEMPLATE } from '$env/static/private';
import { dataBaseCheck } from '$lib/server/dataBaseCheck';
import { proposalListQuery } from '$lib/server/proposalListQuery';
import { proposalByIdQuery } from '$lib/server/proposalByIdQuery';
import { deleteProposalById } from '$lib/server/deleteProposalById.js';

export async function load({ platform }) {
	if (!dataBaseCheck(platform)) return { proposals: [] };
	return { proposals: await proposalListQuery(platform) };
}

export const actions: Actions = {
	returnPDF: async ({ request, platform }: RequestEvent) => {
		try {
			if (!dataBaseCheck(platform)) return fail(500, { fail: true, connection_error: true });

			const data = Object.fromEntries(await request.formData());
			const results = await proposalByIdQuery(platform, data.id);
			const proposal: App.ProposalRecord = results?.results[0] as App.ProposalRecord;
			const existingPdfBytes: ArrayBuffer | undefined = await platform?.env.ASSETS.fetch(
				TEMPLATE
			).then((res) => res.arrayBuffer());

			if (!existingPdfBytes) return fail(500, { fail: true });

			const pdfDoc = await PDFDocument.load(existingPdfBytes);
			const form = pdfDoc.getForm();
			const date_filed = new Date(proposal?.date_filed || '').toLocaleDateString();
			const submitter = `${proposal?.last_name}, ${proposal?.first_name} ${proposal?.position}`;
			const mission_impact = !proposal?.mission_impact ? '' : JSON.parse(proposal.mission_impact);
			const problem = !proposal.problem_statement ? '' : JSON.parse(proposal.problem_statement);
			const change = !proposal.change_statement ? '' : JSON.parse(proposal.change_statement);
			const other = !proposal.other_considerations ? '' : JSON.parse(proposal.other_considerations);

			/**
			 *  !! You will need to write a function that takes the ops array and converts it to styled content with the draw functions of pdf-lib.
			 */

			form.getTextField('organization').setText(proposal?.organization);
			form.getTextField('dateFiled_es_:date').setText(date_filed);
			form.getTextField('submitter').setText(submitter);
			form.getTextField('email').setText(proposal?.email);
			form.getTextField('status').setText(proposal?.status);
			form.getTextField('priority').setText(proposal?.priority);
			form.getTextField('title').setText(proposal?.title);
			form.getTextField('costSavings').setText(proposal?.cost_savings?.toString());
			form.getTextField('timeSavings').setText(proposal?.time_savings?.toString());
			form.getTextField('missionImpact').setText(mission_impact?.text || '');
			form.getTextField('approvedPi').setText(proposal?.projected_pi?.toString());
			form.getTextField('system').setText(proposal?.system);
			form.getTextField('type').setText(proposal?.type);
			form.getTextField('category').setText(proposal?.category);
			form.getTextField('problemStatement').setText(problem?.text || '');
			form.getTextField('changeStatement').setText(change?.text || '');
			form.getTextField('otherConsiderations').setText(other?.text || '');

			const filledPdfBytes = await pdfDoc.saveAsBase64();

			return { id: proposal?._id, file: filledPdfBytes };
		} catch (err) {
			console.log('Error from returnPDF: ', err);
			fail(500, { fail: true, unknown_error: true });
		}
	},
	delete: async ({ request, platform }) => {
		try {
			if (!dataBaseCheck(platform)) return fail(500, { fail: true, connection_error: true });
			const data = Object.fromEntries(await request.formData());
			const results = await deleteProposalById(platform, data.id);

			return { results };
		} catch (err) {
			console.log(err);
			fail(500, { fail: true, unknown_error: true });
		}
	}
};
