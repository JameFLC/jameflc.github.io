<script lang="ts">
	import ImageLine from '$lib/components/blog/layout/ImageLine.svelte';
	import Link from '$lib/components/Link.svelte';
	import PageLink from '$lib/components/PageLink.svelte';
	import PostPreviewCard from '$lib/components/PostPreviewCard.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';

	let { data } = $props();

	let projects = $derived.by(() => {
		return data.posts.filter((post) => {
			return post.type === 'project';
		});
	});

	let articles = $derived.by(() => {
		return data.posts.filter((post) => {
			return post.type === 'article';
		});
	});
</script>

<div class="content-wrapper-home">
	<h1>Hello and welcome to my corner of the internet!</h1>

	<p>
		I am <span class="text-black">Jame</span>, a
		<span class="text-semi-bold">software engineer</span>, game developer and 3D enjoyer based in
		France. I specialize in topics related to 3D, animation, UI, and UX.
		This website is here to be a space to share my journey, projects and my joy of programming.
		<br />
		<br />
		If you like what you find here then feel free to <Link href="/cv">reach out</Link> 😉
	</p>

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
		<SectionTitle href="/">Latest Projects</SectionTitle>
		<ul
			class="auto-grid clean-list mobile-side-merge"
			style="gap: var(--rl); --element-min-width: 22rem"
		>
			{#each projects as post}
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
