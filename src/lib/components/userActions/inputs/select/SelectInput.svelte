<script lang="ts">
	import Label from '$lib/components/userActions/inputs/label/Label.svelte';
	import Select from 'svelte-select';
	import type { props } from './utils/propTypes.types';
	import { setTheme } from '$lib/config/setTheme';

	let {
		name,
		label,
		placeholder,
		required = false,
		multiple,
		items = [],
		messages = [],
		value = $bindable(),
		themeBase = 'One'
	}: props = $props();

	let theme = $state(setTheme(themeBase, 'form'));
	$effect(() => {
		theme = setTheme(themeBase, 'form');
	});

	$effect(() => {});
</script>

<span
	style="--_background: var({theme.one}); 
	--_text: var({theme.two}); 
	--_highlight: var({theme.three});
	--_success: var({theme.four});
	--_warn: var({theme.five});
	--_error: var({theme.six});"
>
	<Label {label} {messages} {name} {required} {themeBase} />
	<div class="select-style">
		<Select {multiple} {name} {items} {placeholder} showChevron bind:value />
	</div>
</span>

<style>
	.select-style {
		--background: color-mix(in lab, var(--_text), transparent 90%);
		--input-padding: 0 0.5em;
		--input-margin: 0;
		--value-container-padding: 0.5em;
		--multi-select-input-padding: 0;
		--multi-select-padding: 0 0.5em;
		--margin: 0;
		--padding: 0;
		--border: none;
		--border-focused: solid 1px var(--_highlight);
		--border-hover: solid 1px var(--_highlight);
		--border-radius: 0.25em;
		--box-sizing: border-box;
		--chevron-color: var(--_highlight);
		--clear-icon-color: var(--_highlight);
		--font-size: var(--_select-input-font-size, inherit);
		--input-color: var(--_text);
		--item-color: var(--_text);
		--item-hover-bg: var(--_highlight);
		--item-hover-color: var(--_background);
		--item-is-active-bg: var(--_highlight);
		--multi-item-bg: color-mix(in lab, var(--_text), transparent 90%);
		--item-active-background: var(--_background);
		--list-background: color-mix(in lab, var(--_background), transparent 10%);
		--placeholder-color: color-mix(in lab, var(--_text), transparent 30%);
	}

	.select-style:hover,
	.select-style:focus,
	.select-style:focus-within {
		border-bottom: none;
		margin-top: 0.25em;
	}

	.select-style :global(> *) {
		font-family: var(--_select-input-font-family, inherit);
		font-size: inherit;
	}

	.select-style :global(.selected-item) {
		font-family: var(--_select-input-font-family, inherit);
		font-size: inherit;
		color: var(--_text);
	}
</style>
