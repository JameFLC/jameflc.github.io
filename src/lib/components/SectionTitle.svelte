<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconLinkThick from './icons/IconLinkThick.svelte';
	import Link from './Link.svelte';

	let {
		href,
		children
	}: {
		href?: string;
		children?: Snippet;
	} = $props();
</script>

{#if href}
	<div class="section-title">
		<Link {href} propClass="section-title">
			<h2 class="no-wrap">
				<span>{@render children?.()}</span>
				<IconLinkThick style="--size: 0.7ch; margin-bottom: 2px; fill: inherit" />
			</h2>
		</Link>
	</div>
{:else}
	<h2>
		<span>{@render children?.()}</span>
	</h2>
{/if}

<style>
	:global(.section-title) {
		color: var(--text-primary);
		text-decoration: none;
		display: block;
	}

	:global(.section-title) {
		text-decoration: underline;
	}
</style>
