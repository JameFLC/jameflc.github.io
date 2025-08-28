<script lang="ts">
	import { slide } from 'svelte/transition';
	import SlideShow from '../SlideShow.svelte';
	import IslandGrid from './slides/IslandGrid.svelte';
	import NoiseGrid from './slides/NoiseGrid.svelte';
	import GaussianGrid from './slides/GaussianGrid.svelte';
	import NoiseGausianGrid from './slides/NoiseGausianGrid.svelte';
	import MaskGrid from './slides/MaskGrid.svelte';
	import NoiseGaussianMaskGrid from './slides/NoiseGaussianMaskGrid.svelte';
	import NoiseThresholdGrid from './slides/NoiseThresholdGrid.svelte';
	import KeptIslandsInGrid from './slides/KeptIslandsInGrid.svelte';
	import KeptIslandsOffsetInGrid from './slides/KeptIslandsOffsetInGrid.svelte';
	import KeptIslandsOffsets from './slides/KeptIslandsOffsets.svelte';
	import KeptIslandsWithBridges from './slides/KeptIslandsWithBridges.svelte';
	import KeptIslandsGrid from './slides/KeptIslandsGrid.svelte';

	let {
		rangeMin,
		rangeMax
	}: {
		rangeMin?: number;
		rangeMax?: number;
	} = $props();
</script>

{#snippet slide1()}
	<IslandGrid />
{/snippet}

{#snippet slide2()}
	<NoiseGrid />
{/snippet}

{#snippet slide3()}
	<GaussianGrid />
{/snippet}

{#snippet slide4()}
	<NoiseGausianGrid />
{/snippet}

{#snippet slide5()}
	<MaskGrid />
{/snippet}

{#snippet slide6()}
	<NoiseGaussianMaskGrid />
{/snippet}

{#snippet slide7()}
	<NoiseThresholdGrid />
{/snippet}

{#snippet slide8()}
	<KeptIslandsGrid />
{/snippet}

{#snippet slide9()}
	<KeptIslandsInGrid />
{/snippet}

{#snippet slide10()}
	<KeptIslandsOffsetInGrid />
{/snippet}

{#snippet slide11()}
	<KeptIslandsOffsets />
{/snippet}

{#snippet slide12()}
	<KeptIslandsWithBridges />
{/snippet}

<SlideShow
	slides={[
		slide1,
		slide2,
		slide3,
		slide4,
		slide5,
		slide6,
		slide7,
		slide8,
		slide9,
		slide10,
		slide11,
		slide12
	]}
	{rangeMin}
	{rangeMax}
	contentHeight="24rem"
/>
