<script>
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
		{themeBase}
	/>

	<General
		type={'text'}
		name={'last_name'}
		label={'Last Name: '}
		placeholder={"Submitter's name."}
		required={true}
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
		{themeBase}
	/>

	<General
		type={'text'}
		name={'position'}
		label={'Rank / Title: '}
		placeholder={'Enter rank or title.'}
		required={true}
		{themeBase}
	/>
</div>

<General
	type={'text'}
	name={'organization'}
	label={'Organization/Program: '}
	placeholder={'Enter your organization or program name.'}
	required={true}
	{themeBase}
/>
