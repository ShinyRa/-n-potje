import Profanity from '../../utils/profanity/Profanity';

export const ProfanityAPI = {
	randomSwearWord(): Record<string, unknown> {
		const profanity = new Profanity();
		const hasNumber = /\d/;
		let word = profanity.getWord();
		while (hasNumber.test(word)) {
			word = profanity.getRandomWord();
		}

		return {
			word,
			length: word.length
		};
	}
};
