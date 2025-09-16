<script>
	//Code
</script>

<header>
	<ul>
		<li><a href="/">Home</a></li>
		<li class="border">|</li>
		<li><a href="/proposal-list">Active Proposals</a></li>
		<li class="border">|</li>
		<li><a href="/proposal-form">New Proposal</a></li>
	</ul>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-inline: 1em;
		background: var(--color-primary-dark-blue);
		width: 100%;
		height: 75px;
	}

	ul {
		display: flex;
		gap: 10px;
		list-style: none;
	}

	li,
	a,
	a:visited {
		text-decoration: none;
		color: var(--logo-silver);
	}

	a:hover {
		color: var(--color-security-purple);
	}

	.border {
		font-weight: 900;
		font-size: 1.2em;
		vertical-align: top;
	}
</style>
