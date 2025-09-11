<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FormButton from './FormButton.svelte';
	import description from './utils/description';
	import controlMeta from './utils/controlMeta';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Atoms/Forms/Button',
		component: FormButton,
		parameters: {
			backgrounds: { default: "dark" },
			docs: { description: { component: description } }
		},
		tags: ['autodocs'],
		argTypes: { ...controlMeta },
		args: {
			onclick: fn()
		}
	});
</script>

<Story
	name="General Form Button."
	args={{ label: 'Cancel', onclick: fn() }}
/>
