<script lang="ts">
	import { setTheme } from '$lib/config/setTheme';
	import Label from '../label/Label.svelte';
	import type { Props } from './utils/props.types';
	let {
		name,
		label,
		placeholder,
		type,
		min,
		max,
		step,
		required = false,
		messages,
		value = $bindable(''),
		themeBase = 'One',
		multiple = false
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
		{#if type == 'range'}
			<small class="range-value">{value}</small>
		{/if}
	</div>

	<input
		{type}
		{name}
		bind:value
		{placeholder}
		{min}
		{max}
		{step}
		data-testid={name}
		multiple={type == 'file' ? multiple : undefined}
	/>
</span>

<style>
	span {
		margin: var(--_general-input-outer-margin, 5px 0px);
		display: flex;
		flex-direction: column;
	}

	.range-value {
		display: inline;
		color: var(--_text);
	}

	input {
		margin: var(--_general-input-margin, 2px 0px);
		width: var(--_general-input-width, 100%);
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

	/* Range Specific Styles */
	input[type='range']:focus::-ms-fill-lower {
		background: var(--_highlight);
	}

	input[type='range']::-webkit-slider-runnable-track,
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: var(--_highlight);
		height: 3.4px;
	}

	input[type='range']::-moz-range-thumb,
	input[type='range']::-ms-thumb {
		background: var(--_highlight);
	}

	input[type='range']::-webkit-slider-thumb {
		background: var(--_highlight);
		box-shadow: 0 0 5px var(--_text);
	}

	input[type='range'] {
		appearance: none;
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		width: 100%; /* Specific width is required for Firefox. */
		background: transparent; /* Otherwise white in Chrome */
		border: none;
		margin-top: 10px;
	}

	input[type='range']:focus {
		outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
	}

	input[type='range']::-ms-track {
		width: 100%;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		cursor: pointer;
		margin-top: -8px;
	}

	/* All the same stuff for Firefox */
	input[type='range']::-moz-range-thumb,
	input[type='range']::-ms-thumb {
		height: 20px;
		width: 20px;
		border-radius: 50%;
		cursor: pointer;
	}

	input[type='range']::-ms-fill-lower,
	input[type='range']::-ms-fill-upper {
		background: var(--_highlight);
		border-radius: 0.5em;
	}
</style>
