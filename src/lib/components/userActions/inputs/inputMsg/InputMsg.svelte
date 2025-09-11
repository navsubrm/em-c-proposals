<script lang="ts">
	import { setTheme } from '$lib/config/setTheme';
	import type { props } from './utils/props.types';
	let { active = $bindable(false), msg, type, themeBase }: props = $props();

	if (type !== 'success' && type !== 'warning' && type !== 'danger') {
		type = 'danger';
	}

	if (!msg) msg = 'Message not provided.';

	let theme = $state(setTheme(themeBase, 'form'));

	$effect(() => {
		theme = setTheme(themeBase, 'form');
	});
</script>

{#if active}
	<small
		style="--_background: var({theme.one}); 
		--_text: var({theme.two}); 
		--_success: var({theme.four});
		--_warn: var({theme.five});
		--_danger: var({theme.six})"
		class:success={type === 'success'}
		class:warning={type === 'warning'}
		class:danger={type === 'danger'}
	>
		{msg}
	</small>
{/if}

<style>
	small {
		font-size: var(--_input-msg-font-size, 0.7em);
		margin: var(--_input-msg-margin, 0 0);
	}

	.success {
		color: var(--_success);
	}

	.warning {
		color: var(--_warn);
	}

	.danger {
		color: var(--_danger);
	}
</style>
