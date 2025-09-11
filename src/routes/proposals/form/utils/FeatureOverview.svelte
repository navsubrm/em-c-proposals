<script>
	import General from '$lib/components/userActions/inputs/general/General.svelte';
	import QuillInput from '$lib/components/userActions/inputs/quillInput/QuillInput.svelte';
	import SelectInput from '$lib/components/userActions/inputs/select/SelectInput.svelte';

	let { themeBase = 'Two' } = $props();
</script>

<General
	type={'text'}
	name={'title'}
	label={'Title: '}
	placeholder={'Enter the Proposal title.'}
	required={true}
	{themeBase}
/>

<div class="horizontal">
	<div>
		<SelectInput
			name={'system'}
			label={'Associated System Component: '}
			placeholder={'Select the appropriate sub-system...'}
			required={true}
			messages={[]}
			{themeBase}
			multiple={false}
			items={[
				'Commander Services',
				'SA/COP',
				'ARA Portal',
				'Mission Planning',
				'EEM Workup',
				'Data Asset Manual Entry',
				'JMT',
				'BLITZAR'
			]}
			value={''}
		/>
		<SelectInput
			name={'type'}
			label={'Proposal Type (New or Iteration): '}
			placeholder={'Select whether this is new, or an interation to previous proposal.'}
			required={true}
			messages={[]}
			{themeBase}
			multiple={false}
			items={['New', 'Iteration']}
			value={''}
		/>
	</div>
	<div>
		<SelectInput
			name={'category'}
			label={'Category: '}
			placeholder={'Select the appropriate category...'}
			required={true}
			messages={[]}
			{themeBase}
			multiple={false}
			items={['UX', 'Performance', 'Security', 'Automation', 'Bug', 'Feature']}
			value={''}
		/>

		<SelectInput
			name={'priority'}
			label={'Requested Priority (Urgency / Timeline Driver): '}
			placeholder={'Choose a priority for the request...'}
			required={true}
			messages={[]}
			{themeBase}
			multiple={false}
			items={[
				{ value: 'Critical', label: 'Critical (prevents mission accomplishment)' },
				{ value: 'High', label: 'High' },
				{ value: 'Normal', label: 'Normal' },
				{ value: 'Low', label: 'Low' }
			]}
			value={''}
		/>
	</div>
</div>
<QuillInput
	name={'problem_statement'}
	label={'Problem Statement: '}
	placeholder={'Please describe the problem you are request a change to correct.'}
	required={true}
	messages={[]}
	{themeBase}
	type={'Edit'}
	value={'{"styled":{"ops":[{"insert":"Test of the value "},{"attributes":{"bold":true},"insert":"item"},{"insert":". I like this. Test of new DOMPurify\\n"}]},"html":"<p>Test of the value <strong>item</strong>. I like this. Test of new DOMPurify</p>"}'}
/>

<QuillInput
	name={'change_statement'}
	label={'Proposed Change: '}
	placeholder={'Please describe how the system should work in the proposed implementation.'}
	required={true}
	messages={[]}
	{themeBase}
	type={'Edit'}
	value={'{"text":"Test of the value item. I like this.\\n","styled":{"ops":[{"insert":"Test of the value item. I like this.\\n"}]}}'}
/>
