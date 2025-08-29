<script lang="ts">
	import { websiteURL } from '$lib';
	import BlogHeader from '$lib/components/blog/BlogHeader.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:image" content={websiteURL + data.meta.thumbnail} />
</svelte:head>

<article>
	<BlogHeader PostData={data.meta} />

	<data.content />
</article>
