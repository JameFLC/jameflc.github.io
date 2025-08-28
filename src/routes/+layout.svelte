<script lang="ts">
	import '$lib/style/app.css';

	import type { Lang } from '$lib/types';
	import type { Snippet } from 'svelte';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { getLangAttr } from '$lib/langage';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	let {
		children
	}: {
		children: Snippet;
	} = $props();

	const updateLang = (newLang: Lang) => {
		document.documentElement.lang = newLang;
	};

	onMount(() => {
		// Watch for navigation and update if needed
		afterNavigate(() => {
			updateLang(getLangAttr(page.url.pathname));
		});
	});
</script>

<Header />

{@render children?.()}
