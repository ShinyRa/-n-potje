<script lang="ts">
	import { HangmanAPI } from '$lib/api/profantiy';
	import HangmanRound from '$lib/entities/hangman/HangmanRound';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let round = writable<HangmanRound>(null);

	const newRound = () => {
		round.set(HangmanAPI.newRound().round);
	};

	const guess = ({ key }) => {
		if (!isInAlphabet(key)) {
			return;
		}
		$round.guess(key.toLowerCase());
		round.set($round);
	};

	const updateGuessMobile = (event) => {
		const guessedLetter = event.data[event.data.length - 1];
		const letter = guessedLetter.toLowerCase();
		if (!isInAlphabet(letter)) {
			return;
		}
		$round.guess(letter);
		round.set($round);
	};

	const isInAlphabet = (letter: string): boolean =>
		letter.length === 1 && Boolean(letter.match(/[a-z]/i));

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
					value={$round.guessesHasLetter(letter) || letter === '-' || letter === ' ' ? letter : '*'}
					class:valid={$round.guessesHasLetter(letter) || letter === '-' || letter === ' '}
					class="letter"
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
		{#if $round.getTries() === 0}
			<h5 in:fly={{ duration: 250, y: -15, x: 0 }} class="for-desktop">
				Gebruik je toetsenbord om te gokken...
			</h5>
		{/if}
		{#each [...$round.getGuesses()] as letter}
			<input
				value={letter}
				class="letter"
				disabled
				class:valid={$round.wordHasLetter(letter)}
				readonly
				in:fly={{ duration: 250, y: -15, x: 0 }}
			/>
		{/each}

		{#if $round.isGuessed()}
			<button class="button is-primary is-fullwidth" on:click={newRound}>Opnieuw?</button>
		{:else}
			<div class="for-mobile for-tablet">
				<div class="column">
					<input class="input user-input" on:input={updateGuessMobile} />
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

	h5 {
		font-style: italic;
		margin-top: 2.5rem;
		font-size: 1.4rem;
		color: #6f6e6e;
	}

	.letter {
		text-transform: lowercase;
		width: 3rem;
		height: 5rem;
		margin: 1rem;
		font-size: 2.8rem;
		text-align: center;
		border: none;
		border-bottom: 1px solid black;
	}

	input {
		margin-top: 2rem;
		max-width: 240px;
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
		.for-desktop {
			display: none;
		}
		.letter {
			width: 1.3rem;
			height: 3rem;
			margin: 0.8rem;
			font-size: 1.4rem;
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
		.for-desktop {
			display: none;
		}
		.letter {
			width: 1.2rem;
			height: 2rem;
			margin: 0.4rem;
			font-size: 1.2rem;
		}

		h3 {
			font-size: 1.2rem;
		}
	}
</style>
