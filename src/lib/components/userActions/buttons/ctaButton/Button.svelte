<script lang="ts">
	import { setTheme } from '$lib/config/setTheme';
	type Props = { label: string; url: string; themeBase: string; onclick: () => void };

	let { label, themeBase, onclick = () => {} }: Props = $props();

	let button: HTMLButtonElement | undefined = $state();

	let theme = $state(setTheme(themeBase, 'button'));
	$effect(() => {
		theme = setTheme(themeBase, 'button');
	});
</script>

<button
	title={label}
	{onclick}
	style="--_background: var({theme.one}); 
	--_alt-background: var({theme.two}); 
	--_text: var({theme.three}); 
	--_text-hover: var({theme.four});
	--_border-type: var({theme.five});
	--_border-color: var({theme.six})"
>
	{label}
</button>

<style>
	button {
		position: relative;
		border-radius: 0.25em;
		font-size: var(--_button-font-size, 1em);
		padding: var(--_button-padding, 15px 25px);
		margin: var(--_button-margin, 15px 0px);
		text-decoration: none;
		text-align: center;
		overflow: hidden;
		color: var(--_text);
		background: none;
		border-style: var(--_border-type);
		border-width: 1px;
		border-color: var(--_border-color);
		font-weight: bold;
		z-index: 1;
	}

	button::before {
		display: block;
		position: absolute;
		content: '';
		inset: 0;
		height: 110%;
		width: 110%;
		background: var(--_background);
		z-index: -1;
	}

	button:hover {
		scale: 1.05;
		color: var(--_text-hover);
		border: none;
	}

	button:hover,
	button::after {
		transition: all 0.2s cubic-bezier(0.49, 1.41, 0.73, 1.81);
	}

	button:hover::after {
		height: 100%;
		width: 100%;
		margin-inline: auto;
		margin-block: auto;
		overflow: hidden;
	}

	button::after {
		display: block;
		position: absolute;
		content: '';
		inset: 0;
		background: var(--_alt-background);
		height: 0%;
		width: 0%;
		margin-block: auto;
		margin-inline: auto;
		border-radius: 0.25em;
		z-index: -1;

		@starting-style {
			height: 100%;
			width: 100%;
			margin-inline: auto;
			margin-block: auto;
		}
	}
</style>
