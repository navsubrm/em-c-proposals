<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';

	let { proposal } = $props();

	let url = $state('');
	let processing = $state(false);
	let pdfForm: HTMLFormElement | undefined = $state();

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
</script>

<tr>
	<td>{proposal.status ? JSON.parse(proposal.status).label : null}</td>
	<td>{JSON.parse(proposal.category).label}</td>
	<td>{JSON.parse(proposal.system).label}</td>
	<td>{proposal.title}</td>
	<td>{proposal.lastName}, {proposal.firstName}</td>
	<td>$ {proposal.costSavings}</td>
	<td>{proposal.timeSavings}</td>
	<td>{JSON.parse(proposal.priority).label}</td>
	<td>
		{#if url.length < 1 && !processing}
			<form
				bind:this={pdfForm}
				action="?/returnPDF"
				method="POST"
				onsubmit={handlePDFSubmit}
				use:enhance
			>
				<input type="hidden" name="id" value={proposal._id} />
				<input type="submit" value="Review" />
			</form>
		{:else if processing && url.length < 1}
			Processing...
		{:else}
			<a href={url} download="new_proposal.pdf">Download</a>
		{/if}
	</td>
	<td><button>Update</button></td>
	<td><button>Delete</button></td>
</tr>

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

	td a {
		color: green;
	}

	td button:hover,
	form input[type='submit']:hover,
	td a:hover {
		color: var(--_anchor);
		cursor: pointer;
	}
</style>
