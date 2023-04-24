import { client } from '$lib/graphQl';
import { projectsBasicQuery, postsBasicQuery } from '$lib/graphQlQueries';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [projects, posts] = await Promise.all([
		client.request(projectsBasicQuery),
		client.request(postsBasicQuery)
	]);
	return {
		projects,
		posts
	};
}
