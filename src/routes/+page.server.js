import { client } from '$lib/graphQl'
import { gql} from 'graphql-request';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const query = gql`
      query GetProjects {
        projects {
          name
          slug
          description
          demo
          sourceCode
          image {
            url
          }
        }
      }
    `

    const { projects } = await client.request(query)
	return {
		projects,
		message: 'Hello world!'
	};
}
