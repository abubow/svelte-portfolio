<script>
	import ProjectCard from '../../components/project-card.svelte';
	import { browser } from '$app/environment';
	/** @type {import('./$types').PageData} */
	export let data;
	
	// Get all unique tags from projects
	const allTags = [...new Set(data.projects.flatMap(project => project.tags || []))];
	
	// Filter state - now using an array for multiple selections
	let selectedTags = [];
	let searchTerm = '';
	
	// Filtered projects
	$: filteredProjects = data.projects.filter(project => {
		// If no tags selected, show all projects
		const matchesTags = selectedTags.length === 0 || 
			(project.tags && selectedTags.some(tag => project.tags.includes(tag)));
			
		const matchesSearch = searchTerm === '' || 
			project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
		
		return matchesTags && matchesSearch;
	});
	
	// Toggle a tag selection
	function toggleTag(tag) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter(t => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
		
		notifyContentChanged();
	}
	
	// Clear filters
	function clearFilters() {
		selectedTags = [];
		searchTerm = '';
		notifyContentChanged();
	}
	
	// Notify that content has changed (for animations)
	function notifyContentChanged() {
		if (browser) {
			setTimeout(() => {
				window.dispatchEvent(new CustomEvent('contentChanged'));
			}, 0);
		}
	}
	
	// When search input changes
	function handleSearchInput() {
		notifyContentChanged();
	}
</script>

<svelte:head>
	<title>Projects | Abuzar Sherazi Portfolio</title>
	<meta
		name="description"
		content="Browse my portfolio of full stack development projects utilizing React, NextJS, Svelte, TypeScript, and more."
	/>
	<meta
		name="keywords"
		content="Portfolio, Projects, Web Development, Full Stack, React, NextJS, Svelte, Abuzar Sherazi"
	/>
</svelte:head>

<section class="fade-in">
	<!-- Hero section -->
	<div class="text-center mb-16">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
		<div class="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
		<p class="text-lg max-w-2xl mx-auto opacity-80">
			Explore my portfolio of web development projects showcasing my skills and experience with various technologies.
		</p>
	</div>
	
	<!-- Filters -->
	<div class="mb-12 bg-base-200 rounded-xl p-6">
		<div class="flex flex-col gap-4">
			<!-- Search -->
			<div class="relative">
				<input 
					type="text" 
					placeholder="Search projects..." 
					class="input input-bordered w-full pr-10"
					bind:value={searchTerm}
					on:input={handleSearchInput}
				/>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			
			<!-- Tag filters -->
			<div>
				<h3 class="font-medium mb-2">Filter by technology:</h3>
				<div class="flex flex-wrap gap-2">
					{#each allTags as tag}
						<button 
							class="badge badge-lg {selectedTags.includes(tag) ? 'badge-primary' : 'badge-outline'} cursor-pointer"
							on:click={() => toggleTag(tag)}
						>
							{tag}
						</button>
					{/each}
				</div>
			</div>
			
			<!-- Clear filters -->
			{#if selectedTags.length > 0 || searchTerm}
				<div class="flex justify-end">
					<button 
						class="btn btn-ghost btn-sm"
						on:click={clearFilters}
					>
						Clear Filters
					</button>
				</div>
			{/if}
		</div>
		
		<!-- No results message -->
		{#if filteredProjects.length === 0}
			<div class="mt-4 text-center py-6">
				<p class="text-lg opacity-70">No projects match your filters.</p>
				<button class="btn btn-primary btn-sm mt-2" on:click={clearFilters}>Reset Filters</button>
			</div>
		{/if}
	</div>
	
	<!-- Project Grid -->
	<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredProjects as { name, slug, metaDescription, image, tags }}
			<div class="fade-in">
				<ProjectCard
					{name}
					description={metaDescription}
					image={image[0]}
					slug={'projects/' + slug}
					{tags}
				/>
			</div>
		{/each}
	</div>
	
	<!-- CTA Section -->
	<div class="mt-20 text-center bg-base-200 rounded-xl p-8">
		<h2 class="text-2xl font-bold mb-4">Looking for a skilled developer?</h2>
		<p class="mb-6 max-w-2xl mx-auto">
			I'm available for freelance work and open to new opportunities. Let's discuss how I can help with your next project.
		</p>
		<a href="/contact" class="btn btn-primary">Contact Me</a>
	</div>
</section>
