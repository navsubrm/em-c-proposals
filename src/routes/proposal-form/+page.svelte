<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import QuillInput from '$lib/components/userActions/inputs/quillInput/QuillInput.svelte';
	import General from '$lib/components/userActions/inputs/general/General.svelte';
	import SelectInput from '$lib/components/userActions/inputs/select/SelectInput.svelte';
	import Submit from '$lib/components/userActions/inputs/submit/Submit.svelte';
	import FormButton from '$lib/components/userActions/inputs/button/FormButton.svelte';
	import { setTheme } from '$lib/config/setTheme';

	let { themeBase = 'Two' } = $props();

	let theme = $state(setTheme(themeBase, 'theme'));
	$effect(() => {
		theme = setTheme(themeBase, 'theme');
	});

	let label = $state('Submit Proposal');
	let processing = $state(false);
	let processingLabel = $state('Processing...');
	let failLabel = $state('Something went wrong. Please try again.');
	let successLabel = $state('Proposal submitted!');
	let cancelEntry = $state(false);

	$effect(() => {
		if (!page?.data?.proposal) return;
		label = 'Edit Proposal';
		successLabel = 'Proposal Updated';
	});

	function handleCancel(e: MouseEvent) {
		e.preventDefault();
		cancelEntry = !cancelEntry;
	}

	$inspect('Id param: ', page.url.searchParams.get('id'));
</script>

<section
	style="--_background: var({theme.one}); --_text: var({theme.two}); --_anchor: var({theme.three}); --_bold: var({theme.four})"
>
	<div class="title">
		<h1>Stakeholder Feature Request Template</h1>
		<p>For Program Increment Planning & Change Control Board Review</p>
	</div>

	{#key cancelEntry}
		<form
			action={!page?.data?.proposal ? '?/new-proposal' : '?/edit-proposal'}
			method="POST"
			use:enhance
			enctype="multipart/form-data"
			onsubmit={() => (processing = true)}
		>
			{#if page?.data?.proposal?._id}
				<input type="hidden" name="id" value={page?.data?.proposal?._id} />
			{/if}

			<div class="form-grid">
				<!-- ! Stakeholder Information -->
				<fieldset>
					<legend>Stakeholder Information</legend>

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
							value={page?.data?.proposal?.first_name || null}
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
							value={page?.data?.proposal?.last_name || null}
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
							value={page?.data?.proposal?.email || null}
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
							value={page?.data?.proposal?.position || null}
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
						value={page?.data?.proposal?.organization || null}
					/>
				</fieldset>

				<!-- ! Business Impact -->
				<fieldset>
					<legend>Business Impact</legend>

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
							value={page?.data?.proposal?.cost_savings || null}
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
							value={page?.data?.proposal?.time_savings || null}
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
						value={page?.data?.proposal?.other_considerations || null}
					/>
				</fieldset>
			</div>

			<!-- ! Dependencies & Risks -->
			<fieldset>
				<legend>Dependencies & Risks</legend>

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
					value={page?.data?.proposal?.mission_impact || null}
				/>
			</fieldset>

			<!-- ! Feature Details -->
			<fieldset>
				<legend>Feature Details</legend>

				<General
					type={'text'}
					name={'title'}
					label={'Title: '}
					placeholder={'Enter the Proposal title.'}
					required={true}
					{themeBase}
					value={page?.data?.proposal?.title || null}
				/>

				<div class="horizontal">
					<div>
						<SelectInput
							name={'system'}
							label={'Associated System Component: '}
							placeholder={'Select the appropriate sub-system...'}
							required={true}
							messages={[
								{
									active: page?.form?.system_missing,
									type: 'danger',
									msg: 'System is required.',
									themeBase
								}
							]}
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
							value={page?.data?.proposal?.system || null}
						/>
						<SelectInput
							name={'type'}
							label={'Proposal Type (New or Iteration): '}
							placeholder={'Select whether this is new, or an interation to previous proposal.'}
							required={true}
							messages={[
								{
									active: page?.form?.system_missing,
									type: 'danger',
									msg: 'System is required.',
									themeBase
								}
							]}
							{themeBase}
							multiple={false}
							items={['New', 'Iteration']}
							value={page?.data?.proposal?.type || null}
						/>
					</div>
					<div>
						<SelectInput
							name={'category'}
							label={'Category: '}
							placeholder={'Select the appropriate category...'}
							required={true}
							messages={[
								{
									active: page?.form?.category_missing,
									type: 'danger',
									msg: 'Category is required.',
									themeBase
								}
							]}
							{themeBase}
							multiple={false}
							items={['UX', 'Performance', 'Security', 'Automation', 'Bug', 'Feature']}
							value={page?.data?.proposal?.category || null}
						/>

						<SelectInput
							name={'priority'}
							label={'Requested Priority (Urgency / Timeline Driver): '}
							placeholder={'Choose a priority for the request...'}
							required={true}
							messages={[
								{
									active: page?.form?.priority_missing,
									type: 'danger',
									msg: 'Priority is required.',
									themeBase
								}
							]}
							{themeBase}
							multiple={false}
							items={[
								{ value: 'Critical', label: 'Critical (prevents mission accomplishment)' },
								{ value: 'High', label: 'High' },
								{ value: 'Normal', label: 'Normal' },
								{ value: 'Low', label: 'Low' }
							]}
							value={page?.data?.proposal?.priority || null}
						/>
					</div>
				</div>
				<QuillInput
					name={'problem_statement'}
					label={'Problem Statement: '}
					placeholder={'Please describe the problem you are request a change to correct.'}
					required={true}
					messages={[
						{
							active: page?.form?.problem_statement_missing,
							type: 'danger',
							msg: 'A problem statement is required.',
							themeBase
						}
					]}
					{themeBase}
					type={'Edit'}
					value={page?.data?.proposal?.problem_statement || null}
				/>

				<QuillInput
					name={'change_statement'}
					label={'Proposed Change: '}
					placeholder={'Please describe how the system should work in the proposed implementation.'}
					required={true}
					messages={[
						{
							active: page?.form?.change_statement_missing,
							type: 'danger',
							msg: 'A proposed change statement is required.',
							themeBase
						}
					]}
					{themeBase}
					type={'Edit'}
					value={page?.data?.proposal?.change_statement || null}
				/>
			</fieldset>

			<Submit
				{label}
				{processing}
				{processingLabel}
				fail={page?.form?.fail || false}
				{failLabel}
				success={page?.form?.success || false}
				{successLabel}
				{themeBase}
			/>
			<FormButton label={'Cancel'} {themeBase} onclick={handleCancel} />
		</form>
	{/key}
</section>

<style>
	section {
		padding: 2em;
		background: var(--_background);
	}

	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	h1,
	p {
		color: var(--_text);
		font-weight: 300;
		text-align: center;
	}

	h1 {
		font-size: 3em;
	}

	form :global(.horizontal) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, auto));
		grid-auto-rows: auto;
		gap: 0.5em;
		flex: 1 1 0;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, auto));
		grid-auto-rows: auto;
		gap: 0.5em;
		flex: 1 1 0;
	}

	@media (min-width: 1000px) {
		.form-grid {
			grid-template-columns: repeat(auto-fit, minmax(500px, calc(50% - 0.25em)));
		}
	}

	fieldset {
		padding: 1em;
		margin-block: 1em;
	}

	legend {
		padding-inline: 1em;
		color: var(--_text);
	}
</style>
