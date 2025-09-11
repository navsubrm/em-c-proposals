<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page?.data?.initString}
	<p class="dev_warning">{page?.data?.initString}</p>
{/if}
{@render children?.()}

<style>
	.dev_warning {
		position: absolute;
		top: 10px;
		left: 10px;
		color: red;
		font-family: 'Courier New', Courier, monospace;
		font-size: 10px;
		font-weight: 700;
		max-width: 200px;
		backdrop-filter: blur(3px);
	}
</style>
