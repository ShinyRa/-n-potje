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

	const guess = (event) => {
		let char = typeof event === undefined ? event.keyCode : event.which;
		if (!guessesIncludesChar(String.fromCharCode(char).toLowerCase())) {
			guesses = [...guesses, String.fromCharCode(char).toLowerCase()];
		}
	};

	const updateGuessMobile = (event) => {
		const toAppend = event.data[event.data.length - 1];
		if (!guessesIncludesChar(toAppend.toLowerCase())) {
			guesses = [...guesses, toAppend.toLowerCase()];
		}
	};

	const guessesIncludesChar = (char) => guesses.includes(char);

	onMount(() => {
		newRound();
		document.onkeydown = guess;
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
			{#if !isGuessed()}
				<h3>Gegokt ({guesses.length})</h3>
			{:else}
				<h3>Je bent gecancelled in {guesses.length} pogingen</h3>
			{/if}
			{#each [...guesses] as letter}
				<input value={letter} disabled class:valid={[...word.word].includes(letter)} readonly />
			{/each}
		{/key}

		{#if isGuessed()}
			<button class="button is-primary is-fullwidth" on:click={newRound}>Opnieuw?</button>
		{:else}
			<br />
			<div class="columns for-mobile for-tablet">
				<div class="column is-half is-offset-one-quarter">
					<input class="input is-fullwidth" on:input={updateGuessMobile} />
				</div>
			</div>
		{/if}
	{/if}
</section>

<style lang="scss">
	.for-mobile,
	.for-tablet {
		display: none;
	}
	.container {
		margin: 0px auto;
		margin-top: 40px;
		text-align: center;
	}

	h1 {
		font-size: 2rem;
		font-weight: bold;
	}

	h3 {
		margin-top: 15px;
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

	/* Tablet */
	@media (min-width: 481px) and (max-width: 1280px) {
		.for-tablet {
			display: block;
		}
		input {
			width: 1.5rem;
			height: 3rem;
			margin: 1rem;
			font-size: 1.7rem;
		}

		h3 {
			font-size: 1.5rem;
		}
	}
	/* Mobile */
	@media screen and (max-width: 480px) {
		.for-mobile {
			display: block;
		}
		input {
			width: 1.2rem;
			height: 2rem;
			margin: 0.8rem;
			font-size: 1.5rem;
		}

		h3 {
			font-size: 1.2rem;
		}
	}
</style>
