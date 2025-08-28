<script lang="ts">
	import '$lib/style/blog.css';

	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="content-wrapper-home">
	{@render children()}
</div>
