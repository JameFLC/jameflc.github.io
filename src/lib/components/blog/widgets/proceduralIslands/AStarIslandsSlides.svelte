<script lang="ts">
	import { getLangString } from '$lib/langage';
	import { page } from '$app/state';
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
	<img
		src="/images/blog/ProceduralIslands/Empty Grid.svg"
		style="width: 24rem;"
		alt={getLangString(page.url.pathname, 'Grille vide', 'Empty Grid')}
	/>
{/snippet}

{#snippet slide2()}
	<img
		src="/images/blog/ProceduralIslands/Grid Islands.svg"
		style="width: 24rem;"
		alt={getLangString(
			page.url.pathname,
			'Grille contentant des îles placées aléatoirement',
			'Grid Containing randomly placed islands'
		)}
	/>
{/snippet}

{#snippet slide3()}
	<img
		src="/images/blog/ProceduralIslands/Grid Islands Paths.svg"
		style="width: 24rem;"
		alt={getLangString(
			page.url.pathname,
			'Grille contentant des îles placées aléatoirement avec des chemins entre les îles',
			'Grid Containing randomly placed islands with paths between each others'
		)}
	/>
{/snippet}

<SlideShow slides={[slide1, slide2, slide3]} {rangeMin} {rangeMax} contentHeight="22rem" />
