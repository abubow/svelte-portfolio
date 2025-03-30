<script>
	import { marked } from 'marked';
	/** @type {import('./$types').PageData} */
	export let data;
	
	// Format the project description with marked
	const formattedDescription = marked(data.project.description);
	
	// Demo and source code links
	const demoLink = data.project.demo;
	const sourceLink = data.project.sourceCode;
</script>

<svelte:head>
	<title>{data.project.name} | Abuzar Sherazi Portfolio</title>
	<meta name="description" content={data.project.metaDescription || data.project.description.slice(0, 160)} />
	<meta name="keywords" content={data.project.tags?.join(', ') || ''} />
</svelte:head>

<article class="fade-in">
	<!-- Hero section -->
	<header class="relative mb-12">
		<div class="relative overflow-hidden rounded-2xl shadow-2xl">
			<img 
				src={data.project.image[0].url} 
				alt={data.project.name}
				class="w-full h-[40vh] sm:h-[50vh] object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-base-300 via-transparent to-transparent"></div>
			
			<div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
				<h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-md">
					{data.project.name}
				</h1>
				
				<div class="flex flex-wrap gap-2 mb-4">
					{#if data.project.tags}
						{#each data.project.tags as tag}
							<span class="badge badge-primary">{tag}</span>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</header>
	
	<!-- Project details section -->
	<div class="grid md:grid-cols-3 gap-8 mb-12">
		<!-- Main content - 2/3 width on desktop -->
		<div class="md:col-span-2 order-2 md:order-1">
			<section class="prose prose-lg max-w-none mb-12">
				{@html formattedDescription}
			</section>
		</div>
		
		<!-- Sidebar - 1/3 width on desktop -->
		<div class="md:col-span-1 order-1 md:order-2">
			<div class="bg-base-200 rounded-xl p-6 sticky top-24">
				<h2 class="text-xl font-bold mb-4">Project Links</h2>
				
				<div class="space-y-4">
					{#if demoLink}
						<a 
							href={demoLink} 
							target="_blank" 
							rel="noopener noreferrer"
							class="btn btn-primary w-full justify-between group"
						>
							Live Demo
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:translate-x-1 transition-transform">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
							</svg>
						</a>
					{/if}
					
					{#if sourceLink}
						<a 
							href={sourceLink} 
							target="_blank" 
							rel="noopener noreferrer"
							class="btn btn-outline btn-primary w-full justify-between group"
						>
							Source Code
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:translate-x-1 transition-transform">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
							</svg>
						</a>
					{/if}
				</div>
				
				{#if data.project.tags && data.project.tags.length > 0}
					<div class="mt-8">
						<h2 class="text-xl font-bold mb-4">Technologies</h2>
						<div class="flex flex-wrap gap-2">
							{#each data.project.tags as tag}
								<span class="badge badge-outline badge-primary py-3">{tag}</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
	
	<!-- CTA Section -->
	<section class="bg-base-200 rounded-xl p-8 text-center mb-12">
		<h2 class="text-2xl font-bold mb-4">Interested in working together?</h2>
		<p class="mb-6 max-w-2xl mx-auto">
			I'm always open to discussing new projects and opportunities. Let's create something amazing together.
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a href="/contact" class="btn btn-primary">Get in Touch</a>
			<a href="/projects" class="btn btn-outline">View More Projects</a>
		</div>
	</section>
</article>
