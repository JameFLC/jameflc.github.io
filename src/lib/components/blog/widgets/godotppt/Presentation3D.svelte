<script lang="ts">
	import { page } from '$app/state';
	import { getLangString } from '$lib/langage';

	let isRunning: boolean = $state(false);
</script>

<div class="centerer">
	<div class="wrapper centerer round-outline">
		{#if isRunning}
			<iframe
				src="/images//blog/GodotPPT/engine/index.html"
				frameborder="0"
				title="GodotPPT"
				width="100%"
				height="100%"
			></iframe>
		{:else}
			<div class="button-wrapper centerer round-outline">
				<button
					onclick={() => {
						isRunning = true;
					}}
					>{getLangString(
						page.url.pathname,
						'Lancer la présentation',
						'Launch Presentation'
					)}</button
				>
			</div>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		width: max(100%, 70vw);
		height: 70vh;
		background-color: var(--layer-1);
	}

	.round-outline {
		border-radius: var(--rm);
		outline: 1px solid var(--layer-3);
		overflow: hidden;
	}

	.button-wrapper {
		width: auto;
		border-radius: var(--rs);
		padding: var(--rxxl);
		background-color: var(--background);
	}
	button {
		margin: auto;

		background-color: var(--layer-2);
		outline: 1px solid var(--layer-3);
		font-weight: var(--fw-black);
		font-size: var(--tl);
	}
</style>
