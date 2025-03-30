<script>
	import ThemeSwitcher from './theme-switcher.svelte';
	import BurgerMenu from './icons/burgerMenu.svelte';
	import { onMount } from 'svelte';

	let open = false;
	let scrolled = false;
	let navElement;

	function toggle() {
		open = !open;
	}
	
	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			toggle();
		}
	}

	// Handle scroll effects
	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav 
	bind:this={navElement}
	class="fixed top-0 w-full z-10 transition-all duration-300 {scrolled ? 'bg-base-300/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}"
>
	<div class="container mx-auto px-4 lg:px-8 flex justify-between items-center">
		<!-- Logo -->
		<a 
			class="text-xl font-bold transition-all duration-300 {scrolled ? 'text-base-content' : 'text-base-content'}" 
			href="/"
		>
			<span class="text-primary">A</span>buzar
		</a>

		<!-- Desktop menu -->
		<div class="hidden lg:flex items-center space-x-1">
			<a class="btn btn-ghost btn-sm rounded-lg px-3 animated-underline" href="/projects"> Portfolio </a>
			<a class="btn btn-ghost btn-sm rounded-lg px-3 animated-underline" href="/posts"> Blog </a>
			<a class="btn btn-ghost btn-sm rounded-lg px-3 animated-underline" href="/about"> About </a>
			<a class="btn btn-primary btn-sm rounded-lg px-3" href="/contact"> Contact </a>
			
			<div class="ml-2">
				<ThemeSwitcher />
			</div>
		</div>

		<!-- Mobile menu button -->
		<div class="dropdown dropdown-end lg:hidden">
			<button 
				class="m-1 btn btn-ghost btn-circle" 
				on:click={toggle}
				on:keydown={handleKeyDown}
				aria-label="Toggle menu"
				aria-expanded={open}
			>
				<BurgerMenu playOpen={open} playClose={!open} />
			</button>
			
			<!-- Mobile menu dropdown -->
			{#if open}
				<div 
					class="fixed inset-0 bg-base-300/95 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-200"
					role="dialog"
					aria-modal="true"
				>
					<div class="flex flex-col items-center justify-center h-full space-y-8 p-4">
						<a 
							class="text-2xl font-medium hover:text-primary transition-colors" 
							href="/projects" 
							on:click={toggle}
						>
							Portfolio
						</a>
						<a 
							class="text-2xl font-medium hover:text-primary transition-colors" 
							href="/posts" 
							on:click={toggle}
						>
							Blog
						</a>
						<a 
							class="text-2xl font-medium hover:text-primary transition-colors" 
							href="/about" 
							on:click={toggle}
						>
							About
						</a>
						<a 
							class="text-2xl font-medium hover:text-primary transition-colors" 
							href="/contact" 
							on:click={toggle}
						>
							Contact
						</a>
						
						<div class="mt-4">
							<ThemeSwitcher />
						</div>
						
						<button 
							class="absolute top-4 right-4 btn btn-circle btn-ghost" 
							on:click={toggle} 
							aria-label="Close menu"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>

<!-- Spacer for fixed navbar -->
<div class="h-16 lg:h-20"></div>
