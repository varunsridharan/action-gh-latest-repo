'use strict';
const graphqlGot      = require( 'graphql-got' );
const fs              = require( 'fs' );
const GITHUB_USERNAME = process.argv[ 2 ];
const MAX_REPOS       = process.argv[ 3 ];
const GITHUB_TOKEN    = process.argv[ 4 ];
const SAVE_LOCATION   = process.argv[ 5 ];

if( !GITHUB_TOKEN ) {
	throw new Error( '🛑 Please set your GitHub token in the `GITHUB_TOKEN`  action config' );
}

if( !GITHUB_USERNAME ) {
	throw new Error( '🛑 Please set your GitHub username in the `GITHUB_USERNAME`  action config' );
}

if( !SAVE_LOCATION ) {
	throw new Error( '🛑 Please set your Save Location in the `SAVE_LOCATION`  action config' );
}

const query = `
	query ($cursor: String) {
		user(login: "${GITHUB_USERNAME}") {
			repositories(
				last: ${MAX_REPOS},
				isFork: false,
				isLocked: false,
				ownerAffiliations: OWNER,
				privacy: PUBLIC,
				orderBy: {
					field: CREATED_AT,
					direction: ASC
				}
				before: $cursor
			) {
				edges {
					node {
						name
						description
						url
						primaryLanguage {
							name
							color
						}
						stargazers {
							totalCount
						}
						forks {
							totalCount
						}
					}
					cursor
				}
			}
		}
	}
`;

const fetchRepos = async( repos = [], cursor = null ) => {
	const { body }     = await graphqlGot( 'api.github.com/graphql', {
		query,
		token: GITHUB_TOKEN,
		variables: { cursor }
	} );
	const currentRepos = body.user.repositories.edges
							 .filter( ( { node: repo } ) => repo.description )
							 .map( ( { node: repo } ) => ( {
								 ...repo,
								 stargazers: repo.stargazers.totalCount,
								 forks: repo.forks.totalCount
							 } ) );

	if( ( repos.length + currentRepos.length ) < MAX_REPOS ) {
		return fetchRepos( repos.concat( currentRepos ), body.user.repositories.edges[ 0 ].cursor );
	}

	let $return = repos.concat( currentRepos.slice( repos.length - MAX_REPOS ) );

	fs.writeFile( SAVE_LOCATION, JSON.stringify( $return ), function( err ) {
		if( err ) {
			return console.log( '🛑 Error While Saving JSON File : ' + err );
		}
		console.log( '✅ Latest Repository Data Downloaded' )
	} );
};

fetchRepos();