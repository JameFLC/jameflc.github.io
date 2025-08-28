<script lang="ts">
	import { getLangString } from '$lib/langage';
	import IconLinkThin from '../icons/IconLinkThin.svelte';
	import IconLinkThick from '../icons/IconLinkThick.svelte';
	import { page } from '$app/state';

	let {
		src,
		title,
		tag,
		href = '',
		aspectRatio
	}: {
		src: string;
		tag?: string;
		title: string;
		href?: string;
		aspectRatio?: number;
	} = $props();

	function toTitleCase(text: string): string {
		return text
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	function isVideo(path: string): boolean {
		// @ts-ignore
		const ext = path.split('.').pop().toLowerCase();
		return ['mp4', 'webm', 'avi'].includes(ext);
	}

	let linkIsEmpty: boolean = $state(href === '' || href === null);
</script>

{#snippet image()}
	<div class="thumbnail-wrapper" style={aspectRatio !== null ? `aspect-ratio: ${aspectRatio}` : ''}>
		{#if isVideo(src)}
			<video class="thumbnail" autoplay loop muted playsinline>
				<source {src} type="video/{src.split('.').pop().toLowerCase()}" />
				Your browser does not support the video tag.
			</video>
		{:else}
			<img {src} alt={title} class="thumbnail" style="height: 100%; width: 100%" />
		{/if}
		<div class="title-position">
			{#if linkIsEmpty}
				<p
					class="info-container transparent-overlay info"
					style="pointer-events: painted; user-select: none;"
				>
					{toTitleCase(title)}
				</p>
			{:else}
				<div class="title-wrapper">
					<p class="info-container transparent-overlay info">{toTitleCase(title)}</p>

					<div class="link-icon transparent-overlay">
						<IconLinkThin style="--size: 0.75ch" />
					</div>
				</div>
			{/if}
			{#if tag}
				<p
					class="info-container transparent-overlay info"
					style="pointer-events: painted; user-select: none;"
				>
					{toTitleCase(tag)}
				</p>
			{/if}
		</div>
		{#if !linkIsEmpty}
			<div class="tag-position tag-wrapper">
				<p
					class="info-container transparent-overlay link"
					style="pointer-events: painted; user-select: none;"
				>
					{getLangString(page.url.pathname, 'En savoir plus', 'Learn more')}
					<IconLinkThin style="--size: 0.9ch; padding-left: 0.5ch" />
				</p>
			</div>
		{/if}
		<!-- {#if tag}
			<div class="tag-position">
				<p
					class="info-container transparent-overlay"
					style="pointer-events: painted; user-select: none;"
				>
					{toTitleCase(tag)}
				</p>
			</div>
		{/if} -->
	</div>
{/snippet}

{#if href === '' || href === null}
	{@render image()}
{:else}
	<a {href}>
		{@render image()}
	</a>
{/if}

<style>
	.thumbnail-wrapper {
		display: block;
		position: relative;
	}

	a {
		display: flex;
		line-height: 0;
	}
	a:focus {
		outline: 2px solid var(--text-primary);
		border-radius: var(--rm);
		outline-offset: var(--rxs);
	}

	.thumbnail {
		border-radius: var(--rm);
		outline: 1px solid var(--layer-3);
		transition: filter var(--dxl) var(--ease-out-circle);
	}

	a:focus .thumbnail,
	.thumbnail-wrapper:hover .thumbnail {
		filter: contrast(1.2);
	}

	video {
		max-width: 100%;
		height: auto;
		display: block;
	}

	.title-position {
		position: absolute;
		display: flex;
		width: calc(100% - 2 * var(--rms));
		justify-content: space-between;
		top: var(--rms);
		/* left: 0; */
		padding-inline: var(--rms);
	}

	.tag-position {
		position: absolute;
		bottom: var(--rl);
		left: 0;
	}

	.title-wrapper {
		display: flex;
		flex-direction: row;
		gap: var(--s);
		align-items: center;
	}

	.tag-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.info-container {
		padding: var(--rxs) var(--rms);
		border-radius: 1000px;
		margin: 0;
		line-height: 1.2;
	}

	.info {
		font-size: var(--ts);
		transition: font-size var(--dxxl) var(--ease-out-circle);
	}

	.title-wrapper,
	.info-container {
		color: var(--text-primary);
		text-decoration: none;
		margin: 0;
	}

	a:focus .info,
	.thumbnail-wrapper:hover .info {
		font-size: var(--txs);
	}

	.link {
		font-size: var(--txs);
		opacity: 0;
		transition:
			font-size var(--dxxxl) var(--ease-out-circle),
			opacity var(--dl) var(--ease-out-circle),
			backdrop-filter var(--dl) var(--ease-out-circle);
	}

	.thumbnail-wrapper:hover .link {
		font-size: var(--ts);
		opacity: 1;

		transition:
			font-size var(--dxxxl) var(--ease-out-circle),
			opacity var(--dl) linear;
	}

	.link-icon {
		display: flex;
		aspect-ratio: 1/1;
		align-items: center;
		justify-content: center;

		border-radius: 1000px;
		height: 1.75ch;
	}
</style>
