import type { props as inputMsg } from '$lib/components/userActions/inputs/inputMsg/utils/props.types';

export interface props {
	name: string;
	label: string;
	required?: boolean;
	messages?: inputMsg[];
	themeBase: string;
}
