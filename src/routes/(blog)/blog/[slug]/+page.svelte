<script lang="ts">
	import BlogHeader from '$lib/components/blog/BlogHeader.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<BlogHeader PostData={data.meta} />

	<data.content />
</article>
