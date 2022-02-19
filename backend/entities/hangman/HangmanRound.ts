import profanity from '../../utils/profanity/Profanity';

type Round = {
	word: string;
	guesses: string[];
};

class HangmanRound implements Round {
	word: string;
	guesses: string[];

	constructor() {
		this.word = profanity.getRandomWord();
		this.guesses = [];
	}

	isGuessed = (): boolean => [...this.word].every((letter) => this.guesses.includes(letter));

	getWord = (): string => this.word;
	getGuesses = (): string[] => this.guesses;
	getTries = (): number => this.guesses.length;
	wordHasLetter = (letter: string): boolean => [...this.word].includes(letter);
	guessesHasLetter = (letter: string): boolean => this.guesses.includes(letter);
	guess = (letter: string): void => {
		if (!this.guessesHasLetter(letter)) {
			this.guesses.push(letter);
		}
	};
}

export default HangmanRound;
