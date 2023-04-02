<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import ProjectCard from '../components/project-card.svelte';
</script>

<svelte:head>
	<title>Abuzar Sherazi - Full Stack Developer</title>
	<meta
		name="description"
		content="Experienced Full Stack Developer skilled in React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, and Django. Proficient in creating responsive UIs and efficient back-ends. Contact me today to bring your web development project to life."
	/>
	<meta
		name="keywords"
		content="Abuzar Sherazi, Full Stack Developer, React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, Django"
	/>
</svelte:head>

{#each data.authors.authors as { name, intro, picture: { url, width, height } }}
	<div class="flex mb-40 items-end flex-col md:flex-row md:items-center md:gap-8 lg:-mx-52 lg:px-10">
		<div class="mr-6 p-4 md:p-0">
			<h2 class="text-3xl mb-4 font-bold tracking-wider">{name}</h2>
			<p class="text-xl mb-4 md:max-w-xl">{intro}</p>
		</div>

		<span class="rounded-3xl overflow-hidden w-40 h-40 md:w-80 md:h-80">
			<img class="object-cover" src={url} alt={name} {width} {height} />
		</span>
	</div>
{/each}

<h1 class="font-bold text-center mb-20 text-5xl">Projects</h1>
<div class="grid gap-12 md:grid-cols-4 md:px-10 lg:grid-cols-3 lg:-mx-52">
	{#each data.projects.projects as { name, slug, description, image, tags }}
		<ProjectCard {name} {description} image={image[0]} {slug} {tags} />
	{/each}
</div>

<!-- <h1 class="font-bold text-center mb-20 text-5xl">Blog Posts</h1>
<div class="grid gap-12 md:grid-cols-4 md:px-10 lg:grid-cols-3 lg:-mx-52">
	{#each data.posts.posts as { title, slug, metadescription, image, tags }}
		<ProjectCard {title} {description} image={image[0]} {slug} {tags} />
	{/each}
</div> -->