<script>
	import General from '$lib/components/userActions/inputs/general/General.svelte';
	import SelectInput from '$lib/components/userActions/inputs/select/SelectInput.svelte';
	import QuillInput from '$lib/components/userActions/inputs/quillInput/QuillInput.svelte';

	let { themeBase = 'Two' } = $props();

	/**
	 * !Consider controlling this entire box by access control to prevent edits by users.
	 */
</script>

<div class="horizontal">
	<General
		type={'date'}
		name={'date_filed'}
		label={'Date Request Submitted: '}
		placeholder={'Enter the date the request was submitted.'}
		required={true}
		{themeBase}
	/>

	<General
		type={'date'}
		name={'date-reviewed'}
		label={'Date Reviewed by CCB: '}
		placeholder={'Enter date revied by CCB.'}
		required={true}
		{themeBase}
	/>
</div>

<div class="horizontal">
	<!-- This will be updated to control by access and display our use input depending. -->

	<SelectInput
		name={'status'}
		label={'Approval Status'}
		placeholder={'Select the current status for the item.'}
		required={true}
		messages={[]}
		{themeBase}
		multiple={false}
		items={['Filed', 'Accepted by CCB', 'Rejected by CCB']}
		value={''}
	/>

	<General
		type={'number'}
		name={'approved-pi'}
		label={'Approved Program Increment (PI): '}
		placeholder={'Enter the approved PI number.'}
		required={true}
		{themeBase}
	/>
</div>

<div class="horizontal">
	<General
		type={'text'}
		name={'approver-name'}
		label={'Signed By CCB Chair: '}
		placeholder={'Enter your organizatoin or program name.'}
		required={true}
		{themeBase}
	/>
	<General
		type={'text'}
		name={'approver-email'}
		label={'Approver Email: '}
		placeholder={'Enter email address.'}
		required={true}
		{themeBase}
	/>
</div>

<QuillInput
	name={'approval-comments'}
	label={'Routing / Approval Comments: '}
	placeholder={'Provide any comments for the routing an approval process.'}
	required={true}
	messages={[]}
	themeBase={'Two'}
	type={'Edit'}
	value={'{"text":"Test of the value item. I like this. Test\\n","styled":{"ops":[{"insert":"Test of the value "},{"attributes":{"bold":true},"insert":"item"},{"insert":". I like this. Test\\n"}]}}'}
/>
