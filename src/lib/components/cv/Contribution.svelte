<script lang="ts">
    let {
            src,
            name,
        }: {
            src: string;
            name: string;
        } = $props();
</script>

<figure>
    <img {src} alt={name} class="thumbnail"/>
    <figcaption class="text-heavy">{name}</figcaption>
</figure>

<style>
    .thumbnail {
		border-radius: var(--rm);
		outline: 1px solid var(--layer-3);
		aspect-ratio: 16/9;
	}

    figure {
        margin: 0;
    }

    figcaption {
        font-size: var(--tl);
        color: var(--text-primary);
    }
</style>