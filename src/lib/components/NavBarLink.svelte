<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		children,
		...others
	}: {
		href: string;
		children?: Snippet;
	} = $props();

	import Link from './Link.svelte';
</script>

<Link {href} propClass="navbarlink" {...others}>
	{@render children?.()}
</Link>
