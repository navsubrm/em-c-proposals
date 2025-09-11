import type { QuillInitInputObject } from './props.types';
import Quill from 'quill';
import type { Delta } from 'quill';
import DOMPurify from 'dompurify';

export default class QuillInit {
	input: QuillInitInputObject;
	editor: Quill;
	value: string;

	constructor(input: QuillInitInputObject, value: string) {
		this.input = $state(input);
		this.editor = $state(
			new Quill(this.input.elem, {
				readOnly: this.input.type == 'Display' ? true : false,
				modules: {
					toolbar: this.input.toolbarOptions
				},
				placeholder: this.input.placeholder,
				theme: 'snow'
			})
		);
		this.value = $state(value);
		this.editorInit();
	}

	editorInit() {
		if (this.value) this.editor.setContents(JSON.parse(this.value).styled);

		this.editor.on('text-change', (delta: Delta, oldDelta: Delta, source: string) => {
			let answer = false;
			if (source == 'api')
				answer = confirm(
					'The record has been updated on the server, would you like to see the updates?  Your changes will be lost.'
				);
			if (source == 'user' || answer)
				this.value = JSON.stringify({
					styled: this.editor.getContents(),
					html: DOMPurify.sanitize(this.editor.getSemanticHTML().replaceAll('&nbsp;', ' '))
				});

			console.log('Updated Value: ', this.value);
		});
	}
}
