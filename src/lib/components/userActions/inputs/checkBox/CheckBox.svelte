<script lang="ts">
	import { setTheme } from '$lib/config/setTheme';
	import Label from '../label/Label.svelte';
	import type { Props } from './utils/props.types';
	let {
		name,
		label,
		placeholder,
		required = false,
		messages,
		checked = $bindable(false),
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

	<input type="checkbox" {name} bind:checked {placeholder} data-testid={name} />
</span>

<style>
	span {
		margin: var(--_general-input-outer-margin, 5px 0px);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-direction: row-reverse;
		gap: 10px;
	}

	input {
		margin: var(--_general-input-margin, 10px 0px);
		width: var(--_general-input-width, min-content);
		background-color: color-mix(in lab, var(--_text), transparent 90%);
		font-size: var(--_general-input-font-size, 0.9em);
		padding: var(--_general-input-padding, 0.5em);
		color: var(--_text);
		border-radius: var(--_general-input-border-radius, 0.25em);
		border: solid 0px var(--_text);
	}

	input::placeholder {
		color: color-mix(in lab, var(--_text), transparent 30%);
	}

	input:hover {
		outline: none !important;
		border: solid 1px var(--_highlight);
		background-color: color-mix(in lab, var(--_text), transparent 95%);
	}

	input:focus {
		outline: none !important;
		border: solid 1px var(--_highlight);
		background-color: transparent;
	}
</style>
