import { colorArray } from '$lib/config/colorArray';

export const toolbarOptions = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'],
	['link', 'image', 'video', 'formula'],

	// [{ header: 1 }, { header: 2 }], // custom button values
	[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
	[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	//[{ direction: 'rtl' }], // text direction

	//[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

	[{ color: [...colorArray] }], //, { background: [] }], // dropdown with defaults from theme
	//[{ font: [] }],
	[{ align: [] }]

	// ['clean'] // remove formatting button
];
