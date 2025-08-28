<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getLangString } from '$lib/langage';
	import { page } from '$app/state';

	let {
		content,
		onAction
	}: {
		content: Snippet;
		onAction: () => void;
	} = $props();
</script>

<div class="x-centerer">
	<div class="slideshow-wrapper">
		<div class="slide-content-wrapper centerer" style="height: 24rem;">
			<div class="slide-content">
				{@render content()}
			</div>
		</div>

		<div class="slide-controls-wrapper">
			<button onclick={onAction}
				>{getLangString(page.url.pathname, 'Clique Moi', 'Click Me')}</button
			>
		</div>
	</div>
</div>

<style>
	button {
		font-weight: var(--fw-black);
		font-size: var(--tm);
		padding: var(--rms) var(--rl);
		letter-spacing: 2px;
	}
</style>
