<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<div class="flex">
		<h1 class="text-xl m-4 flex-grow">My items</h1>
		<form method="post">
			<button type="submit" class="btn btn-primary"> New item </button>
		</form>
	</div>

	<table class="table w-full">
		<thead>
			<tr>
				<th>Name</th>
				<th>Image</th>
				<th>Actions</th>
			</tr>
		</thead>
		{#each data.items as item}
			<tr>
				<td>{item.title}</td>
				<td
					><figure>
						<img src="https://placeimg.com/200/112/arch" alt="Shoes" />
					</figure>
				</td>
				<td><a href="/my-items/{item.rowKey}">Edit</a></td>
			</tr>
		{/each}
	</table>
</div>
