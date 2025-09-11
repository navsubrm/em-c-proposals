<script lang="ts">
	import { page } from '$app/state';
	import { useAuth } from '@mmailaender/convex-auth-svelte/sveltekit';
	import Google from '$lib/components/decorators/icons/google/Google.svelte';
	import Apple from '$lib/components/decorators/icons/apple/Apple.svelte';
	import GitHub from '$lib/components/decorators/icons/github/GitHub.svelte';

	const { signIn } = useAuth();
	const Providers = $state([
		{ Component: Google, label: 'Google', flow: 'google' },
		{ Component: Apple, label: 'Apple', flow: 'apple' },
		{ Component: GitHub, label: 'GitHub', flow: 'github' }
	]);

	const redirectTo = $state(page.url.origin + (page?.url?.searchParams?.get('redirectTo') || '/'));

	function handleOauthSignin(flow: string) {
		const value = signIn(flow, { redirectTo });
		console.log('Signin value: ', value);
	}
</script>

{#each Providers as Provider}
	<button onclick={() => handleOauthSignin(Provider.flow)}>
		<Provider.Component />
		{Provider.label}
	</button>
{/each}

<style>
	button {
		--_fill: var(--_menu-btn-color);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		padding: 1em;
		gap: 0.25em;
		border-radius: 1em;
		margin: 0.25em;
		border: none;
		color: var(--_menu-btn-color, var(--theme-text-light));
		background-color: color-mix(
			in lab,
			var(--_menu-btn-bg, var(--theme-text-light)),
			transparent 90%
		);
	}
</style>
