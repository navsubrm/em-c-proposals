import type { Snippet } from 'svelte';

export interface props {
	children?: Snippet;
	label: string;
	onclick: (e: MouseEvent) => void;
}
