import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function generatePDF(proposal: any){
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const existingPdfBytes = fs.readFileSync(path.join(__dirname, '../print/ccbTemplate.pdf'));
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();
    
            form.getTextField('organization').setText(proposal?.organization);
            form.getTextField('dateFiled').setText(!proposal ? new Date().toLocaleDateString() : new Date(proposal.dateFiled).toLocaleDateString());
            form.getTextField('submitter').setText(`${proposal?.lastName}, ${proposal?.firstName} ${proposal?.rank}`);
            form.getTextField('email').setText(proposal?.email);
            form.getTextField('status').setText(!proposal?.status ? "" : JSON.parse(proposal.status).label);
            form.getTextField('priority').setText(proposal?.priority);
            form.getTextField('title').setText(proposal?.title);
            form.getTextField('costSavings').setText(proposal?.costSavings?.toString());
            form.getTextField('timeSavings').setText(proposal?.timeSavings?.toString());
            form.getTextField('missionImpact').setText(!proposal?.missionImpact ? "" : JSON.parse(proposal.missionImpact).text);
            form.getTextField('approvedPi').setText(proposal?.approvedPi);
            form.getTextField('system').setText(proposal?.system);
            form.getTextField('type').setText(!proposal?.type ? "" : JSON.parse(proposal.type).label);
            form.getTextField('category').setText(!proposal?.category ? "" :  JSON.parse(proposal.category).label);
            form.getTextField('problemStatement').setText(!proposal?.problemStatement ? "" : JSON.parse(proposal.problemStatement).text);
            form.getTextField('changeStatement').setText(!proposal?.changeStatement ? "" : JSON.parse(proposal.changeStatement).text);
            form.getTextField('otherConsiderations').setText(!proposal?.otherConsiderations ? "" : JSON.parse(proposal.otherConsiderations).text);
    
            const filledPdfBytes = await pdfDoc.save();
    
            //const base64Pdf = new Blob(filledPdfBytes).toString('base64');
            
    
              //fs.writeFileSync('filled_form.pdf', filledPdfBytes);
            
            //return { url: 'data:application/pdf;base64,' + base64Pdf }
}