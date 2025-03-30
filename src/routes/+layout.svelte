<script>
	import '../app.postcss';
	import Footer from '../components/footer.svelte';
	import Navbar from '../components/navbar.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	// Track current path for navigation detection
	let currentPath = '';
	
	// Function to initialize animations that can be called multiple times
	function initializeAnimations() {
		if (!browser) return;
		
		// Get all fade-in elements
		const fadeInElements = document.querySelectorAll('.fade-in:not(.visible)');
		
		if (fadeInElements.length > 0) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			}, { threshold: 0.1 });
			
			fadeInElements.forEach(element => {
				observer.observe(element);
			});
		}
	}

	// Run on initial mount
	onMount(() => {
		if (!browser) return;
		
		// Initialize theme switcher
		themeChange(false);
		
		// Initialize animations
		initializeAnimations();
		
		// Add event to reinitialize animations after any filtering/DOM changes
		window.addEventListener('contentChanged', () => {
			// Small delay to ensure DOM is updated
			setTimeout(initializeAnimations, 50);
		});
		
		// Initialize analytics
		inject({ mode: dev ? 'development' : 'production' });
	});
	
	// Watch for page changes (instead of afterNavigate)
	$: if (browser && $page.url.pathname !== currentPath) {
		currentPath = $page.url.pathname;
		
		// Reset visibility classes for new page
		document.querySelectorAll('.fade-in').forEach(el => {
			el.classList.remove('visible');
		});
		
		// Initialize animations again
		setTimeout(initializeAnimations, 50);
	}
</script>

<Navbar />

<main class="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl min-h-[calc(100vh-var(--footer-height)-var(--navbar-height))]" style="--navbar-height: 5rem; --footer-height: 25rem;">
	<slot />
</main>

<Footer />
