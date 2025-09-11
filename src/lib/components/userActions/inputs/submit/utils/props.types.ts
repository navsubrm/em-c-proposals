export interface props {
	label: string;
	processingLabel: string;
	failLabel: string;
	successLabel: string;
	formaction?: string;
	formtarget?: string;
	processing: boolean;
	fail: boolean;
	success: boolean;
	onsubmit?: (e: Event) => void;
	themeBase: string;
}
