<script lang="ts">
	let {
		alt,
		images,
		aspectRatio
	}: {
		alt: string;
		images: string[];
		aspectRatio?: number;
	} = $props();

	function getRadius(): string {
		return images.length >= 4 ? '--rs' : '--rm';
	}

	function setAspectRatio(): string {
		return aspectRatio ? `aspect-ratio: ${aspectRatio};` : '';
	}
</script>

<figure>
	<div class="images-wrapper">
		{#each images as image}
			<div class="image-wrapper" style="--radius: var({getRadius()}); {setAspectRatio()}">
				<img src={image} alt="" style="height: 100%; width: 100%" />
			</div>
		{/each}
	</div>

	{#if alt}
		<figcaption>{alt}</figcaption>
	{/if}
</figure>

<style>
	.images-wrapper {
		width: 100%;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		gap: var(--rs);
	}

	.images-wrapper img {
		--radius: var(--rm);
		border-radius: var(--radius);
		border: 1px solid var(--layer-3);
	}
</style>
