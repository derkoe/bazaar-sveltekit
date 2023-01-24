<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<h1 class="text-xl m-4">Offering</h1>
	<div class="flex flex-wrap">
		{#each data.items as item}
			<div class="card max-w-md mr-5 bg-base-100 shadow-xl">
				<figure>
					<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
				</figure>
				<div class="card-body">
					<h2 class="card-title">{item.title}</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
					<div class="card-actions justify-end">
						<button class="btn btn-primary">Details</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
