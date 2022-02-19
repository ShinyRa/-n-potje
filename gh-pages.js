import * as ghpages from 'gh-pages';
import * as dotenv from 'dotenv';

dotenv.config();

// Publish build
ghpages.publish(
	'public',
	{
		branch: 'gh-pages',
		repo: process.env.GH_REPO,
		user: {
			name: process.env.GH_USER,
			email: process.env.GH_EMAIL
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);
