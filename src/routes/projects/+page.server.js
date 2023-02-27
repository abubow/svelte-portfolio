import { client } from '$lib/graphQl';
import { projectsQuery }  from '$lib/graphQlQueries';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const { projects } = await client.request(projectsQuery);
	return {
		projects
	};
}
