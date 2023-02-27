import { GraphQLClient } from 'graphql-request'
// import { GRAPHQL_ENDPOINT } from '$env/static/private';

const GRAPHQL_ENDPOINT = "https://api-ap-southeast-2.hygraph.com/v2/clemjxi9l00d701ui9krw5as9/master"
// const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_API

export const client = new GraphQLClient(GRAPHQL_ENDPOINT)