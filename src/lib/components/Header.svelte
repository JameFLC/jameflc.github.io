<script>
	import Logo from './icons/Logo.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import NavBar from './NavBar.svelte';
	import NavBarLink from './NavBarLink.svelte';
</script>

<header>
	<nav>
		<NavBarLink href="/">
			<div class="logo">
				<Logo style="--size: calc(var(--m) * 0.75)" />
				<span>Jame FLC</span>
			</div>
		</NavBarLink>
		<NavBar />
		<!-- <div class="language">
			<LangSwitch />
		</div> -->
	</nav>
</header>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: var(--ml);
		height: calc(var(--xxl));
		border-bottom: 1px solid var(--layer-2);
	}

	.logo {
		font-size: var(--tl);
		font-weight: 900;
	}
</style>
