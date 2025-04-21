import { client } from '$lib/graphQl';
import { projectsBasicQuery } from '$lib/graphQlQueries';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const { projects } = await client.request(projectsBasicQuery);
	return {
		projects
	};
}
