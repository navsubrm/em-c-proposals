import type { props as message } from '$lib/components/userActions/inputs/inputMsg/utils/props.types';

export interface Props {
	name: string;
	label: string;
	placeholder: string;
	type: string;
	min?: number;
	max?: number;
	step?: number;
	required: boolean;
	messages?: message[];
	value?: string | null;
	themeBase: string;
	multiple?: boolean;
}
