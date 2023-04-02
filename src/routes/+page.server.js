import { client } from '$lib/graphQl';
import { authorsQuery, projectsQuery, postsQuery } from '$lib/graphQlQueries';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [authors, projects, posts] = await Promise.all([
		client.request(authorsQuery),
		client.request(projectsQuery),
		client.request(postsQuery)
	]);
	return {
		projects,
		authors,
		posts
	};
}
