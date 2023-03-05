import { client } from '$lib/graphQl';
import { authorsQuery, projectsQuery } from '$lib/graphQlQueries';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [authors, projects] = await Promise.all([
		client.request(authorsQuery),
		client.request(projectsQuery)
	]);
	return {
		projects,
		authors,
	};
}
