<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	let {
		href,
		propClass,
		style,
		children,
		...others
	}: {
		href: string;
		propClass?: string;
		style?: string;
		children?: Snippet;
	} = $props();

	let properHref: string = $derived.by(() => {
		if (href === '') return '';

		let relativeUrl = href.startsWith('/');
		let isEnglish: boolean =
			page.url.pathname.startsWith('/en/') || page.url.pathname.endsWith('/en');

		if (isEnglish && href === '/') {
			return '/en/home';
		}

		if (isEnglish && relativeUrl) {
			return `/en${href}`;
		}

		return href;
	});
</script>

<a href={properHref} class={propClass} {style} {...others}>{@render children?.()}</a>
