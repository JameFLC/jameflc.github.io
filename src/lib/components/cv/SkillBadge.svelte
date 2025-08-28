<script lang="ts">
	let {
		name,
		src
	}: {
		name: string;
		src: string;
	} = $props();
</script>

<div class="wrapper">
	<div class="x-centerer">
		<div class="image-outline">
			<img {src} alt={name} />
		</div>
		<p>{name}</p>
	</div>
</div>

<style>
	.wrapper {
		display: inline-block;
		width: calc(3 * var(--rxxl));
	}

	.image-outline {
		display: flex;
		padding: var(--rm);
		border-radius: var(--rm);
		background-color: var(--layer-2);
		border: 1px solid var(--layer-3);
	}

	img {
		--size: var(--rxxl);
		height: var(--size);
		width: var(--size);
		border-radius: var(--rms);
		border: none;
	}

	p {
		font-weight: var(--fw-book);
		color: var(--text-secondary);
	}
</style>
