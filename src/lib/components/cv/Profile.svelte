<script lang="ts">
	import { page } from '$app/state';
	import { getLangString } from '$lib/langage';
	import type { Snippet } from 'svelte';

	let {
		children,
		...others
	}: {
		children?: Snippet;
	} = $props();
</script>

<div class="profile-wrapper">
	<div class="face-wrapper">
		<input
			class="face-toggle"
			type="checkbox"
			aria-label={getLangString(
				page.url.pathname,
				"Basculer la visibilié de l'image de profile de Jame",
				"Toggle Jame's profile picture"
			)}
		/>
		<div class="image-wrapper">
			<img
				class="face"
				src="/images/face.webp"
				alt={getLangString(page.url.pathname, 'La tête de Jame', "Jame's Face")}
			/>
			<div class="tooltip">
				{getLangString(page.url.pathname, 'Afficher Jame', "Display Jame's Face")}
			</div>
		</div>
	</div>
	<div class="child-wrapper">
		{@render children?.()}
	</div>
</div>

<style>
	.profile-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: var(--rml);
	}

	.face-wrapper {
		display: flex;
		position: relative;
		border-radius: var(--rl);
	}

	.face-wrapper:has(.face-toggle:focus) {
		outline: 2px solid var(--text-primary);
	}

	.face-toggle {
		appearance: none;
		position: absolute;
		z-index: 1;
		border-radius: inherit;
		width: 100%;
		height: 100%;
		/* fix em sizing */
		padding: 0;
		margin: 0;
		font: inherit;
		opacity: 0;
		cursor: pointer;
	}

	.image-wrapper {
		position: relative;
		display: flex;
		border-radius: inherit;
	}

	.face {
		height: 12.5rem;
		width: 12.5rem;
		border-radius: inherit;
		user-select: none;
		filter: saturate(0) blur(var(--m));
		transition: filter 500ms var(--ease-out-circle);
	}

	.face-toggle:checked + .image-wrapper .face {
		filter: saturate(1) blur(0px);
	}

	.tooltip {
		position: absolute;
		background-color: var(--layer-2);
		padding: var(--rs) var(--rxs);
		outline: 1px solid var(--layer-3);
		border-radius: var(--rms);
		bottom: 0;
		text-align: center;
		width: 100%;
		pointer-events: painted;
	}

	.face-toggle:hover + .image-wrapper .tooltip,
	.face-toggle:focus + .image-wrapper .tooltip {
		opacity: 100%;
		transform: scale(1);
		transition:
			opacity 500ms var(--ease-out-circle),
			transform 750ms var(--ease-out-circle);
	}

	@media (pointer: coarse) and (hover: none) {
		/* Likely a touch-only device */
		.face-toggle + .image-wrapper .tooltip {
			opacity: 100%;
			transform: scale(1);
			transition:
				opacity 500ms var(--ease-out-circle),
				transform 750ms var(--ease-out-circle);
		}
	}

	.tooltip,
	.face-toggle:checked + .image-wrapper .tooltip {
		opacity: 0%;
		transform: scale(0.9) translate(0, 4px);
		transition:
			opacity 250ms var(--ease-out-circle),
			transform 250ms var(--ease-out-circle);
	}

	.child-wrapper {
		display: block;
		max-width: 50ch;
	}
</style>
