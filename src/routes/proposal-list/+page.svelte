<script lang="ts">
	import { page } from '$app/state';
	import { setTheme } from '$lib/config/setTheme';
	import Proposal from './utils/Proposal.svelte';

	let table = $state();
	let theme = $state(setTheme('Two', 'theme'));
</script>

<section
	bind:this={table}
	style="
	--_background: var({theme.one}); 
	--_text: var({theme.two}); 
	--_anchor: var({theme.three}); 
	--_bold: var({theme.four});"
>
	<h1>Active Proposal List</h1>
	{#await page?.data?.proposals}
		<p>Loading...</p>
	{:then proposals}
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Status</th>
						<th>Organization</th>
						<th>Submitter</th>
						<th>Category</th>
						<th>System</th>
						<th>Title</th>
						<th>Cost Savings</th>
						<th>Time Savings</th>
						<th>Route</th>
						<th>Details</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{#each proposals.results as proposal}
						<Proposal {proposal} />
					{/each}
				</tbody>
			</table>
		</div>
	{/await}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background: var(--_background);
		min-height: 100vh;
		color: var(--_text);
		padding: 1em;
	}

	h1 {
		margin-bottom: 0.5em;
	}

	.table-container {
		width: fit-content;
		max-width: 100%;
		height: fit-content;
		max-height: 80vh;
		overflow: auto;
		min-height: 60vh;
		min-width: fit-content;
	}

	table,
	th,
	table :global(td) {
		border: solid 1px var(--_bold);
		padding-block: 5px;
		padding-inline: 20px;
	}

	table {
		border-collapse: collapse;
	}

	/* tr {
		background: color-mix(in lab, var(--_bold), var(--_background) 90%);
	} */
</style>
