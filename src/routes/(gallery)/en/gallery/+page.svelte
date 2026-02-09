<script lang="ts">
	import { page } from '$app/state';
	import { websiteURL } from '$lib';
	import GalleryThumbnail from '$lib/components/gallery/GalleryThumbnail.svelte';
</script>

<svelte:head>
	<title>Gallery Jame FLC</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Galery" />
	<meta property="og:description" content="Jame Floc'h Le Carour's projects gallery" />
	<meta property="og:image" content={websiteURL + '/images/thumbnails/Home.webp'} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={websiteURL} />
	<meta property="twitter:url" content={websiteURL + page.url.pathname} />
	<meta name="twitter:title" content="Galery" />
	<meta name="twitter:description" content="Jame Floc'h Le Carour's projects gallery" />
	<meta name="twitter:image" content={websiteURL + '/images/thumbnails/Home.webp'} />
</svelte:head>

<h1>Gallery</h1>
<div class="auto-grid" style="gap: var(--rl);">
	<GalleryThumbnail
		src="/images/gallery/DodgyOrb.webp"
		title="Dodgy Orb"
		tag="Game"
		aspectRatio={16 / 9}
		href="/blog/dodgy-orb"
	/>

	<GalleryThumbnail
		src="/images/gallery/StrikeAndSorcery.webp"
		title="Strike and Sorcery"
		tag="Game"
		aspectRatio={16 / 9}
		href="https://82l.itch.io/strike-and-sorcery"
	/>

	<GalleryThumbnail
		src="/images/gallery/HologramDemo.webp"
		title="Holograms"
		tag="Software"
		href="/blog/hologram"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/ProceduralGen.webp"
		title="Procedural Islands"
		tag="Game"
		href="/blog/nimbus-nibbler"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/E428.webp"
		title="E428"
		tag="Game"
		aspectRatio={16 / 9}
		href="/blog/e428"
	/>

	<GalleryThumbnail
		src="/images/gallery/LowPolyTemple.webp"
		title="Sky Garden"
		href="https://jameflc.itch.io/skygarden"
		tag="Game"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/Field.mp4"
		title="Nature Scene"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/LePointHistoire.mp4"
		title="3D TV News Set"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/UnrealTemple.webp"
		title="Modular Temple"
		tag="Game"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/GlitchedText.webp"
		title="Glitched Typography"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/CorridorCreepy.webp"
		title="Corridor"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/VirtualTemple.mp4"
		title="Virtual Temple Backdrop"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/FaceDenoise.webp"
		title="Ink Face"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/PillWallpaper.webp"
		title="Concrete Pills"
		tag="Render"
		aspectRatio={16 / 9}
	/>
	<GalleryThumbnail
		src="/images/gallery/Speaker_White.webp"
		title="Minimalist Speakers"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/Keyboard_White.webp"
		title="Low Profile Keyboard"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/Trackpad_White.webp"
		title="Trackpad"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/Screen_White.webp"
		title="Curved Screen"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/RobotTruvanov.webp"
		title="Wheel Robot"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/GlitchedEmoji.webp"
		title="ASCII Face"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/Engram.webp"
		title="Dodecahedron"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/Bilican.webp"
		title="Disco Spaceship"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/PrecisionDonut Flower.webp"
		title="Float Glitch"
		tag="Render"
		aspectRatio={16 / 9}
	/>

	<GalleryThumbnail
		src="/images/gallery/PrecisionDonutSunFlower.webp"
		title="Float Glitch"
		tag="Render"
		aspectRatio={16 / 9}
	/>
</div>
