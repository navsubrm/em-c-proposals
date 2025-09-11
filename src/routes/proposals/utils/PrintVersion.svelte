<script>
	let { proposal, key = $bindable() } = $props();

	let printItem = $state();
	let active = $state(false);

	function handlePrint() {
		window.open('/proposals/print?print-id=' + proposal._id, '_blank')
		//let page = document.body.innerHTML;
		//document.body.innerHTML = printItem.innerHTML;
		setTimeout(() => window.print(), 1000);
		window.close()
		//document.body.innerHTML = '<div style="display: contents">%sveltekit.body%</div>';
		//key = !key
		//goto("/proposals/form", { noScroll: true, keepFocus: true })
	}
</script>

<button onclick={handlePrint}>Print</button>

<div class="content" class:active bind:this={printItem}>
	<h1>(MEMORANDUM) EM&C CONFIGURATION CONTROL BOARD (CCB) REQUEST</h1>
	<header>
		<p>Organization: {proposal?.organization}</p>
		<p>Date Submitted: {proposal?.dateFiled}</p>
		<p>
			Submitter: {proposal?.lastName}, {proposal?.firstName}
			{proposal?.rank}
		</p>
		<p>Email: {proposal?.email}</p>
		<p class="bold">
			Current Status: {proposal?.status ? JSON.parse(proposal?.status).label : ''}
		</p>
		<p class="bold">
			Change Request Priority: {proposal?.priority ? JSON.parse(proposal?.priority).label : ''}
		</p>
	</header>

	<h2 class="proposal-title">{proposal?.title}</h2>

	<div class="business-impact">
		<h3>Business Impact Summary:</h3>
		<p>Project Cost Savings: ${proposal?.costSavings} dollars per year.</p>
		<p>Projected Time Savings: {proposal?.timeSavings} hours per year.</p>
		<p>
			Projected Miscellaneous Gains: {proposal?.otherGains
				? JSON.parse(proposal?.otherGains).html
				: ''}
		</p>
	</div>

	<div class="feature-overview">
		<h3>Proposal Overview:</h3>
		<p>
			Associated System: {proposal?.system ? JSON.parse(proposal?.system).label : ''}
		</p>
		<p>
			Change Type: {proposal?.type ? JSON.parse(proposal?.type).label : ''}
		</p>
		<p>
			Change Category: {proposal?.category ? JSON.parse(proposal?.category).label : ''}
		</p>
		<p>
			<span
				>Problem Statement: {@html proposal?.problemStatement
					? JSON.parse(proposal?.problemStatement).html
					: ''}</span
			>
		</p>
		<p>
			<span
				>Recommended Solution: {@html proposal?.changeStatement
					? JSON.parse(proposal?.changeStatement).html
					: ''}</span
			>
		</p>
		<p>
			<span
				>Mission Impact: {@html proposal?.missionImpact
					? JSON.parse(proposal?.missionImpact).html
					: ''}</span
			>
		</p>
	</div>

	<div class="administrative-miscellaneous">
		<h3>Miscellaneous & Administrative Information:</h3>
		<p>
			<span
				>Other Considerations: {@html proposal?.otherConsiderations
					? JSON.parse(proposal?.otherConsiderations).html
					: ''}</span
			>
		</p>
		<p>
			Approved PI: {proposal?.approvedPi ? proposal?.approvedPi : 'No Assigned PI'}
		</p>
		<p>
			Approved By: {proposal?.approverName ? proposal?.approverName : 'No Approver'}
		</p>
		<p>
			Approver Email: {proposal?.approverEmail ? proposal?.approverEmail : 'No Approver'}
		</p>
		<p>
			<span
				>Approval Comments:{@html proposal?.approverComments
					? JSON.parse(proposal?.missionImpact).html
					: 'No Comments'}
			</span>
		</p>
	</div>
	<!-- {/if} -->
</div>

<style>
	/* section {
		position: fixed;
		inset: 0;
		background: var(--_background);
		color: black;
		overflow: scroll;
		max-height: 100vh;
		font-size: 17px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	} */

	.content {
		display: none;
		width: 8in;
		padding: 1cm 1cm;
		color: black;
	}

	.active {
		display: block;
	}

	@media print {
		@page {
			size: letter portrait;
			margin: 1cm;
		}
	}

	header {
		margin-top: 0.25in;
	}

	h1,
	h2,
	h3 {
		letter-spacing: 0.5px;
	}

	h1,
	h2 {
		font-size: 20px;
	}

	h3 {
		font-size: 17px;
		font-weight: 500;
	}

	div {
		margin-left: 3ch;
	}

	div p {
		margin-left: 3ch;
	}

	p {
		font-size: 15px;
		width: 100%;
	}

	span :global(> *) {
		display: inline;
		font-size: 0.9rem;
	}

	.proposal-title {
		margin-block: 0.25in;
	}

	.bold {
		font-weight: 700;
	}

	/* @media print {
		section {
			padding: 0;
			background: none;
		}
	} */
</style>
