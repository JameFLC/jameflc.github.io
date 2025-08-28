<script lang="ts">
	import type { Post } from '$lib/types';
	import IconLinkThin from './icons/IconLinkThin.svelte';
	import Link from './Link.svelte';
	import Translator from './Translator.svelte';

	let {
		post
	}: {
		post: Post;
	} = $props();

	let tags = $derived.by(() => {
		return post.tags.slice(0, 3);
	});
</script>

<li class="post-preview-card">
	<Link propClass="card-link" href={`/blog/${post.slug}`}>
		<div class="post-preview-card-content">
			<div class="card-content">
				<img class="thumbnail" src={post.thumbnail} alt="" srcset="" />
				<h3 class="title">{post.title}</h3>
				<p class="description">{post.description}</p>
			</div>

			<div class="card-footer">
				<div class="learn-more">
					<Translator fr="Découvrir" en="Learn More" />
					<IconLinkThin style="--size: 1ch" />
				</div>
				<div class="tag-container">
					{#each tags as tag}
						<div class="tag">{tag}</div>
					{/each}
				</div>
			</div>
		</div>
	</Link>
</li>

<style>
	:global(.card-link) {
		display: block;
		color: black;
		text-decoration: none;
		border-radius: var(--rl);
		height: 100%;
		padding: 0px;
	}

	.post-preview-card {
		font-size: var(--ts);
		border-radius: var(--rl);
		outline: 1px solid transparent;
		transition: background-color var(--dl) var(--ease-out-circle);
	}

	.post-preview-card:hover {
		background-color: var(--layer-1);
		outline: 1px solid var(--layer-2);
	}

	.post-preview-card:focus {
		background-color: var(--layer-1);
		outline: 1px solid var(--text-primary);
	}

	.post-preview-card-content {
		display: flex;
		flex-direction: column;
		height: calc(100% - 2 * var(--rs));
		justify-content: space-between;
		padding: var(--rs);
	}

	.thumbnail {
		border-radius: var(--rml);
		outline: 1px solid var(--layer-3);
		aspect-ratio: 16/10;
	}

	.title {
		/* font-size: var(--ts); */
		margin-bottom: var(--xs);
		margin-top: var(--ms);
	}

	.description {
		/* font-size: var(--ts); */
		font-weight: var(--fw-light);
		margin-top: var(--xs);
		margin-bottom: var(--xs);
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
	}

	.learn-more {
		display: inline;
		padding: var(--s) var(--m);
		margin: var(--rs);
		background-color: var(--layer-1);
		border-radius: 1000px;

		white-space: nowrap;
		transition: background-color var(--dl) var(--ease-out-circle);
	}

	.learn-more:hover,
	.post-preview-card:hover .learn-more,
	:global(.card-link:focus .learn-more) {
		background-color: var(--layer-3);
	}

	.tag-container {
		display: flex;
		flex-direction: row;
		gap: var(--rs);
		align-items: center;
		overflow: hidden;
		padding-right: var(--rs);
	}

	.tag {
		background-color: var(--background);
		color: var(--text-secondary);
		padding: var(--xs) var(--ms);
		border-radius: 1000px;
		outline: 1px solid var(--layer-2);
	}
</style>
