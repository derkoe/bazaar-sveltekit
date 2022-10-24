<script lang="ts">
	export let to: string;
	function handleClick() {
		if (document && document.activeElement) {
			(document.activeElement as HTMLElement).blur();
		}
	}
</script>

<li>
	<a href={to} on:click={handleClick}>
		<slot />
	</a>
</li>
