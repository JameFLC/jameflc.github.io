<script>
	import IconBlog from './icons/navbar/IconBlog.svelte';
	import IconCraft from './icons/navbar/IconCraft.svelte';
	import IconCv from './icons/navbar/IconCV.svelte';
	import IconHome from './icons/navbar/IconHome.svelte';
	import NavBarLink from './NavBarLink.svelte';
	import Translator from './Translator.svelte';
</script>

<div class="navbar-wrapper">
	<nav class="navbar">
		<NavBarLink href="/">
			<div class="link-content">
				<IconHome />
				<Translator fr="Accueil" en="Home" />
			</div>
		</NavBarLink>
		<NavBarLink href="/gallery">
			<div class="link-content">
				<IconCraft />
				<Translator fr="Gallerie" en="Gallery" />
			</div>
		</NavBarLink>
		<!-- <NavBarLink href="/">
			<div class="link-content">
				<IconBlog />
				<span>Blog</span>
			</div>
		</NavBarLink> -->
		<NavBarLink href="/cv">
			<div class="link-content">
				<IconCv />
				<span>CV</span>
			</div>
		</NavBarLink>
	</nav>
</div>

<style>
	.navbar-wrapper {
		display: flex;
		align-items: start;
		justify-content: center;
		position: fixed;
		pointer-events: none;
		width: 100vw;
		height: 100vh;
		height: 100svh;
		left: 0;
		right: 0;
		top: 0;
		margin-left: auto;
		margin-right: auto;
		z-index: 1000;
	}

	@media (max-width: 1000px) {
		.navbar-wrapper {
			align-items: end;
		}
	}

	.navbar {
		display: flex;
		width: content;
		pointer-events: all;
		z-index: 1000;
		margin: calc(var(--s) + var(--xs));
		padding: var(--s);

		background-color: var(--layer-1);
		border-radius: 1000px;
		outline: 1px solid var(--layer-2);
		gap: var(--xs);
		font-size: var(--ts);
	}

	.link-content {
		display: flex;
		align-items: center;
		gap: var(--s);
	}

	@media (max-width: 500px) {
		.navbar {
			gap: var(--s);
			width: calc(100vw - var(--rm));
			justify-content: space-between;
			gap: var(--m);
		}

		:global(.navbar > *) {
			width: 100%;
		}

		.link-content {
			flex-direction: column;
			align-items: center;
			width: 100%;
			flex-grow: 1;
			gap: 0px;
		}
	}
</style>
