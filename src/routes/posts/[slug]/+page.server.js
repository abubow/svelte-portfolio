import { client } from "$lib/graphQl";
import { postQuery } from "$lib/graphQlQueries";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { slug } = params;
    const variables = { slug };
    const { post } = await client.request(postQuery, variables);
    return {
        post,
    };
}