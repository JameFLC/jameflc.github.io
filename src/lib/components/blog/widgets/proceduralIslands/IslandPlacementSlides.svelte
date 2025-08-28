<script lang="ts">
	import SlideShow from '../SlideShow.svelte';
	import KeptIslandsNoOffsets from './slides/KeptIslandsNoOffsets.svelte';
	import KeptIslandsOffsets from './slides/KeptIslandsOffsets.svelte';

	let {
		rangeMin,
		rangeMax
	}: {
		rangeMin?: number;
		rangeMax?: number;
	} = $props();
</script>

{#snippet slide1()}
	<KeptIslandsNoOffsets />
{/snippet}

{#snippet slide2()}
	<KeptIslandsOffsets />
{/snippet}

<SlideShow slides={[slide1, slide2]} {rangeMin} {rangeMax} contentHeight="24rem" />
