<script lang="ts">
	import { setTheme } from '$lib/config/setTheme';
	import Label from '../label/Label.svelte';
	import type { Props } from './utils/props.types';
	let {
		name,
		label,
		placeholder,
		cols,
		rows,
		required = false,
		messages,
		value = $bindable(''),
		themeBase = 'One'
	}: Props = $props();

	let theme = $state(setTheme(themeBase, 'form'));
	$effect(() => {
		theme = setTheme(themeBase, 'form');
	});
</script>

<span
	style="--_background: var({theme.one}); 
	--_text: var({theme.two}); 
	--_highlight: var({theme.three}); 
	--_success: var({theme.four});
	--_warn: var({theme.five});
	--_error: var({theme.six});"
>
	<div>
		<Label {name} {label} {required} {messages} {themeBase} />
	</div>

	<textarea {name} bind:value {placeholder} data-testid={name} {cols} {rows}></textarea>
</span>

<style>
	span {
		margin: var(--_general-input-outer-margin, 5px 0px);
		display: flex;
		flex-direction: column;
	}

	textarea {
		margin: var(--_general-input-margin, 2px 0px);
		width: var(--_general-input-width, 100%);
		background-color: color-mix(in lab, var(--_text), transparent 90%);
		font-size: var(--_general-input-font-size, inherit);
		padding: var(--_general-input-padding, 0.5em);
		color: var(--_text);
		border-radius: var(--_general-input-border-radius, 0.25em);
		border: var(--_general-input-border, solid 0px var(--_text));
	}

	textarea::placeholder {
		color: color-mix(in lab, var(--_text), transparent 30%);
	}

	textarea:hover {
		outline: none !important;
		border: solid 1px var(--_highlight);
		background-color: color-mix(in lab, var(--_text), transparent 95%);
	}

	textarea:focus {
		outline: none !important;
		border: solid 1px var(--_highlight);
		background: transparent;
	}
</style>
