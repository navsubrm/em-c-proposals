<script lang="ts">
	import { setTheme } from '$lib/config/setTheme';
	import type { props } from './utils/propTypes.types';

	let { label, onclick = (e: MouseEvent) => {}, themeBase = 'One' }: props = $props();

	let theme = $state(setTheme(themeBase, 'form'));
	$effect(() => {
		theme = setTheme(themeBase, 'form');
	});
</script>

<input
	style="--_background: var({theme.one}); 
	--_text: var({theme.two});
	--_highlight: var({theme.three});
	--_success: var({theme.four});
	--_warn: var({theme.five});
	--_error: var({theme.six});"
	{onclick}
	type="button"
	value={label}
/>

<style>
	input[type='button'] {
		margin: var(--_inputs-button-margin, 10px 0px 0px 0px);
		width: var(--_inputs-button-width, 100%);
		opacity: var(--_inputs-button-opacity, 1);
		font-family: inherit;
		font-size: var(--_inputs-button-font-size, 1.3em);
		padding: var(--_inputs-button-padding, 0.25em 0.5em);
		border: solid 2px var(--_highlight);
		border-radius: var(--_inputs-button-border-radius, 0.25em);
		color: var(--_text);
		background: none;
		font-weight: var(--_inputs-button-font-weight, 300);
	}

	input[type='button']:hover,
	input[type='button']:focus,
	input[type='button']:focus-within {
		color: var(--_text);
		background-color: color-mix(in lab, var(--_highlight), transparent 10%);
		border: solid 1px var(--_text);
	}

	input[type='button']:focus {
		outline: none !important;
		border: solid 1px var(--_highlight);
	}

	input[type='button']:active {
		transform: translateY(1px);
	}

	.processing {
		opacity: 0.8;
		pointer-events: none;
	}

	.fail {
		color: var(--_error) !important;
	}
</style>
