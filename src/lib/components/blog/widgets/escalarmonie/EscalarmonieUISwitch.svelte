<script lang="ts">
	import { page } from '$app/state';
	import { getLangString } from '$lib/langage';
</script>

<figure>
	<div class="images-wrapper rounded-image">
		<img
			src="/images/blog/Escalarmonie/GreenStyle.webp"
			alt={getLangString(page.url.pathname, 'Interface verte', 'Green UI')}
		/>

		<img
			src="/images/blog/Escalarmonie/OrangeStyle.webp"
			alt={getLangString(page.url.pathname, 'Interface orange', 'Orange UI')}
			class="fade"
		/>
	</div>

	<figcaption>
		{getLangString(
			page.url.pathname,
			'Interface du projet changeant de couleurs en fonction de la playlist sélectionné',
			'Project user interface changing colors depending on the selected playlist'
		)}
	</figcaption>
</figure>

<style>
	.images-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 16/9;
	}

	.images-wrapper img {
		position: absolute;
		height: 100%;
		width: 100%;
	}

	.fade {
		animation-name: fadeIn;
		animation-duration: 4s;
		animation-timing-function: var(--ease-out-circle);
		animation-fill-mode: both;
		animation-iteration-count: infinite;
	}
	@keyframes fadeIn {
		0%,
		25% {
			opacity: 0;
		}
		50%,
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
