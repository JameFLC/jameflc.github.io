<script lang="ts">
	import { page } from '$app/state';
	import { getLangString } from '$lib/langage';
	import SlideInput from '../SlideInput.svelte';
</script>

<SlideInput defaultValue={1}>
	{#snippet content(value)}
		<div class="stair-wrapper">
			<div class="stair-step first-step">
				<div class="text">
					{getLangString(page.url.pathname, 'Distance de détection : ', 'Detection Range')}
					{(value * 5).toFixed(1)} m
				</div>
			</div>
			{#each { length: 7 } as i}
				<div class="stair-step">
					<div class="sensor"></div>
					<div class="lazer" style="width: {value * 100}%;"></div>
				</div>
			{/each}
		</div>
	{/snippet}
</SlideInput>

<style>
	.stair-wrapper {
		outline: 1px solid var(--layer-3);
		border-radius: var(--rm);
		overflow: hidden;
		height: 100%;
		width: 100%;
	}

	.stair-step {
		display: flex;
		flex-direction: row;

		align-items: center;

		height: 2.5rem;
		width: 20rem;
		padding-inline: var(--rs);
		background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 50%,
			hsl(0, 0%, 85%) 90%,
			hsl(0, 0%, 60%) 100%
		);
		outline: 1px solid var(--layer-3);
	}

	.first-step {
		background: white;
		text-align: center;
		justify-content: center;
	}

	.sensor {
		height: 1rem;
		width: 0.5rem;
		background-color: var(--layer-7);
		border: 2px solid var(--layer-6);
		border-radius: var(--rxs);
	}

	.lazer {
		height: 0.5rem;
		width: 100%;
		border-radius: var(--rxs);
		background: linear-gradient(
			90deg,
			#b5faff 0%,
			#d5feff 25%,
			#b5faff 50%,
			#d5feff 75%,
			#b5faff 100%
		);
		background-size: 200% 200%;

		mix-blend-mode: multiply;
		filter: blur(2px);
		animation: gradient 0.5s linear infinite;
	}

	@keyframes gradient {
		0% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
