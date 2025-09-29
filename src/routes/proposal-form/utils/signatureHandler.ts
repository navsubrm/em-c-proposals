import { PDFDocument, PDFName, PDFDict, PDFRawStream } from 'pdf-lib';
import { unzlibSync } from 'fflate';
import { TextDecoder } from 'util';

export interface SignerInfo {
	last_name: string;
	first_name: string;
	DoDID: string;
	time_stamp: Date;
}

//Recursively parse content stream to return text.
function parseXObjectContent(pdfDoc: PDFDocument, dict: PDFDict, context: any, xObjectRef: any) {
	if (!xObjectRef) return '';

	const xObject = context.lookup(xObjectRef, PDFRawStream);
	if (!xObject) return '';

	let content = xObject.getContents();

	const filter = xObject.dict.get(PDFName.of('Filter'));
	if (filter && filter == PDFName.of('FlateDecode')) {
		content = unzlibSync(content);
	}

	const contentString = new TextDecoder().decode(content);
	let fullText = '';

	const tjRegex = /\((.*?)\)Tj/g;
	let match;
	while ((match = tjRegex.exec(contentString)) !== null) {
		const text = match[1];
		fullText += text;
	}

	const xObjectInvocationRegex = /\/([a-zA-Z0-9]+) Do/g;
	const resourcesRef = xObject.dict.get(PDFName.of('Resources'));
	if (resourcesRef) {
		const resourcesDict = context.lookup(resourcesRef, PDFDict);
		const xObjectDictRef = resourcesDict.get(PDFName.of('XObject'));

		if (xObjectDictRef) {
			const xObjectDict = context.lookup(xObjectDictRef, PDFDict);
			let nestedMatch;

			while ((nestedMatch = xObjectInvocationRegex.exec(contentString)) !== null) {
				const nestedXObjectName = nestedMatch[1];
				const nestedXObjectRef = xObjectDict.get(PDFName.of(nestedXObjectName));
				const nestedText = parseXObjectContent(pdfDoc, xObject.dict, context, nestedXObjectRef);
				fullText += nestedText;
			}
		}
	}

	return fullText;
}

//Convert Signature Timestamp to Date
function convertTimestampToDateRegex(timestampString: string): Date {
	const dateRegex =
		/(?<year>\d{4})\.(?<month>\d{2})\.(?<day>\d{2}) (?:\b|T)(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2}) (?<offsetSign>[+-])(?<offsetHour>\d{2})'(?<offsetMinute>\d{2})'/;
	const match = timestampString.match(dateRegex);

	if (!match) return new Date('Invalid Date');

	const { year, month, day, hour, minute, second, offsetSign, offsetHour, offsetMinute } =
		match.groups as { [key: string]: string };

	const isoFormatString = `${year}-${month}-${day}T${hour}:${minute}:${second}${offsetSign}${offsetHour}:${offsetMinute}`;

	return new Date(isoFormatString);
}

function getAndParseSignatureInfo(pdfDoc: PDFDocument, signatureFieldName: string) {
	const context = pdfDoc.context;
	const form = pdfDoc.getForm();

	let signatureFieldDict = null;
	try {
		const field = form.getSignature(signatureFieldName);
		signatureFieldDict = field.acroField.dict;
	} catch (e: unknown) {
		console.error(`Field '${signatureFieldName}' is not a valid signature field.`, e);
		return null;
	}

	if (!signatureFieldDict) return null;

	const apRef = signatureFieldDict.get(PDFName.of('AP'));
	if (!apRef) return null;
	const apDict = context.lookup(apRef, PDFDict);
	const normalAppearanceStreamRef = apDict.get(PDFName.of('N'));

	const allText = parseXObjectContent(
		pdfDoc,
		signatureFieldDict,
		context,
		normalAppearanceStreamRef
	);

	if (allText) {
		const parserRegex = /(.*?)\.(\d{10})Digitally signed by (.*?) Date: (.*)/;
		const matches = allText.match(parserRegex);

		if (matches) {
			const fullSignerName = matches[1];
			const doDid = matches[2];
			const timeStampString = matches[4];

			const nameParts = fullSignerName.split('.');
			const lastName = nameParts[0];
			const firstName = nameParts[1];

			const signerObject: SignerInfo = {
				last_name: lastName,
				first_name: firstName,
				DoDID: doDid,
				time_stamp: convertTimestampToDateRegex(timeStampString)
			};

			return JSON.stringify(signerObject);
		}
	}

	return null;
}

//Get signature by field name
export function processSingleSignature(pdfDoc: PDFDocument, fieldName: string) {
	try {
		const signatureInfo = getAndParseSignatureInfo(pdfDoc, fieldName);

		if (signatureInfo) {
			console.log('Successfully parsed signature data.');
			return signatureInfo;
		} else {
			console.log(`No signature data found for field: ${fieldName}`);
			return null;
		}
	} catch (error) {
		console.error('An error occurred while processing the PDF:', error);
		return null;
	}
}
