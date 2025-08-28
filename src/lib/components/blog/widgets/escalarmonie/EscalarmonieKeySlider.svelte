<script lang="ts">
	import { page } from '$app/state';
	import { getLangString } from '$lib/langage';
	import SlideInput from '../SlideInput.svelte';
</script>

<SlideInput height={12} defaultValue={0.5}>
	{#snippet content(value)}
		<div class="key-wrapper">
			{#each { length: value * 7 + 1 }, i}
				<div class="key">{i + 1}</div>
			{/each}
		</div>
	{/snippet}
</SlideInput>

<style>
	.key-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		overflow: hidden;
		background-color: var(--background);
		border-radius: var(--rm);
		outline: 1px solid var(--layer-3);
		height: 8rem;
		width: 23rem;
	}

	.key {
		--size: 2rem;
		height: var(--size);
		width: var(--size);
		line-height: var(--size);
		color: white;
		font-weight: var(--fw-bold);
		font-size: var(--tm);
		background-color: red;
		text-align: center;
		border-radius: 1000px;
		background: linear-gradient(
			180deg,
			rgba(4, 217, 106, 1) 0%,
			rgba(9, 150, 77, 1) 22%,
			rgba(11, 125, 66, 1) 51%,
			rgba(6, 107, 55, 1) 82%,
			rgba(2, 90, 45, 1) 100%
		);
		border: 2px solid #00994a;
	}
</style>
