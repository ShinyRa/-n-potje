import HangmanRound from '../../entities/hangman/HangmanRound';

export const HangmanAPI = {
	newRound(): Record<string, HangmanRound> {
		return {
			round: new HangmanRound()
		};
	}
};
