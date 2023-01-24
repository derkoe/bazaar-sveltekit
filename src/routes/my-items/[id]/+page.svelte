<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { item } = data;
</script>

<div>
	{item.title}
</div>
