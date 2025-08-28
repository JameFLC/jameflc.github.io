<script lang="ts">
	import { page } from '$app/state';
	import { isEnglishUrl } from '$lib/langage';
	import type { Snippet } from 'svelte';

	let { french, english }: { french: Snippet; english: Snippet } = $props();
</script>

{#if isEnglishUrl(page.url.pathname)}
	{@render english()}
{:else}
	{@render french()}
{/if}
