<script module lang="ts">
	//import { defineMeta } from '@storybook/addon-svelte-csf';
	import SelectInput from './SelectInput.svelte';
	import description from './utils/description';
	import controlMeta from './utils/controlMeta';

	const { Story } = defineMeta({
		title: 'Forms/Molecules/Select Input',
		component: SelectInput,
		parameters: {
			backgrounds: { default: 'dark' },
			docs: { description: { component: description } }
		},
		tags: ['autodocs'],
		argTypes: { ...controlMeta }
	});
</script>

<Story
	name="Multi Select"
	args={{
		name: 'accountType',
		label: 'Account Type: ',
		placeholder: 'Select Option',
		required: false,
		multiple: true,
		messages: [],
		items: ['Selection 1', 'Selection 2', 'Selection 3'],
		value: ''
	}}
/>

<Story
	name="Single Select Required"
	--_select-input-item-text-color-input="var(--theme-text-light)"
	args={{
		name: 'accountType',
		label: 'Account Type: ',
		placeholder: 'Select Option',
		required: false,
		multiple: false,
		messages: [],
		items: ['Selection 1', 'Selection 2', 'Selection 3'],
		value: ''
	}}
/>

<Story
	name="Multi Select Required"
	args={{
		name: 'accountType',
		label: 'Account Type: ',
		placeholder: 'Select Option',
		required: true,
		multiple: true,
		messages: [],
		items: ['Selection 1', 'Selection 2', 'Selection 3'],
		value: ''
	}}
/>
