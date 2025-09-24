<script lang="ts">
	import { onMount } from 'svelte';
	import Label from '$lib/components/userActions/inputs/label/Label.svelte';
	import { setTheme } from '$lib/config/setTheme';
	import { toolbarOptions as defaultToolBar } from './utils/toolbarOptions';
	import type QuillInit from './utils/handleQuillSetup.svelte';
	import type { Props } from './utils/props.types';
	import 'quill/dist/quill.snow.css';

	let {
		name,
		label,
		placeholder,
		required = false,
		messages = [],
		themeBase,
		value = $bindable(''),
		type = 'Edit',
		toolbarOptions = defaultToolBar
	}: Props = $props();

	let input: HTMLElement = $state() as HTMLElement;
	let quill: QuillInit | undefined = $state();
	let form = $state(setTheme(themeBase, 'form'));
	let didMount = $state(false);

	onMount(() => {
		let interval = setInterval(async () => {
			if (!input || !placeholder || !toolbarOptions) return;
			const QuillInit = (await import('./utils/handleQuillSetup.svelte')).default;
			quill = new QuillInit({ elem: input, placeholder, toolbarOptions, type }, value);
			didMount = true;
			clearInterval(interval);
		}, 500);
	});

	$effect(() => {
		if (didMount && quill) quill.editor.setContents(JSON.parse(value)?.styled);
	});

	$inspect('Quill Value Update: ', value, quill?.value);
</script>

<span
	class="editor-container"
	style="--_background: var({form.one}); 
			--_text: var({form.two}); 
			--_highlight: var({form.three}); 
			--_success: var({form.four}); 
			--_warn: var({form.five}); 
			--_error: var({form.six}); 
			--_bold: var({form.seven}); 
			--_anchor: var({form.eight})"
>
	<Label {name} {label} {required} {messages} {themeBase} />
	<div class="inputs" class:edit={type == 'Edit'} class:display={type == 'Display'}>
		<div bind:this={input}></div>
		<input type="hidden" {name} bind:value />
	</div>
</span>

<style>
	span {
		background: transparent;
	}

	span :global(> *) {
		width: 100%;
	}

	.inputs {
		display: none;
		margin-top: 5px;
	}

	.display {
		display: block;
	}

	.edit {
		display: block;
		background: transparent;
	}

	span :global(.ql-container) {
		background: color-mix(in lab, var(--_background), var(--_text) 10%);
		color: var(--_text);
	}

	span:hover :global(.ql-container),
	span:focus :global(.ql-container),
	span:focus-within :global(.ql-container) {
		background: var(--_background);
	}

	span :global(.ql-editor),
	span :global(.ql-toolbar),
	span :global(.ql-container) {
		border: none;
		width: 100%;
	}

	span:hover :global(.ql-editor),
	span:focus :global(.ql-editor),
	span:focus-within :global(.ql-editor) {
		resize: vertical;
	}

	span :global(.ql-container) {
		border-radius: 0 0 0.25em 0.25em;
	}

	span :global(.ql-toolbar) {
		border-radius: 0.25em 0.25em 0 0;
	}

	span :global(.ql-blank::before) {
		color: color-mix(in lab, var(--_text), transparent 30%);
		font-style: normal;
		font-size: 1.1em;
	}

	span :global(.ql-toolbar),
	span :global(.ql-container),
	span :global(.ql-toolbar),
	span :global(.ql-container),
	span :global(.ql-toolbar),
	span :global(.ql-container) {
		border: solid 1px var(--_background);
	}

	span:focus :global(.ql-toolbar),
	span:focus :global(.ql-container),
	span:focus-within :global(.ql-toolbar),
	span:focus-within :global(.ql-container) {
		border: solid 1px color-mix(in lab, var(--_highlight), transparent 30%);
	}

	span:hover :global(.ql-toolbar),
	span:hover :global(.ql-container) {
		border: solid 1px color-mix(in lab, var(--_highlight), transparent 30%);
		border-top: solid 1px color-mix(in lab, var(--_highlight), transparent 30%);
	}

	span :global(.ql-container strong) {
		color: var(--_bold); /* Was bold */
	}

	span :global(.ql-picker-options) {
		background: var(--_background);
		color: var(--_text);
	}

	span :global(.ql-picker-options .ql-picker-item:hover) {
		background: color-mix(in lab, var(--_background), var(--_text) 20%);
		color: var(--_bold); /* Was bold */
	}

	span :global(.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label) {
		border-color: var(--_text);
	}

	span :global(.ql-toolbar .ql-stroke),
	span :global(.ql-toolbar .ql-fill),
	span :global(.ql-toolbar .ql-picker) {
		fill: transparent;
		stroke: var(--_highlight);
		color: var(--_bold); /* Was bold */
	}

	span :global(.ql-toolbar button:hover .ql-stroke),
	span :global(.ql-toolbar button:hover .ql-fill),
	span :global(.ql-toolbar button:hover .ql-picker) {
		fill: transparent;
		stroke: var(--_bold); /* Was bold */
		color: var(--_highlight);
	}

	.editor-container :global(.ql-toolbar) {
		transform: translateY(15px) translateZ(-1);
		height: 15px;
		overflow: hidden;
	}

	.editor-container :global(.ql-container) {
		transform: translateY(-15px);

		@starting-style {
			transform: translateY(0);
		}
	}

	.editor-container:focus :global(.ql-toolbar:hover),
	.editor-container:focus :global(.ql-toolbar),
	.editor-container:focus-within :global(.ql-toolbar) {
		max-height: 180px;
		height: 100%;
		transform: unset;
		overflow: visible;

		@starting-style {
			height: 0px;
			transform: translate(100%);
			overflow: hidden;
		}
	}

	.editor-container:focus :global(.ql-container),
	.editor-container:focus-within :global(.ql-container) {
		transform: unset;
		transition: all 0.25s linear allow-discrete;
	}

	span :global(.ql-picker-label:hover .ql-stroke),
	span :global(.ql-picker-label:focus .ql-stroke),
	span :global(.ql-picker-label:focus-within .ql-stroke),
	span :global(.ql-picker-label:active .ql-stroke) {
		stroke: var(--_bold) !important; /* Was bold */
	}

	span :global(.ql-picker-label:hover),
	span :global(.ql-picker-label:hover > *),
	span :global(.ql-picker-label:focus) {
		color: var(--_bold) !important; /* Was bold */
	}

	span :global(.ql-picker-label.ql-active),
	span :global(.ql-picker-label.ql-active .ql-stroke) {
		color: var(--_bold) !important; /* Was bold */
		stroke: var(--_bold) !important; /* Was bold */
	}

	span :global(.picker-label.ql-selected),
	span :global(.picker-label.ql-active) {
		color: var(--_text) !important;
		stroke: var(--_text) !important;
	}
</style>
