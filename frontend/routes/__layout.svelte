<script>
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	const routes = [
		{ title: 'Home', route: '' },
		{ title: 'Hangman', route: '/hangman' }
	];
</script>

<section class="hero">
	<div class="hero-body">
		<p class="title">Een potje</p>
		<p class="subtitle">By ShinyRa</p>
	</div>
</section>
<main>
	<aside class="menu">
		<ul class="menu-list">
			{#each routes as { title, route }}
				<li>
					<a href={null} on:click={() => goto(`${base}${route}`)}>{title}</a>
				</li>
			{/each}
		</ul>
	</aside>

	<slot />
</main>

<style lang="scss">
	$svelte: #ff3e00;

	.hero {
		background-color: $svelte;
		p {
			color: white;
		}
	}

	main {
		display: flex;
	}
	.menu {
		width: 10%;
		padding-top: 25px;
	}
	/* Mobile */
	@media screen and (max-width: 480px) {
		aside {
			display: none;
		}
	}
</style>
