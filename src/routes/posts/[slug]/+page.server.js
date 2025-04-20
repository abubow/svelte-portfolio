import { client } from '$lib/graphQl';
import { postQuery, postsBasicQuery } from '$lib/graphQlQueries';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { slug } = params;
	const variables = { slug };
	
	// Fetch the current post
	const { post } = await client.request(postQuery, variables);
	
	// Fetch other posts for related posts section
	const { posts } = await client.request(postsBasicQuery);
	
	// Filter out the current post from other posts
	const otherPosts = posts.filter(p => p.slug !== slug);
	
	return {
		post,
		otherPosts
	};
}
