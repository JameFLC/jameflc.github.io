<script lang="ts">
	import ButtonSlide from '../ButtonSlide.svelte';

	function handleButton() {
		const sides: HTMLDivElement[] = [redSide, greenSide, blueSide];
		const spawned: HTMLDivElement[] = [redSpawned, greenSpawned, blueSpawned];

		sides.forEach((e) => e.classList.remove('active'));
		spawned.forEach((e) => e.classList.remove('active'));

		sides[i % sides.length].classList.add('active');
		spawned[i % spawned.length].classList.add('active');
		let oldi = i;
		while (i == oldi) {
			i = Math.floor(Math.random() * sides.length);
		}
	}

	let i: number = 0;

	let redSide: HTMLDivElement;
	let greenSide: HTMLDivElement;
	let blueSide: HTMLDivElement;

	let redSpawned: HTMLDivElement;
	let greenSpawned: HTMLDivElement;
	let blueSpawned: HTMLDivElement;
</script>

{#snippet red()}
	<div
		style="background-color: var(--red); border-radius: 1000px; width: 4.2rem; height: 4.2rem; outline: 4px solid var(--red-transparent)"
	></div>
{/snippet}

{#snippet green()}
	<div
		style="background-color: var(--green); width: 4rem; height: 4rem; outline: 4px solid var(--green-transparent)"
	></div>
{/snippet}

{#snippet blue()}
	<div
		style="background-color: var(--blue); border-radius: var(--rs); transform: rotate(45deg); width: 3.8rem; height: 3.8rem; outline: 4px solid var(--blue-transparent)"
	></div>
{/snippet}

<ButtonSlide onAction={handleButton}>
	{#snippet content()}
		<div class="wrapper">
			<div class="side-bar">
				<div
					bind:this={redSide}
					class="selection-box centerer"
					style="--background-highlight: var(--red-transparent);"
				>
					{@render red()}
				</div>

				<div
					bind:this={greenSide}
					class="selection-box centerer"
					style="--background-highlight: var(--green-transparent);"
				>
					{@render green()}
				</div>

				<div
					bind:this={blueSide}
					class="selection-box centerer"
					style="--background-highlight: var(--blue-transparent);"
				>
					{@render blue()}
				</div>
			</div>
			<div class="canvas">
				<div class="slot transform-x"><p>Slot / Spawner</p></div>
				<div class="origin transform-x centerer">
					<div class="spawned-wrapper">
						<div bind:this={redSpawned} class="spawned-item transform-x">
							{@render red()}
						</div>

						<div bind:this={greenSpawned} class="spawned-item transform-x">
							{@render green()}
						</div>

						<div bind:this={blueSpawned} class="spawned-item transform-x">
							{@render blue()}
						</div>
					</div>
				</div>
				<div class="spawner transform-x centerer"></div>
			</div>
		</div>
	{/snippet}
</ButtonSlide>

<style>
	.wrapper {
		display: flex;
		height: 20rem;
		width: 22rem;
		border-radius: var(--rs);
		background-color: var(--background);
		outline: 1px solid var(--layer-2);
		padding: var(--rxs);
	}

	.side-bar {
		width: 6rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.canvas {
		width: 16rem;
		position: relative;
		margin: var(--rl) 0px;
	}

	.selection-box {
		aspect-ratio: 1;
		border-radius: var(--tm);
		transition: background-color var(--dxxl) var(--ease-out-circle);
	}

	:global(.selection-box.active) {
		--background-highlight: rgba(255, 0, 0, 0.3);
		background-color: var(--background-highlight);
	}

	.slot {
		position: absolute;
		display: flex;
		width: 10rem;
		height: 6rem;
		bottom: 0;
		left: 50%;
		/* background-color: var(--layer-1); */
		outline: 2px solid var(--layer-2);
		border-radius: var(--rm);
		color: var(--text-secondary);
		justify-content: center;
		align-items: center;
	}

	.transform-x {
		transform: translate(-50%, 0);
	}

	.origin {
		position: absolute;
		height: 8px;
		width: 0px;
		border-radius: 1000px;
		bottom: 6rem;
		left: 50%;
	}

	.spawner {
		position: absolute;
		height: 8px;
		width: 8px;
		border-radius: 1000px;
		bottom: 6rem;
		left: 50%;
		background-color: var(--link-color);
		outline: 2px solid var(--mark-color);
	}

	.spawned-wrapper {
		position: relative;
		width: 0;
	}

	.spawned-item {
		position: absolute;
		bottom: 0;
		transform: translate(-50%, 50%) scale(0);
		transition: transform var(--dm) var(--ease-out-circle);
	}

	:global(.spawned-item.active) {
		transform: translate(-50%, 0) scale(1);
		transition: transform var(--dxl) var(--ease-out-circle);
	}
</style>
