import type { props as InputMsg } from '$lib/components/userActions/inputs/inputMsg/utils/props.types';
import type { ToolbarConfig } from 'quill/modules/toolbar';

export interface Props {
	name: string;
	label: string;
	placeholder: string;
	required?: boolean;
	messages?: InputMsg[];
	themeBase: string;
	value: string;
	type?: 'Display' | 'Edit';
	toolbarOptions?: ToolbarConfig;
}

export interface QuillInitInputObject {
	elem: HTMLElement;
	placeholder: string;
	toolbarOptions: ToolbarConfig;
	type: 'Display' | 'Edit';
}
