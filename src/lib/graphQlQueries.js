import { gql } from 'graphql-request';

export const authorsQuery = gql`
	query GetAuthors {
		authors {
			name
			intro
			bio
			slug
			picture {
				url
				width
				height
			}
		}
	}
`;

const PROJECT_FRAGMENT = gql`
	fragment ProjectDetails on Project {
		name
		slug
		description
		tags
		demo
		sourceCode
		image {
			url
			width
			height
		}
	}
`;

const PROJECT_BASIC_FRAGMENT = gql`
	fragment ProjectBasicDetails on Project {
		name
		slug
		metaDescription
		tags
		image {
			url
			width
			height
		}
	}
`;

export const projectsQuery = gql`
	${PROJECT_FRAGMENT}
	query GetProjects {
		projects {
			...ProjectDetails
		}
	}
`;

export const projectsBasicQuery = gql`
	${PROJECT_BASIC_FRAGMENT}
	query GetProjects {
		projects {
			...ProjectBasicDetails
		}
	}
`;

export const projectQuery = gql`
	${PROJECT_FRAGMENT}
	query GetProject($slug: String!) {
		project(where: { slug: $slug }) {
			...ProjectDetails
		}
	}
`;

// Post Queries

const POST_FRAGMENT = gql`
	fragment PostDetails on Post {
		title
		slug
		date
		content
		tags
		metaDescription
		metaTags
		coverImage {
			url
			width
			height
		}
		authors {
			name
		}
	}
`;

const POST_BASIC_FRAGMENT = gql`
	fragment PostBasicDetails on Post {
		title
		slug
		date
		tags
		metaDescription
		coverImage {
			url
			width
			height
		}
		authors {
			name
		}
	}
`;

export const postsQuery = gql`
	${POST_FRAGMENT}
	query GetPosts {
		posts {
			...PostDetails
		}
	}
`;

export const postsBasicQuery = gql`
	${POST_BASIC_FRAGMENT}
	query GetPosts {
		posts {
			...PostBasicDetails
		}
	}
`;

export const postQuery = gql`
	${POST_FRAGMENT}
	query GetPost($slug: String!) {
		post(where: { slug: $slug }) {
			...PostDetails
		}
	}
`;
