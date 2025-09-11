import type { Delta } from 'quill';

type SelectInput = { value: string; label: string };

interface QuillInputValue {
	text: string;
	styled: {
		ops: Delta[];
	};
	html: string;
}

interface RequestData {
	poc: FormDataEntryValue | string;
	email: FormDataEntryValue | string;
	rank: FormDataEntryValue | string;
	org: FormDataEntryValue | string;
	'cost-savings': FormDataEntryValue | number;
	'time-savings': FormDataEntryValue | number;
	'other-gains': FormDataEntryValue | QuillInputValue;
	title: FormDataEntryValue | string;
	system: FormDataEntryValue | SelectInput;
	type: FormDataEntryValue | SelectInput;
	category: FormDataEntryValue | SelectInput;
	requestPriority: FormDataEntryValue | SelectInput;
	problem: FormDataEntryValue | QuillInputValue;
	change: FormDataEntryValue | QuillInputValue;
	'mission-impact': FormDataEntryValue | QuillInputValue;
	'other-considerations': FormDataEntryValue | QuillInputValue;
	attachments: FormDataEntryValue | string;
	'date-filed': FormDataEntryValue | Date;
	'date-reviewed': FormDataEntryValue | Date;
	status: FormDataEntryValue | SelectInput;
	'approved-pi': FormDataEntryValue | number;
	'approver-email': FormDataEntryValue | string;
	'approval-comments': FormDataEntryValue | QuillInputValue;
}

interface Error {
	name: string;
	value: boolean;
}

export type { RequestData, Error };
