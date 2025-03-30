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

<!-- Hero Section -->
<section class="py-20 lg:py-32">
	<div class="grid md:grid-cols-2 gap-8 items-center">
		<div class="fade-in space-y-6 order-2 md:order-1">
			<h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
				Say Goodbye to <br />
				<span class="text-primary">Inefficient</span> Development
			</h1>
			
			<p class="text-lg lg:text-xl opacity-90 max-w-xl">
				I deliver top-notch web development solutions regardless of the size and scope of your
				project.
			</p>
			
			<div class="flex flex-wrap gap-4 pt-2">
				<a href="/contact" class="btn btn-primary rounded-lg">Hire Me</a>
				<a href="#projects" class="btn btn-outline btn-primary rounded-lg">View Projects</a>
			</div>
		</div>
		
		<div class="flex justify-center order-1 md:order-2 fade-in">
			<div class="relative">
				<div class="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-30 blur rounded-full"></div>
				<div class="relative overflow-hidden rounded-full w-64 h-64 md:w-80 md:h-80">
					<img
						class="object-cover w-full h-full"
						src={'https://media.graphassets.com/EAg3lhPPQNWIUHVOvEBE'}
						alt={'Syed Mohammad Abuzar'}
						width="624"
						height="624"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="py-20 scroll-mt-20">
	<div class="text-center mb-14 fade-in">
		<h2 class="text-3xl lg:text-4xl font-bold">Featured Projects</h2>
		<div class="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
	</div>
	
	<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 fade-in">
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
	
	<div class="text-center mt-12 fade-in">
		<a href="/projects" class="btn btn-outline btn-primary px-8 rounded-lg">View All Projects</a>
	</div>
</section>

<!-- Blog Section -->
<section class="py-20 bg-base-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 fade-in">
	<div class="text-center mb-14">
		<h2 class="text-3xl lg:text-4xl font-bold">Latest Articles</h2>
		<div class="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
	</div>
	
	<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
	
	<div class="text-center mt-12">
		<a href="/posts" class="btn btn-outline btn-primary px-8 rounded-lg">All Articles</a>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 text-center fade-in">
	<div class="max-w-3xl mx-auto px-4">
		<h2 class="text-3xl lg:text-4xl font-bold mb-6">Ready to Work Together?</h2>
		<p class="text-lg opacity-80 mb-8">
			Let's create something amazing that meets your business needs and exceeds your expectations.
		</p>
		<a href="/contact" class="btn btn-lg btn-primary rounded-lg">Get in Touch</a>
	</div>
</section>
