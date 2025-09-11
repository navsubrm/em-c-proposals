<script lang="ts">
	import type { props } from './utils/props.types';
	import InputMsg from '$lib/components/userActions/inputs/inputMsg/InputMsg.svelte';
	import { setTheme } from '$lib/config/setTheme';

	let { name, label, required = false, messages = [], themeBase }: props = $props();

	let theme = $state(setTheme(themeBase, 'form'));
	$effect(() => {
		theme = setTheme(themeBase, 'form');
	});
</script>

<label
	for={name}
	style="--_background: var({theme.one}); --_text: var({theme.two}); --_error: var({theme.six})"
>
	{label}
	<small class="not-required" class:required>*</small>
	<span class="input-msgs">
		{#each messages as msg}
			<InputMsg active={msg.active} msg={msg.msg} type={msg.type} {themeBase} />
		{/each}
	</span>
</label>

<style>
	label {
		margin: var(--_input-label-margin, 0px);
		width: var(--_input-label-width, 100%);
		opacity: var(--_input-label-opacity, 0.85);
		font-size: var(--_input-label-font-size, 0.9em);
		text-box-trim: var(--_input-label-text-box-trim, trim-both);
		padding: var(--_input-label-padding, 0);
	}

	label {
		color: var(--_text);
	}

	.input-msgs {
		display: var(--_input-label-msgs-display, inline);
	}

	.input-msgs :global(small) {
		margin-left: var(--_input-label-msg-spacing, 1ch);
	}

	.not-required {
		display: none;
	}

	.required {
		display: inline;
		color: var(--_error);
		font-weight: bold;
	}
</style>
