<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import ProjectCard from '../components/project-card.svelte';
</script>

<svelte:head>
	<title>Abuzar Sherazi - Full Stack Developer</title>
	<meta
		name="description"
		content="Experienced Full Stack Developer, Syed Mohammad Abuzar Sherazi, skilled in React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, and Django. Proficient in creating responsive UIs and efficient back-ends. Contact me today to bring your web development project to life."
	/>
	<meta
		name="keywords"
		content="Abuzar Sherazi, Full Stack Developer, React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, Django"
	/>
</svelte:head>

<section
	class="flex mb-40 items-end flex-col md:flex-row md:items-center md:gap-8 lg:-mx-52 lg:px-10 justify-center"
>
	<div class="mr-6 p-4 md:p-0 flex flex-col items-center md:items-start gap-4">
		<h1 class="text-3xl 	md:text-5xl mb-4 font-bold tracking-wider">
			Say Goodbye to <br />
			<!-- Inefficient Web Dev -->
			<span class="text-primary">Inefficient</span> Development
		</h1>
		<p class="text-xl md:text-2xl mb-4 md:max-w-xl">
			I deliver top-notch web development solutions regardless of the size and scope of your
			project.
		</p>
		<!-- button group containing a button to hire me and a button to view my projects -->
		<div class="flex gap-4">
			<a href="/contact" class="btn btn-primary px-8 py-3 rounded-2xl">Hire Me</a>
			<a href="#projects" class="btn btn-outline btn-primary px-8 py-3 rounded-2xl">View Projects</a
			>
		</div>
	</div>

	<span class="rounded-3xl overflow-hidden w-80 h-80 mx-auto mt-8 md:w-80 md:h-80 md:mt-0">
		<img
			class="object-cover"
			src={'https://media.graphassets.com/EAg3lhPPQNWIUHVOvEBE'}
			alt={'Syed Mohammad Abuzar'}
			width="624"
			height="624"
		/>
	</span>
</section>

<span id="projects" />
<section class="mb-40 flex flex-col items-center">
	<h1 class="font-bold text-center mb-20 text-5xl">Projects</h1>
	<div class="grid gap-12 md:grid-cols-4 md:px-10 lg:grid-cols-3 lg:-mx-52 lg:px-10">
		{#each data.projects.projects as { name, slug, metaDescription, image, tags }}
			<ProjectCard
				{name}
				description={metaDescription}
				image={image[0]}
				slug={'projects/' + slug}
				{tags}
			/>
		{/each}
	</div>
	<a href="/projects" class="btn btn-outline btn-primary px-8 py-3 mt-12 rounded-2xl"
		>View All Projects</a
	>
</section>

<section class="mb-40 flex flex-col items-center">
	<h1 class="font-bold text-center mb-20 text-5xl">Blog Posts</h1>
	<div class="grid gap-12 md:grid-cols-4 md:px-10 lg:grid-cols-3 lg:-mx-52">
		{#each data.posts.posts as { title, slug, metaDescription, coverImage, tags }}
			<ProjectCard
				name={title}
				description={metaDescription}
				image={coverImage}
				slug={'posts/' + slug}
				{tags}
			/>
		{/each}
	</div>
	<a href="/posts" class="btn btn-outline btn-primary px-8 py-3 mt-12 rounded-2xl">View All Posts</a
	>
</section>
