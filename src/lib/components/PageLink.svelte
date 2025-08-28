<script lang="ts">
	import Link from './Link.svelte';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import IconLinkThin from './icons/IconLinkThin.svelte';

	let {
		href,

		children,
		...others
	}: {
		href: string;
		children?: Snippet;
	} = $props();
</script>

<div class="x-centerer">
	<Link {href} propClass="page-link">
		<span>{@render children?.()}</span>
		<IconLinkThin style="--size: 1ch" />
	</Link>
</div>
