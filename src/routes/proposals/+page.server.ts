import { fail } from '@sveltejs/kit';
import { PDFDocument } from 'pdf-lib';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export async function load({ platform }) {
	if (!platform?.env?.DB) return { proposals: [] };
	return { proposals: await platform.env.DB.prepare('SELECT * FROM proposals').run() };
}

export const actions = {
	returnPDF: async ({ request, platform }) => {
		if (!platform?.env?.DB) {
			console.log('PDF Create failed.');
			return fail(500, { fail: true, connection_error: true });
		}
		const data = Object.fromEntries(await request.formData());

		const results = await platform.env.DB.prepare(
			`SELECT * FROM proposals WHERE _id = '${data.id}'` //"SELECT id, name FROM customers WHERE name = ?"
		).run();

		const proposal = results.results[0];

		//console.log('Proposal from create PDF: ', proposal);

		// const __filename = fileURLToPath(import.meta.url);
		// const __dirname = path.dirname(__filename);
		// const existingPdfBytes = fs.readFileSync(path.join(__dirname, './utils/ccbTemplate.pdf'));

		const formUrl = '/templates/ccbTemplate.pdf';

		const existingPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const form = pdfDoc.getForm();
		const date_filed = new Date(proposal?.date_filed || '').toLocaleDateString();
		const submitter = `${proposal?.last_name}, ${proposal?.first_name} ${proposal?.position}`;
		const mission_impact = !proposal?.mission_impact ? '' : JSON.parse(proposal.mission_impact);
		const problem_statement = !proposal.problem_statement
			? ''
			: JSON.parse(proposal.problem_statement);

		const change_statement = !proposal.change_statement
			? ''
			: JSON.parse(proposal.change_statement);
		const other_considerations = !proposal.other_considerations
			? ''
			: JSON.parse(proposal.other_considerations);

		/**
		 *
		 * !! You will need to write a function that takes the ops array and converts it to styled content with the draw functions of pdf-lib.
		 */

		form.getTextField('organization').setText(proposal?.organization);
		form.getTextField('dateFiled').setText(date_filed);
		form.getTextField('submitter').setText(submitter);
		form.getTextField('email').setText(proposal?.email);
		form.getTextField('status').setText(proposal?.status);
		form.getTextField('priority').setText(proposal?.priority);
		form.getTextField('title').setText(proposal?.title);
		form.getTextField('costSavings').setText(proposal?.cost_savings?.toString());
		form.getTextField('timeSavings').setText(proposal?.time_savings?.toString());
		form.getTextField('missionImpact').setText(mission_impact?.text || '');
		form.getTextField('approvedPi').setText(proposal?.approved_pi);
		form.getTextField('system').setText(proposal?.system);
		form.getTextField('type').setText(proposal?.type);
		form.getTextField('category').setText(proposal?.category);
		form.getTextField('problemStatement').setText(problem_statement?.html || '');
		form.getTextField('changeStatement').setText(change_statement?.html || '');
		form.getTextField('otherConsiderations').setText(other_considerations?.html || '');

		const filledPdfBytes = await pdfDoc.saveAsBase64();

		return { id: proposal?._id, file: filledPdfBytes };
	}
};
