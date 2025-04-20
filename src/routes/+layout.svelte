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
	
	// Elements to observe for animations
	let fadeElements = [];
	let revealElements = [];
	let staggerElements = [];
	
	// Custom cursor variables
	let mounted = false;
	let mouseX = 0;
	let mouseY = 0;
	let customCursor;
	
	// Handle mouse movement for custom cursor
	function handleMouseMove(e) {
		if (!browser) return;

		mouseX = e.clientX;
		mouseY = e.clientY;

		// Update custom cursor
		if (customCursor) {
			// Using requestAnimationFrame for smoother performance
			window.requestAnimationFrame(() => {
				customCursor.style.left = `${mouseX}px`;
				customCursor.style.top = `${mouseY}px`;
			});
		}
	}

	function handleMouseEnter() {
		if (customCursor) customCursor.classList.add('cursor-active');
	}

	function handleMouseLeave() {
		if (customCursor) customCursor.classList.remove('cursor-active');
	}
	
	// Set up intersection observer for animations
	function setupScrollObservers() {
		if (!browser) return;
		
		// Create observer for fade-in animations
		const fadeObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1 }
		);
		
		// Create observer for text reveal animations
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1 }
		);
		
		// Create observer for staggered animations
		const staggerObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1 }
		);
		
		// Observe all fade elements
		document.querySelectorAll('.fade-in').forEach((el) => {
			fadeObserver.observe(el);
			fadeElements.push(el);
		});
		
		// Observe all reveal elements
		document.querySelectorAll('.reveal-text, .image-reveal').forEach((el) => {
			revealObserver.observe(el);
			revealElements.push(el);
		});
		
		// Observe all stagger elements
		document.querySelectorAll('.stagger-children').forEach((el) => {
			staggerObserver.observe(el);
			staggerElements.push(el);
		});
		
		// Set up interactive elements for cursor effects
		document.querySelectorAll('a, button, .btn, .magnetic-btn').forEach((el) => {
			el.addEventListener('mouseenter', handleMouseEnter);
			el.addEventListener('mouseleave', handleMouseLeave);
		});
	}
	
	// Reset animations when navigating between pages
	$: if (browser && currentPath !== $page.url.pathname) {
		currentPath = $page.url.pathname;
		
		// Wait for new content to load
		setTimeout(() => {
			// Reset animation classes
			document.querySelectorAll('.visible').forEach((el) => {
				el.classList.remove('visible');
			});
			
			// Re-initialize observers
			setupScrollObservers();
		}, 100);
	}
	
	// Run on initial mount
	onMount(() => {
		if (!browser) return;
		
		mounted = true;
		
		// Initialize theme switcher
		themeChange(false);
		
		// Initialize animations
		setupScrollObservers();
		
		// Initialize custom cursor
		setTimeout(() => {
			customCursor = document.querySelector('.custom-cursor');
			if (customCursor) {
				customCursor.style.opacity = '1';
			}
		}, 100);
		
		// Initialize analytics
		inject({ mode: dev ? 'development' : 'production' });
		
		// Clean up event listeners on unmount
		return () => {
			document.querySelectorAll('a, button, .btn, .magnetic-btn').forEach((el) => {
				el.removeEventListener('mouseenter', handleMouseEnter);
				el.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	});
</script>

<svelte:window on:mousemove={handleMouseMove} />

{#if browser}
	<div class="custom-cursor" style="opacity: 0;" />
{/if}

<Navbar />

<main class="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl min-h-[calc(100vh-var(--footer-height)-var(--navbar-height))] overflow-visible" style="--navbar-height: 5rem; --footer-height: 25rem;">
	<slot />
</main>

<Footer />
