<script>
	import { onMount } from 'svelte';
	
	export let project;
	
	let mounted = false;
	let isHovered = false;
	let cardElement;
	let imageElement;
	
	// Improved hover effect for 3D tilt with better responsiveness
	function handleMouseMove(e) {
		if (!cardElement) return;
		
		const rect = cardElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		// Reduced rotation values for more subtle effect
		const rotateX = (y - centerY) / 30;
		const rotateY = (centerX - x) / 30;
		
		// Apply transform with a faster transition
		cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
		
		// Image parallax effect with more subtle movement
		if (imageElement) {
			const moveX = (x - centerX) / 40;
			const moveY = (y - centerY) / 40;
			imageElement.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
		}
	}
	
	function handleMouseLeave() {
		if (!cardElement) return;
		// Faster transition back to normal state
		cardElement.style.transition = "all 0.3s ease";
		cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
		if (imageElement) {
			imageElement.style.transition = "all 0.3s ease";
			imageElement.style.transform = 'translate(0, 0) scale(1.02)';
		}
		isHovered = false;
		
		// Reset transition after returning to normal state
		setTimeout(() => {
			if (cardElement) cardElement.style.transition = "";
			if (imageElement) imageElement.style.transition = "";
		}, 300);
	}
	
	function handleMouseEnter() {
		isHovered = true;
	}
	
	onMount(() => {
		mounted = true;
	});
	
	// Format image URL with a more robust fallback system
	function getImageUrl() {
		if (!project) return 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3';
		
		// Handle case where image is directly an object with url
		if (project.image && typeof project.image === 'object' && project.image.url) {
			return project.image.url;
		}
		
		// Handle case where image is an array of objects
		if (project.image && Array.isArray(project.image) && project.image[0] && project.image[0].url) {
			return project.image[0].url;
		}
		
		// Handle coverImage format
		if (project.coverImage && typeof project.coverImage === 'object' && project.coverImage.url) {
			return project.coverImage.url;
		}
		
		// Fallback to a default image
		return 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3';
	}
	
	// Get project tags with fallback to empty array
	$: tags = project && project.tags ? project.tags : [];
	
	// Get project title with fallback
	$: title = project ? (project.title || project.name || 'Untitled Project') : 'Untitled Project';
	
	// Get project description with fallback
	$: description = project ? (project.description || project.metaDescription || 'No description available') : 'No description available';
	
	// Generate link URL
	$: linkUrl = project && project.slug ? (
		project.slug.startsWith('/') 
			? project.slug 
			: project.slug.includes('/') 
				? `/${project.slug}` 
				: `/projects/${project.slug}`
	) : '#';
</script>

<a 
	href={linkUrl} 
	class="block group relative bg-base-100 rounded-xl hover:shadow-xl transition-all duration-300 rounded-t-lg"
	bind:this={cardElement}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:mousemove={handleMouseMove}
>
	<!-- Added extra padding container to prevent content clipping during transform -->
	<div class="p-1">
		<div class="relative overflow-hidden aspect-video rounded-t-lg">
			<div class="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 scale-105"></div>
			
			<img 
				bind:this={imageElement}
				src={getImageUrl()} 
				alt={title}
				class="w-full h-full object-cover transition-transform duration-300 scale-105 rounded-t-lg"
			/>
			
			{#if tags.length > 0}
				<div class="absolute top-3 left-3 flex flex-wrap gap-2 z-20">
					{#each tags.slice(0, 3) as tag}
						<span class="px-2 py-1 text-xs font-medium rounded-full bg-primary/80 text-white backdrop-blur-sm">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
		
		<div class="p-5 relative">
			<!-- Decorative elements with faster animations -->
			<div class="absolute -top-6 right-6 w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75"></div>
			<div class="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-secondary/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150"></div>
			
			<h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
				{title}
			</h3>
			
			<p class="text-base-content/70 mb-4 line-clamp-2">
				{description}
			</p>
			
			<div class="flex justify-between items-center">
				<span class="text-sm font-medium text-primary">View Project</span>
				
				<div class="relative overflow-hidden w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						class="w-4 h-4 text-primary transform group-hover:translate-x-6 transition-transform duration-300"
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
					
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						class="w-4 h-4 text-primary absolute transform -translate-x-6 group-hover:translate-x-0 transition-transform duration-300"
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</div>
			</div>
		</div>
	</div>
</a>
