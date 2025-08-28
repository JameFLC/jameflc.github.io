<script lang="ts" module>
	import { a } from '$lib/components/native/components';
	export { a };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

{@render children?.()}
