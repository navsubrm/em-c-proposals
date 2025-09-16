<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';

	let { proposal } = $props();

	let url = $state('');
	let processing = $state(false);
	let processingDelete = $state(false);
	let displayDetails = $state(false);
	let pdfForm: HTMLFormElement | undefined = $state();
	let deleteForm: HTMLFormElement | undefined = $state();

	$effect(() => {
		if (!page?.form?.id || page?.form?.id !== proposal._id) {
			url = '';
			return;
		}
		url = `data:application/pdf;base64,${page?.form?.file}`;
	});

	function handlePDFSubmit(e: SubmitEvent) {
		e.preventDefault();
		processing = true;
		pdfForm?.submit();
	}

	function handleDeleteSubmit(e: SubmitEvent) {
		e.preventDefault();
		processingDelete = true;
		deleteForm?.submit();
	}

	const usdFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});
</script>

<tr>
	<td>{proposal.priority || null}</td>
	<td>{proposal.status || null}</td>
	<td>{proposal.organization || null}</td>
	<td>{proposal.last_name}, {proposal.first_name}</td>
	<td>{proposal.category}</td>
	<td>{proposal.system}</td>
	<td>{proposal.title}</td>
	<td>{usdFormatter.format(proposal.cost_savings)}</td>
	<td>{proposal.time_savings} hr/year</td>
	<td class="button-bg">
		{#if url.length < 1 && !processing}
			<form
				bind:this={pdfForm}
				action="?/returnPDF"
				method="POST"
				onsubmit={handlePDFSubmit}
				use:enhance
			>
				<input type="hidden" name="id" value={proposal._id} />
				<input type="submit" value="Create PDF" />
			</form>
		{:else if processing && url.length < 1}
			Processing...
		{:else}
			<a class="download" href={url} download="new_proposal.pdf">Download</a>
		{/if}
	</td>
	<td class="button-bg"
		><button onclick={() => (displayDetails = !displayDetails)}>Details</button></td
	>
	<td class="button-bg"><a href="/proposal-form?id={proposal._id}">Edit</a></td>
	<td class="button-bg"
		><form
			bind:this={deleteForm}
			action="?/delete"
			method="POST"
			onsubmit={handleDeleteSubmit}
			use:enhance
		>
			<input type="hidden" name="id" value={proposal._id} />
			<input type="submit" value="Delete" />
		</form></td
	>
</tr>

{#if displayDetails}
	<div class="details">
		<button onclick={() => (displayDetails = false)}>X</button>
		<div class="modal">
			<p><strong>Mission Impact: </strong>{JSON.parse(proposal.mission_impact).text}</p>
			<p><strong>Problem Statement: </strong>{JSON.parse(proposal.problem_statement).text}</p>
			<p><strong>Change Statement: </strong>{JSON.parse(proposal.change_statement).text}</p>
			<p><strong>Other Considerations: </strong>{JSON.parse(proposal.other_considerations).text}</p>
		</div>
	</div>
{/if}

<style>
	td form {
		background: none;
		border: none;
		color: inherit;
	}
	td button,
	form input[type='submit'],
	td a {
		background: none;
		border: none;
		color: var(--_text);
		text-decoration: none;
	}

	td {
		color: color-mix(in lab, var(--_text), transparent 10%);
		padding-block: 10px;
		padding-inline: 15px;
	}

	td :global(:where(strong)) {
		color: var(--_text);
	}

	td button,
	form input[type='submit'],
	td a {
		color: color-mix(in lab, var(--_anchor), var(--_text) 30%);
	}

	td .download {
		color: green;
	}

	td button:hover,
	form input[type='submit']:hover,
	td a:hover {
		color: var(--_anchor);
		cursor: pointer;
	}

	.details {
		position: fixed;
		inset: 0;
		height: 100%;
		width: 100%;
		background: color-mix(in lab, var(--_background), transparent 20%);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.details button {
		position: fixed;
		top: 5%;
		right: 5%;
	}

	.modal {
		height: 80%;
		width: 80%;
	}
	.modal :global(p) {
		margin-block: 1em;
	}
</style>
