import type { props as inputMsg } from '../../../atoms/inputMsg/utils/propTypes.types';

export interface props {
	name: string;
	label: string;
	placeholder: string;
	required: boolean;
	multiple: boolean;
	messages?: inputMsg[];
	items: any[];
	value: string;
	themeBase: string;
}
