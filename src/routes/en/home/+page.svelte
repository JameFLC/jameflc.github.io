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
	<h1>Hello and welcome to my little corner of the internet !</h1>

	<p>
		I am <span class="text-black">Jame</span>, a
		<span class="text-semi-bold">software engineer</span>, game developer and 3D enjoyer based in
		France. I find joy in building things that can be played, displayed, rotated and clicked, it
		makes my brain tick. I take pride in making quality software that feel good to use being games,
		apps or tools. This site is here to be a space to share my journey, projects and my joy of
		building things.
		<br />
		<br />
		If you like what you find here then feel free to <Link href="/cv">reach out</Link> 😉
	</p>

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
		<PageLink href="/">More Projects</PageLink>
	</section>

	<ImageLine
		images={[
			'https://picsum.photos/id/112/320/150',
			'https://picsum.photos/id/37/320/150',
			'https://picsum.photos/id/89/320/150'
		]}
		alt=""
		aspectRatio={22 / 9}
	/>

	<section>
		<SectionTitle href="/">Latest Articles</SectionTitle>
		<ul class="auto-grid clean-list" style="gap: var(--rl); --element-min-width: 22rem">
			{#each articles as post}
				<PostPreviewCard {post} />
			{/each}
		</ul>
		<PageLink href="/">More Articles</PageLink>
	</section>

	<ImageLine
		images={[
			'https://picsum.photos/id/358/320/150',
			'https://picsum.photos/id/400/320/150',
			'https://picsum.photos/id/121/320/150'
		]}
		alt=""
		aspectRatio={22 / 9}
	/>

	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
</div>
