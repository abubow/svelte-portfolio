<script>
	import ProjectCard from '../../components/project-card.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>My Portfolio projects</title>
	<meta
		name="description"
		content="Experienced Full Stack Developer skilled in React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, and Django. Proficient in creating responsive UIs and efficient back-ends. Contact me today to bring your web development project to life."
	/>
	<meta
		name="keywords"
		content="Abuzar Sherazi, Full Stack Developer, React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, Django"
	/>
</svelte:head>

<h1 class="font-bold mb-20 text-center text-5xl">Recent Projects by Me</h1>

<div class="grid gap-12 md:grid-cols-4 md:px-10 lg:grid-cols-3 lg:-mx-52">
	{#each data.projects as { name, slug, description, image, tags }}
		<ProjectCard {name} {description} image={image[0]} {slug} {tags} />
	{/each}
</div>
