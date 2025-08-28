<script lang="ts">
	import ArrowNext from '$lib/components/icons/arrows/ArrowNext.svelte';
	import ArrowPrevious from '$lib/components/icons/arrows/ArrowPrevious.svelte';
	import type { Snippet } from 'svelte';
	import { circIn, circInOut, circOut, linear } from 'svelte/easing';
	import { derived } from 'svelte/store';
	import { fade } from 'svelte/transition';

	let {
		slides,
		rangeMin,
		rangeMax,
		contentHeight = '20rem'
	}: {
		slides: Array<Snippet>;
		rangeMin?: number;
		rangeMax?: number;
		contentHeight?: string;
	} = $props();

	// Array
	let count: number = $derived(slides.length);
	let index: number = $state(Math.max(rangeMin ?? 1, 1));

	// Navigation
	let canGoPrevious: boolean = $derived(index > (rangeMin ?? 1));
	let canGoNext: boolean = $derived(index < (rangeMax ?? count));

	let canNavigate: boolean = $derived((rangeMax ?? count) - (rangeMin ?? 1) > 0);

	function goPrevious(): void {
		index = Math.max(index - 1, rangeMin ?? 1);
	}

	function goNext(): void {
		index = Math.min(index + 1, rangeMax ?? count);
	}

	function arrowFill(isEnabled: boolean): string {
		return isEnabled ? 'var(--text-primary)' : 'var(--text-tertiary)';
	}
</script>

<div class="x-centerer">
	<div class="slideshow-wrapper">
		{#if count === 0}
			<div class="slide-content-wrapper centerer">Missing slides</div>
		{:else}
			<div class="slide-content-wrapper centerer" style="height: {contentHeight};">
				{#each slides as _, i (i)}
					{#if i === index - 1}
						<div class="slide-content" transition:fade={{ duration: 250, easing: linear }}>
							{@render slides[index - 1]()}
						</div>
					{/if}
				{/each}
			</div>
			{#if canNavigate}
				<div class="slide-controls-wrapper">
					<button class="slide-button" disabled={!canGoPrevious} onclick={goPrevious}
						><ArrowPrevious style="--size: var(--txl); fill: {arrowFill(canGoPrevious)};" /></button
					>
					<button class="slide-button" disabled={!canGoNext} onclick={goNext}
						><ArrowNext style="--size: var(--txl); fill: {arrowFill(canGoNext)};" />
					</button>
				</div>
			{/if}
		{/if}
	</div>
</div>
