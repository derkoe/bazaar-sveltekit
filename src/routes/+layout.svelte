<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.postcss';
	import NavItem from '../components/NavItem.svelte';
	export let data: LayoutData;
	const { user } = data;
</script>

<svelte:head>
	<title>Bazaar</title>
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
	<link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
</svelte:head>

<nav class="navbar bg-neutral text-neutral-content">
	<div class="navbar-start">
		{#if user}
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 cursor-pointer md:hidden block"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</label>
				<ul class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					<NavItem to="offering">Offering</NavItem>
					<NavItem to="searching">Searching For</NavItem>
					<NavItem to="my-items">My Items</NavItem>
				</ul>
			</div>
		{/if}
		<a href="/" class="btn btn-ghost normal-case text-xl">Bazaar</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		{#if user}
			<ul class="menu menu-horizontal p-0">
				<NavItem to="offering">Offering</NavItem>
				<NavItem to="searching">Searching For</NavItem>
				<NavItem to="my-items">My Items</NavItem>
			</ul>
		{/if}
	</div>
	<div class="navbar-end">
		{#if user}
			<div class="btn btn-ghost btn-circle avatar" title="{user.userDetails}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					fill="currentColor"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path
						d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
					/>
				</svg>
			</div>
		{:else}
			<a href=".auth/login/aad" class="btn"> Login </a>
		{/if}
	</div>
</nav>
<main class="px-2 py-2">
	<slot />
</main>
