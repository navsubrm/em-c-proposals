import type { props as message } from '$lib/components/userActions/inputs/inputMsg/utils/props.types';

export interface Props {
	name: string;
	label: string;
	placeholder: string;
	required: boolean;
	messages?: message[];
	checked?: boolean | null;
	themeBase: string;
}
