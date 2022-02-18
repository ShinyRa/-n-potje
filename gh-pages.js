import * as ghpages from 'gh-pages';
import * as dotenv from 'dotenv';
dotenv.config();

ghpages.publish(
	'build',
	{
		branch: 'gh-pages',
		repo: process.env.GH_REPO,
		user: {
			name: process.env.GH_USER,
			email: process.env.GH_EMAIL
		}
	},
	() => {
		console.log('Deploy Complete!');
	}
);
