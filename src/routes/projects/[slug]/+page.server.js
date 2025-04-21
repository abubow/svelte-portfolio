import { client } from '$lib/graphQl';
import { projectQuery } from '$lib/graphQlQueries';
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { slug } = params;
	const variables = { slug };
	const { project } = await client.request(projectQuery, variables);
	return {
		project
	};
}
