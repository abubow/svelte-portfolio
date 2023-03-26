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
<h1 class="font-bold text-center mb-20 text-5xl">
	Frontend Developer, Backend Developer, Full Stack Developer
</h1>

{#each data.authors.authors as { name, intro, picture: { url, width, height } }}
	<div class="flex mb-40 items-end flex-col md:flex-row lg:-mx-52">
		<div class="mr-6">
			<h2 class="text-3xl mb-4 font-bold tracking-wider">{name}</h2>
			<p class="text-xl mb-4">{intro}</p>
		</div>

		<span class="mask mask-squircle lg:h-48 lg:w-auto">
			<img src={url} alt={name} {width} {height} />
		</span>
	</div>
{/each}

<div class="grid gap-12 md:grid-cols-4 md:px-10 lg:grid-cols-3 lg:-mx-52">
	{#each data.projects.projects as { name, slug, description, image, tags }}
		<ProjectCard {name} {description} image={image[0]} {slug} {tags}/>
	{/each}
</div>
