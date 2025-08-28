<script lang="ts">
	import { lerpVector2, type Vector2 } from '$lib/types';
	import SlideInput from '../SlideInput.svelte';

	// prettier-ignore
	let voronoiOffsets: Vector2[] = [
		{ x: 10, y: 10 }, { x: 12, y: -15 }, { x: 10, y: 15 }, { x: -12, y: 10 },
		{ x: 2,  y: -15 }, { x: -10, y: 15  }, { x: -10, y: -8 }, { x: 10, y: 0 },
		{ x: 10, y: 8 }, { x: 8, y: 15 }, { x: -10, y: -10}, { x: -10, y: -5 },
		{ x: -15, y: 15 }, { x: 18, y: 15 }, { x: 15, y: -16 }, { x: 10, y: -15 }
	];

	function lerpTransform(vector: Vector2, amount: number): Vector2 {
		return lerpVector2({ x: 0, y: 0 }, vector, amount);
	}

	function formatTransform(index: number, amount: number): string {
		const newVector = lerpTransform(voronoiOffsets[index], amount);
		return `translate(${newVector.x}px, ${newVector.y}px)`;
	}
</script>

<SlideInput>
	{#snippet content(value)}
		<div class="grid">
			{#each { length: 4 * 4 } as _, index}
				<div class="cell centerer">
					<div class="distance-field" style="transform: {formatTransform(index, value)};"></div>
				</div>
			{/each}
		</div>
	{/snippet}
</SlideInput>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		outline: 2px solid var(--layer-3);
		border-radius: var(--rm);
		overflow: hidden;
	}

	.cell {
		--size: 5rem;
		height: var(--size);
		width: var(--size);
		aspect-ratio: 1;
		background-color: white;
		outline: 2px solid var(--layer-2);
	}

	.distance-field {
		--size: 9rem;
		height: var(--size);
		width: var(--size);
		aspect-ratio: 1;
		border-radius: 1000px;

		background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 50%);

		mix-blend-mode: darken;
	}
</style>
