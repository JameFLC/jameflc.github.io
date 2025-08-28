<script lang="ts">
	import { page } from '$app/state';
	import { getLangString } from '$lib/langage';
	import SlideInput from '../SlideInput.svelte';
</script>

<SlideInput>
	{#snippet content(value)}
		<img
			src="/images/blog/Escalarmonie/UI_Style.webp"
			class="rounded-image"
			style="width: 90%; filter: hue-rotate({value * 360}deg)"
			alt=""
		/>
	{/snippet}
</SlideInput>

<style>
</style>
