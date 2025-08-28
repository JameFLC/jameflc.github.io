<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		defaultValue = 0,
		height = 24,
		content
	}: {
		defaultValue?: number;
		height?: number;
		content: Snippet<[number]>;
	} = $props();

	let sliderValue: number = $state(defaultValue ?? 0);
</script>

<div class="x-centerer">
	<div class="slideshow-wrapper">
		<div class="slide-content-wrapper centerer" style="height: {height}rem;">
			<div class="slide-content">
				{@render content(sliderValue)}
			</div>
		</div>

		<div class="slide-controls-wrapper">
			<input
				class="slide-range"
				type="range"
				bind:value={sliderValue}
				min="0"
				max="1"
				step="0.01"
			/>
		</div>
	</div>
</div>
