<script>
	import GithubIcon from './icons/github-icon.svelte';
	import TwitterIcon from './icons/twitter-icon.svelte';
	import YouTubeIcon from './icons/youtube-icon.svelte';
	import { onMount } from 'svelte';
	
	let showScrollTop = false;
	
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	
	function checkScrollPosition() {
		showScrollTop = window.scrollY > 300;
	}
	
	onMount(() => {
		window.addEventListener('scroll', checkScrollPosition);
		return () => {
			window.removeEventListener('scroll', checkScrollPosition);
		};
	});
</script>

<!-- Back to top button with animation -->
<button
	class="btn btn-circle btn-primary shadow-lg fixed bottom-6 right-6 z-10 {showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-300"
	on:click={scrollToTop}
	aria-label="Scroll to top"
>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
	</svg>
</button>

<footer class="bg-base-300 pt-16 pb-8">
	<div class="container mx-auto px-4">
		<!-- Top section with navigation and social links -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
			<!-- Nav links -->
			<div>
				<h3 class="text-xl font-bold mb-4">Explore</h3>
				<div class="grid grid-cols-2 gap-2">
					<a class="link link-hover animated-underline inline-block py-1" href="/projects">Portfolio</a>
					<a class="link link-hover animated-underline inline-block py-1" href="/posts">Blog</a>
					<a class="link link-hover animated-underline inline-block py-1" href="/about">About</a>
					<a class="link link-hover animated-underline inline-block py-1" href="/contact">Contact</a>
				</div>
			</div>
			
			<!-- Social and contact -->
			<div>
				<h3 class="text-xl font-bold mb-4">Connect</h3>
				<div class="flex gap-4 mb-4">
					<a
						href="https://www.youtube.com/@abuzarsherazi1054"
						target="_blank"
						rel="noreferrer"
						class="btn btn-circle btn-ghost hover:text-primary transition-colors"
						aria-label="YouTube"
					>
						<YouTubeIcon />
					</a>
					<a
						href="https://twitter.com/SyedMoh25065076"
						target="_blank"
						rel="noreferrer"
						class="btn btn-circle btn-ghost hover:text-primary transition-colors"
						aria-label="Twitter"
					>
						<TwitterIcon />
					</a>
					<a
						href="http://github.com/abubow/"
						target="_blank"
						rel="noreferrer"
						class="btn btn-circle btn-ghost hover:text-primary transition-colors"
						aria-label="Github"
					>
						<GithubIcon />
					</a>
				</div>
			</div>
		</div>
		
		<!-- Divider -->
		<div class="divider mb-8"></div>
		
		<!-- Bottom section with copyright -->
		<div class="text-center opacity-80 text-sm">
			<p>
				© {new Date().getFullYear()} Abuzar Sherazi. All rights reserved.
			</p>
		</div>
	</div>
</footer>
