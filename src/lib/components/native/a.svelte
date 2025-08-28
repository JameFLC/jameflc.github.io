<script lang="ts">
	import type { Snippet } from 'svelte';
	import Link from '../Link.svelte';

	let {
		href,
		children,
		...others
	}: {
		href: string;
		children?: Snippet;
	} = $props();
</script>

<Link {href} {...others}>{@render children?.()}</Link>
