<script lang="ts">
	import { HangmanAPI } from '$lib/api/profantiy';
	import HangmanRound from '$lib/entities/hangman/HangmanRound';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly, fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let round = writable<HangmanRound>(null);

	const newRound = () => {
		const data = HangmanAPI.newRound();
		round.set(data.round);
		console.log($round.word);
	};

	const guess = (event) => {
		const guessedletter = typeof event === undefined ? event.keyCode : event.which;
		const letter = String.fromCharCode(guessedletter).toLowerCase();
		$round.guess(letter);
		round.set($round);
	};

	const updateGuessMobile = (event) => {
		const guessedLetter = event.data[event.data.length - 1];
		const letter = guessedLetter.toLowerCase();
		$round.guess(letter);
		round.set($round);
	};

	onMount(() => {
		newRound();
		document.onkeydown = guess;
	});
</script>

<section class="container has-text-centered">
	{#if $round}
		{#if $round.isGuessed()}
			<h1 in:fly={{ duration: 500, y: -50 }}>Je noemde iemand "{$round.getWord()}"</h1>
		{/if}
		{#each [...$round.getWord()] as letter}
			{#key $round.guessesHasLetter(letter)}
				<input
					value={$round.guessesHasLetter(letter) ? letter : '*'}
					class:valid={$round.guessesHasLetter(letter)}
					readonly
					in:fly={{ duration: 750, y: 20, x: 0, easing: elasticOut }}
					out:fly={{ duration: 0, y: 20, x: 0 }}
				/>
			{/key}
		{/each}
		{#if !$round.isGuessed()}
			<h3>Gegokt ({$round.getTries()})</h3>
		{:else}
			<h3>Je bent gecancelled in {$round.getTries()} pogingen</h3>
		{/if}
		{#each [...$round.getGuesses()] as letter}
			<input value={letter} disabled class:valid={$round.wordHasLetter(letter)} readonly />
		{/each}

		{#if $round.isGuessed()}
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
