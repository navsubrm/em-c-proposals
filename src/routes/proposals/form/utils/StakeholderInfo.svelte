<script>
	import { page } from '$app/state';
	import General from '$lib/components/userActions/inputs/general/General.svelte';

	let { themeBase = 'Two' } = $props();
</script>

<div class="horizontal">
	<General
		type={'text'}
		name={'first_name'}
		label={'First Name: '}
		placeholder={"Submitter's name."}
		required={true}
		messages={[
			{
				active: page?.form?.first_name_missing,
				type: 'danger',
				msg: 'First Name is required.',
				themeBase
			}
		]}
		{themeBase}
	/>

	<General
		type={'text'}
		name={'last_name'}
		label={'Last Name: '}
		placeholder={"Submitter's name."}
		required={true}
		messages={[
			{
				active: page?.form?.last_name_missing,
				type: 'danger',
				msg: 'Last Name is required.',
				themeBase
			}
		]}
		{themeBase}
	/>
</div>

<div class="horizontal">
	<General
		type={'email'}
		name={'email'}
		label={'POC Email: '}
		placeholder={'Enter email address.'}
		required={true}
		messages={[
			{
				active: page?.form?.email_missing,
				type: 'danger',
				msg: 'Email is required.',
				themeBase
			}
		]}
		{themeBase}
	/>

	<General
		type={'text'}
		name={'position'}
		label={'Rank / Title: '}
		placeholder={'Enter rank or title.'}
		required={true}
		messages={[
			{
				active: page?.form?.position_missing,
				type: 'danger',
				msg: 'Rank / Title is required.',
				themeBase
			}
		]}
		{themeBase}
	/>
</div>

<General
	type={'text'}
	name={'organization'}
	label={'Organization/Program: '}
	placeholder={'Enter your organization or program name.'}
	required={true}
	messages={[
		{
			active: page?.form?.organization_missing,
			type: 'danger',
			msg: 'Organization is required.',
			themeBase
		}
	]}
	{themeBase}
/>
