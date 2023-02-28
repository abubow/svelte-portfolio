import { client } from '$lib/graphQl';
import { authorsQuery } from '$lib/graphQlQueries';

/** @type {import('./$types').PageServerLoad} */
export async function load() {	
const { authors } = await client.request(authorsQuery);

	return {
			authors
	};
};
