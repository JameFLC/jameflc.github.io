<script lang="ts">
	import type { Post } from '$lib/types';
	import Translator from '../Translator.svelte';

	let {
		PostData
	}: {
		PostData: Post;
	} = $props();
</script>

<hgroup class="mobile-side-merge">
	<h1 class="title">{PostData.title}</h1>
	<p class="published">
		<Translator fr="Publié le" en="Published on" />
		{PostData.date}
		<!-- TODO : Format the date correctly -->
	</p>
	<div class="thumbnail-wrapper">
		<img class="thumbnail" src={PostData.thumbnail} alt="" />
	</div>
</hgroup>

<style>
	.title {
		text-align: center;
	}

	.published {
		text-align: center;
		font-size: var(--ts);
		color: var(--text-secondary);
	}

	.thumbnail-wrapper {
		display: block;
		aspect-ratio: 2/1;
		margin-top: var(--rxl);
		margin-bottom: var(--rxl);
	}

	.thumbnail {
		border-radius: var(--rml);
		outline: 1px solid var(--layer-3);
		height: 100%;
		width: 100%;
	}

	@media (max-width: 500px) {
		.title {
			font-size: var(--txl);
			text-align: start;
			letter-spacing: 1px;
			margin-inline: var(--window-padding);
		}

		.thumbnail {
			border-radius: 0px;
			aspect-ratio: 16/10;
		}
	}
</style>
