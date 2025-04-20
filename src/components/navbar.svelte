<script>
	import ThemeSwitcher from './theme-switcher.svelte';
	import BurgerMenu from './icons/burgerMenu.svelte';
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let open = false;
	let scrolled = false;
	let navElement;
	let hovered = false;
	let logoLetters = ['A', 'b', 'u', 'z', 'a', 'r'];
	let glitching = false;

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

	// Add glitch effect on hover
	function triggerGlitch() {
		if (!glitching) {
			glitching = true;
			setTimeout(() => {
				glitching = false;
			}, 1000);
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<style>
	/* Logo animation */
	.logo-letter {
		display: inline-block;
		transition: transform 0.3s, color 0.3s;
	}
	
	.logo-container:hover .logo-letter {
		animation: wave 0.3s ease-in-out;
		animation-fill-mode: forwards;
	}
	
	@keyframes wave {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
	}
	
	.logo-letter:nth-child(1) { animation-delay: 0.00s; }
	.logo-letter:nth-child(2) { animation-delay: 0.05s; }
	.logo-letter:nth-child(3) { animation-delay: 0.10s; }
	.logo-letter:nth-child(4) { animation-delay: 0.15s; }
	.logo-letter:nth-child(5) { animation-delay: 0.20s; }
	.logo-letter:nth-child(6) { animation-delay: 0.25s; }
	
	/* Glitch effect */
	.glitch-effect {
		position: relative;
	}
	
	.glitch-effect::before,
	.glitch-effect::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.glitch-effect::before {
		left: 2px;
		text-shadow: -1px 0 #ff00c1;
		clip: rect(44px, 450px, 56px, 0);
		animation: glitch-anim-1 0.7s infinite linear alternate-reverse;
	}
	
	.glitch-effect::after {
		left: -2px;
		text-shadow: -1px 0 #00fff9;
		clip: rect(44px, 450px, 56px, 0);
		animation: glitch-anim-2 0.7s infinite linear alternate-reverse;
	}
	
	@keyframes glitch-anim-1 {
		0% { clip: rect(37px, 9999px, 94px, 0); }
		5% { clip: rect(83px, 9999px, 74px, 0); }
		10% { clip: rect(11px, 9999px, 17px, 0); }
		/* ... */
		100% { clip: rect(95px, 9999px, 86px, 0); }
	}
	
	@keyframes glitch-anim-2 {
		0% { clip: rect(69px, 9999px, 46px, 0); }
		5% { clip: rect(23px, 9999px, 86px, 0); }
		10% { clip: rect(84px, 9999px, 59px, 0); }
		/* ... */
		100% { clip: rect(75px, 9999px, 30px, 0); }
	}
</style>

<nav 
	bind:this={navElement}
	class="fixed top-0 w-full z-50 transition-all duration-300 {scrolled ? 'bg-base-300/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}"
>
	<div class="container mx-auto px-4 lg:px-8 flex justify-between items-center">
		<!-- Enhanced Logo -->
		<a 
			class="logo-container font-bold transition-all duration-300 {scrolled ? 'text-base-content' : 'text-base-content'} relative"
			href="/"
			on:mouseenter={() => triggerGlitch()}
			on:focus={() => triggerGlitch()}
			on:mouseover={() => hovered = true}
			on:focus={() => hovered = true}
			on:mouseleave={() => hovered = false}
			on:blur={() => hovered = false}
		>
			{#if glitching}
				<span class="glitch-effect text-xl" data-text="Abuzar">
					<span class="text-primary">A</span>buzar
				</span>
			{:else}
				{#each logoLetters as letter, i}
					<span 
						class="logo-letter text-xl {i === 0 ? 'text-primary' : ''}" 
						style="animation-delay: {i * 0.05}s;"
						in:fly={{ y: -20, duration: 300, delay: i * 50 }}
					>
						{letter}
					</span>
				{/each}
			{/if}
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
