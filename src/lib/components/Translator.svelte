<script lang="ts">
	import ContentSwitch from '$lib/components/ContentSwitch.svelte';

	let { fr, en }: { fr: string; en: string } = $props();
</script>

<ContentSwitch>
	{#snippet french()}
		{fr}
	{/snippet}
	{#snippet english()}
		{en}
	{/snippet}
</ContentSwitch>
