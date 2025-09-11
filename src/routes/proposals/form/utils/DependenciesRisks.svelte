<script>
	import { page } from '$app/state';
	import QuillInput from '$lib/components/userActions/inputs/quillInput/QuillInput.svelte';
	import General from '$lib/components/userActions/inputs/general/General.svelte';

	let { themeBase = 'Two' } = $props();
</script>

<QuillInput
	name={'mission_impact'}
	label={'Mission Impact / Risk (explain): '}
	placeholder={'Please describe mission impact if completed, and not completed.'}
	required={true}
	messages={[
		{
			active: page?.form?.mission_impact_missing,
			type: 'danger',
			msg: 'A mission impact statement is required.',
			themeBase
		}
	]}
	{themeBase}
	type={'Edit'}
	value={'{"text":"Test of the value item. I like this. Test\\n","styled":{"ops":[{"insert":"Test of the value "},{"attributes":{"bold":true},"insert":"item"},{"insert":". I like this. Test\\n"}]}}'}
/>

<!-- <QuillInput
	name={'other-considerations'}
	label={'Other Considerations or Strategic Value (explain): '}
	placeholder={'Please describe other considerations or strategic value.'}
	required={false}
	messages={[]}
	{themeBase}
	type={'Edit'}
	value={'{"text":"Test of the value item. I like this. Test\\n","styled":{"ops":[{"insert":"Test of the value "},{"attributes":{"bold":true},"insert":"item"},{"insert":". I like this. Test\\n"}]}}'}
/> -->

<!-- <General
	type={'file'}
	name={'attachments'}
	label={'Attachments / Supporting Documents: '}
	placeholder={'Add additional attachments or supporting documents required to process your request.'}
	required={false}
	{themeBase}
/> -->
