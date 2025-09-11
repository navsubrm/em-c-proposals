<script lang="ts">
	import type { props } from './utils/props.types';

	let { children, label, onclick }: props = $props();
</script>

<button {onclick} title={label} aria-label={label}>
	{@render children?.()}{label}
</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		border: none;
		gap: 1ch;
		padding-inline: 1em;
		padding-block: 0.5em;
		border-radius: 3em;
		color: var(--_text);
		background: color-mix(in lab, var(--_background), transparent 75%);
		opacity: var(--_menu-button-opacity, 1);
		pointer-events: var(--_menu-button-pointer-events, all);
		width: max-content;
	}
</style>
