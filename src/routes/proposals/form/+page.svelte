<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import StakeholderInfo from './utils/StakeholderInfo.svelte';
	import FeatureOverview from './utils/FeatureOverview.svelte';
	import BusinessImpact from './utils/BusinessImpact.svelte';
	import { setTheme } from '$lib/config/setTheme';
	import DependenciesRisks from './utils/DependenciesRisks.svelte';
	import AdministrativeInfo from './utils/AdministrativeInfo.svelte';
	import Submit from '$lib/components/userActions/inputs/submit/Submit.svelte';
	import FormButton from '$lib/components/userActions/inputs/button/FormButton.svelte';

	let { themeBase = 'Two' } = $props();

	let theme = $state(setTheme(themeBase, 'theme'));
	$effect(() => {
		theme = setTheme(themeBase, 'theme');
	});

	let label = $state('Submit Proposal.');
	let processing = $state(false);
	let processingLabel = $state('Processing...');
	let failLabel = $state('Something went wrong. Please try again.');
	let successLabel = $state('Proposal submitted!');
	let cancelEntry = $state(false);

	function handleCancel(e: MouseEvent) {
		e.preventDefault();
		cancelEntry = !cancelEntry;
	}

	$inspect('Page from form: ', page?.form);
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
			action="?/new-proposal"
			method="POST"
			use:enhance
			enctype="multipart/form-data"
			onsubmit={() => (processing = true)}
		>
			<div class="form-grid">
				<fieldset>
					<legend>Stakeholder Information</legend>
					<StakeholderInfo {themeBase} />
				</fieldset>

				<fieldset>
					<legend>Business Impact</legend>
					<BusinessImpact {themeBase} />
				</fieldset>
			</div>

			<fieldset>
				<legend>Dependencies & Risks</legend>
				<DependenciesRisks {themeBase} />
			</fieldset>

			<fieldset>
				<legend>Feature Details</legend>
				<FeatureOverview {themeBase} />
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
