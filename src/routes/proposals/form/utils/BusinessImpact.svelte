<script>
	import { page } from '$app/state';
	import General from '$lib/components/userActions/inputs/general/General.svelte';
	import QuillInput from '$lib/components/userActions/inputs/quillInput/QuillInput.svelte';

	let { themeBase = 'Two' } = $props();
</script>

<div class="horizontal">
	<General
		type={'number'}
		name={'cost_savings'}
		label={'Cost Savings (in dollars per year): '}
		placeholder={'Enter estimated cost savings from the change.'}
		required={true}
		messages={[
			{
				active: page?.form?.cost_savings_missing,
				type: 'danger',
				msg: 'Cost Savings is required.',
				themeBase
			}
		]}
		{themeBase}
	/>

	<General
		type={'number'}
		name={'time_savings'}
		label={'Time Saving (in hours per year): '}
		placeholder={'Enter estimated time savings from the change.'}
		required={true}
		messages={[
			{
				active: page?.form?.time_savings_missing,
				type: 'danger',
				msg: 'Time savings is required.',
				themeBase
			}
		]}
		{themeBase}
	/>
</div>

<QuillInput
	name={'other_considerations'}
	label={'Other Considerations (explain): '}
	placeholder={'Please describe other efficiency gains from the change.'}
	required={true}
	messages={[
		{
			active: page?.form?.other_considerations_missing,
			type: 'danger',
			msg: 'Provide information for other considerations.',
			themeBase
		}
	]}
	{themeBase}
	type={'Edit'}
	value={'{"text":"Test of the value item. I like this. Test\\n","styled":{"ops":[{"insert":"Test of the value "},{"attributes":{"bold":true},"insert":"item"},{"insert":". I like this. Test\\n"}]}}'}
/>
