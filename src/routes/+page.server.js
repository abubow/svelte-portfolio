import { client } from '$lib/graphQl';
import { gql } from 'graphql-request';
import { authorsQuery, projectsQuery } from '$lib/graphQlQueries'
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [authors, projects] = await Promise.all([
		client.request(authorsQuery),
		client.request(projectsQuery)
	]);
	return {
		projects,
		authors,
		message: 'Hello world!'
	};
}
