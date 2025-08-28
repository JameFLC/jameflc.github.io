<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div class="content-wrapper-home">
	{@render children()}
	<footer></footer>
</div>
