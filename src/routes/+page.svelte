<script lang="ts">
	import { websiteURL } from '$lib';
	import ImageLine from '$lib/components/blog/layout/ImageLine.svelte';
	import LearnMore from '$lib/components/LearnMore.svelte';
	import Link from '$lib/components/Link.svelte';
	import PostPreviewCard from '$lib/components/PostPreviewCard.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Jame FLC</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="jame.works" />
	<meta property="og:description" content="Site personnel de Jame Floc'h Le Carour" />
	<meta property="og:image" content={websiteURL + '/images/thumbnails/Home.webp'} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={websiteURL} />
	<meta property="twitter:url" content={websiteURL} />
	<meta name="twitter:title" content="jame.works" />
	<meta name="twitter:description" content="Site personnel de Jame Floc'h Le Carour" />
	<meta name="twitter:image" content={websiteURL + '/images/thumbnails/Home.webp'} />
</svelte:head>

<div class="content-wrapper-home">
	<h1>Bonjour et bienvenue dans mon coin d'internet !</h1>

	<p>
		Je suis <span class="text-black">Jame</span>, un
		<span class="text-semi-bold">Ingénieur Informatique</span>, game developer et créateur 3D. 
		Je me spécialise dans les sujets qui tournent autour de la <span class="text-heavy">3D</span>, <span class="text-heavy">de l'animation</span>, de l'<span class="text-heavy">UI</span> et de l'<span class="text-heavy">UX</span>.
		Ce site est là pour partager mon parcours, mes projets et mes expériences.
		<br />
		<br />
		Si vous aimez ce que vous trouvez ici, n'hésitez pas à <Link href="/cv">me contacter</Link> 😉
	</p>

	<br />
	<ImageLine
		images={[
			'/images/gallery/ProceduralGen.webp',
			'/images/gallery/StrikeAndSorcery.webp',
			'/images/gallery/LowPolyTemple.webp'
		]}
		alt=""
		aspectRatio={16 / 9}
	/>

	<section>
		<SectionTitle>Derniers Projets</SectionTitle>
		<ul class="auto-grid clean-list" style="gap: var(--rl); --element-min-width: 22rem">
			{#each data.posts as post}
				<PostPreviewCard {post} />
			{/each}
		</ul>
	</section>

	<ImageLine
		images={[
			'/images/gallery/PrecisionDonut Flower.webp',
			'/images/gallery/GlitchedText.webp',
			'/images/gallery/PrecisionDonutSunFlower.webp'
		]}
		alt=""
		aspectRatio={21 / 9}
	/>

	<div class="footer-padding"></div>
</div>
