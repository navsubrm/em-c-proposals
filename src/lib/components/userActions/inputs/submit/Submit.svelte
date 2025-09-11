<script lang="ts">
	import { setTheme } from '$lib/config/setTheme';
	import type { props } from './utils/props.types';

	let {
		label,
		processingLabel,
		failLabel,
		successLabel,
		formtarget,
		formaction = undefined,
		processing = $bindable(false),
		fail = $bindable(false),
		success = $bindable(false),
		onsubmit = undefined,
		themeBase = 'One'
	}: props = $props();

	//Consider handling all requests with page state.  See if you can do a res.json(100, { processing: true }) from the server to handle processing state.
	let theme = $state(setTheme(themeBase, 'form'));

	$effect(() => {
		theme = setTheme(themeBase, 'form');
	});
</script>

<span
	style="--_background: var({theme.one}); 
	--_text: var({theme.two}); 
	--_highlight: var({theme.three}); 
	--_error: var({theme.six})"
>
	<input
		data-testid="{formtarget}-submit"
		{formtarget}
		{formaction}
		{onsubmit}
		type="submit"
		class="submit-input"
		class:processing={(processing && !fail) || success}
		class:fail
		value={success
			? successLabel
			: fail
				? failLabel
				: !success && !fail && processing
					? processingLabel
					: label}
	/>
</span>

<style>
	input[type='submit'] {
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

	input[type='submit']:hover,
	input[type='submit']:focus,
	input[type='submit']:focus-within {
		color: var(--_text);
		background-color: color-mix(in lab, var(--_highlight), transparent 10%);
		border: solid 1px var(--_text);
	}

	input[type='submit']:focus {
		outline: none !important;
		border: solid 1px var(--_highlight);
	}

	input[type='submit']:active {
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
