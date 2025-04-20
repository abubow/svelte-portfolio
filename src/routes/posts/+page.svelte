<script>
	import { format } from 'date-fns';
	import { browser } from '$app/environment';
	import ArticleCard from '../../components/article-card.svelte';
	
	/** @type {import('./$types').PageData} */
	export let data;
	
	// Get all unique tags
	const allTags = [...new Set(data.posts.flatMap(post => post.tags || []))];
	
	// Filter state - now using an array for multiple selections
	let selectedTags = [];
	let searchTerm = '';
	
	// Filtered posts
	$: filteredPosts = data.posts.filter(post => {
		// If no tags selected, show all posts
		const matchesTags = selectedTags.length === 0 || 
			(post.tags && selectedTags.some(tag => post.tags.includes(tag)));
			
		const matchesSearch = searchTerm === '' || 
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
		
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
	
	// Format date
	function formatDate(dateString) {
		try {
			return format(new Date(dateString), 'MMMM d, yyyy');
		} catch (error) {
			return dateString;
		}
	}
</script>

<svelte:head>
	<title>Blog | Abuzar Sherazi</title>
	<meta
		name="description"
		content="Read my latest articles about web development, programming tips, and technology insights."
	/>
	<meta
		name="keywords"
		content="Blog, Web Development, Programming, Technology, React, NextJS, Svelte, JavaScript"
	/>
</svelte:head>

<section class="fade-in">
	<!-- Hero section -->
	<div class="text-center mb-16">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">My Blog</h1>
		<div class="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
		<p class="text-lg max-w-2xl mx-auto opacity-80">
			Explore my articles about web development, programming techniques, and technology insights.
		</p>
	</div>
	
	<!-- Filters -->
	<div class="mb-12 bg-base-200 rounded-xl p-6">
		<div class="flex flex-col gap-4">
			<!-- Search -->
			<div class="relative">
				<input 
					type="text" 
					placeholder="Search articles..." 
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
				<h3 class="font-medium mb-2">Filter by topic:</h3>
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
		{#if filteredPosts.length === 0}
			<div class="mt-4 text-center py-6">
				<p class="text-lg opacity-70">No articles match your filters.</p>
				<button class="btn btn-primary btn-sm mt-2" on:click={clearFilters}>Reset Filters</button>
			</div>
		{/if}
	</div>
	
	<!-- Blog Posts -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each filteredPosts as post}
			<div class="fade-in">
				<ArticleCard {post} />
			</div>
		{/each}
	</div>
	
	<!-- Subscribe Section -->
	<div class="mt-20 text-center bg-base-200 rounded-xl p-8">
		<h2 class="text-2xl font-bold mb-4">Stay Updated</h2>
		<p class="mb-6 max-w-2xl mx-auto">
			Subscribe to my newsletter to get notified when I publish new articles and insights.
		</p>
		
		<div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
			<input type="email" placeholder="Your email address" class="input input-bordered flex-1" />
			<button class="btn btn-primary">Subscribe</button>
		</div>
	</div>
</section>
