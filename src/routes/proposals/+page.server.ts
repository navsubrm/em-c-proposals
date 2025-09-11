import { PDFDocument } from 'pdf-lib';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export async function load({ platform }) {
	if (!platform?.env?.DB) return { proposals: [] };
	return { proposals: await platform.env.DB.prepare('SELECT * FROM proposals ').run() };
}

export const actions = {
	returnPDF: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());

		const proposal = {};
		// const proposal = await client.query(api.proposals.getProposalById, {
		// 	proposalId: data.id as Id<'proposals'>
		// });
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const existingPdfBytes = fs.readFileSync(path.join(__dirname, './utils/ccbTemplate.pdf'));
		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const form = pdfDoc.getForm();

		const dateFiled = new Date(proposal?.dateFiled || '').toLocaleDateString();
		const submitter = `${proposal?.lastName}, ${proposal?.firstName} ${proposal?.rank}`;
		const status = JSON.parse(proposal?.status || '');
		const priority = JSON.parse(proposal?.priority || '');
		const missionImpact = JSON.parse(proposal?.missionImpact || '');
		const system = JSON.parse(proposal?.system || '');
		const type = JSON.parse(proposal?.type || '');
		const category = JSON.parse(proposal?.category || '');
		const problemStatement = JSON.parse(proposal?.problemStatement || '');
		const changeStatement = JSON.parse(proposal?.changeStatement || '');
		const otherConsiderations = JSON.parse(proposal?.otherConsiderations || '');

		form.getTextField('organization').setText(proposal?.organization);
		form.getTextField('dateFiled').setText(dateFiled);
		form.getTextField('submitter').setText(submitter);
		form.getTextField('email').setText(proposal?.email);
		form.getTextField('status').setText(status?.label || '');
		form.getTextField('priority').setText(priority?.label || '');
		form.getTextField('title').setText(proposal?.title);
		form.getTextField('costSavings').setText(proposal?.costSavings?.toString());
		form.getTextField('timeSavings').setText(proposal?.timeSavings?.toString());
		form.getTextField('missionImpact').setText(missionImpact?.text || '');
		form.getTextField('approvedPi').setText(proposal?.approvedPi);
		form.getTextField('system').setText(system?.label || '');
		form.getTextField('type').setText(type?.label || '');
		form.getTextField('category').setText(category?.label || '');
		form.getTextField('problemStatement').setText(problemStatement?.text || '');
		form.getTextField('changeStatement').setText(changeStatement?.text || '');
		form.getTextField('otherConsiderations').setText(otherConsiderations?.text || '');

		const filledPdfBytes = await pdfDoc.saveAsBase64();

		return { id: proposal?._id, file: filledPdfBytes };
	}
};
