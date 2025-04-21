import { client } from '$lib/graphQl';
import { postsQuery } from '$lib/graphQlQueries';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const { posts } = await client.request(postsQuery);
	return {
		posts
	};
}
