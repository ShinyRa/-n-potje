<script lang="ts">
	import { ProfanityAPI } from '$lib/api/profantiy';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let word;
	let guesses = [];

	const newRound = () => {
		word = ProfanityAPI.randomSwearWord();
		guesses = [];
	};

	const isGuessed = () => [...word.word].every((letter) => guesses.includes(letter));
	onMount(() => {
		newRound();
		document.onkeypress = (event) => {
			const hasNumber = /\d/;

			if (hasNumber.test(String.fromCharCode(event.which))) {
				return;
			}

			if (!guesses.includes(String.fromCharCode(event.which))) {
				guesses = [...guesses, String.fromCharCode(event.which)];
			}
		};
	});
</script>

<section class="container has-text-centered">
	{#if word}
		{#key guesses}
			{#if isGuessed()}
				<h1 in:fly={{ duration: 500, y: -50 }}>Je noemde iemand "{word.word}"</h1>
			{/if}
			{#each [...word.word] as letter}
				{#key guesses.includes(letter)}
					<input
						value={guesses.includes(letter) ? letter : '*'}
						readonly
						class:valid={guesses.includes(letter)}
						in:fly={{ duration: 250, y: -15, x: 0 }}
					/>
				{/key}
			{/each}
			<br />
			{#if !isGuessed()}
				<h3>Gegokt ({guesses.length})</h3>
			{:else}
				<h3>Je bent gecancelled in {guesses.length} pogingen</h3>
			{/if}
			{#each [...guesses] as letter}
				<input value={letter} disabled class:valid={[...word.word].includes(letter)} readonly />
			{/each}
			{#if isGuessed()}
				<button class="button is-primary is-fullwidth" on:click={newRound}>Retry?</button>
			{/if}
		{/key}
	{/if}
</section>

<style lang="scss">
	.container {
		margin: 0px auto;
		margin-top: 40px;
	}

	h1 {
		font-size: 2rem;
		font-weight: bold;
	}

	h3 {
		font-size: 1.6rem;
	}

	input {
		width: 3rem;
		height: 6rem;
		margin: 1.5rem;
		font-size: 2.5rem;
		text-align: center;
		border-top: none;
		border-left: none;
		border-right: none;
	}

	.valid {
		border-bottom: 1px solid goldenrod;
	}

	button.is-fullwidth {
		margin-top: 5rem;
	}
</style>
