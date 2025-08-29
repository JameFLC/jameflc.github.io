<script lang="ts">
	import { page } from '$app/state';
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

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={websiteURL} />
	<meta property="twitter:url" content={websiteURL + page.url.pathname} />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content={websiteURL + data.meta.thumbnail} />
</svelte:head>

<article>
	<BlogHeader PostData={data.meta} />

	<data.content />
</article>
