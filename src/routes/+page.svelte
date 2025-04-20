<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import ProjectCard from '../components/project-card.svelte';
	import ArticleCard from '../components/article-card.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	let mounted = false;
	let heroHeading;
	let parallaxLayers = [];
	let revealElements = [];
	let staggerElements = [];

	// Parallax effect for decorative elements
	function handleMouseMove(e) {
		if (!browser) return;

		const mouseX = e.clientX;
		const mouseY = e.clientY;

		// Parallax effect
		if (parallaxLayers.length) {
			parallaxLayers.forEach((layer, index) => {
				const depth = (index + 1) * 0.03;
				const moveX = (mouseX - window.innerWidth / 2) * depth;
				const moveY = (mouseY - window.innerHeight / 2) * depth;
				layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
			});
		}
	}

	function checkVisibility() {
		if (!browser) return;

		revealElements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			const isVisible = rect.top < window.innerHeight * 0.8;
			if (isVisible) {
				el.classList.add('visible');
			}
		});

		staggerElements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			const isVisible = rect.top < window.innerHeight * 0.8;
			if (isVisible) {
				el.classList.add('visible');
			}
		});
	}

	// Magnetic button effect
	function handleButtonMove(e) {
		const btn = e.currentTarget;
		const rect = btn.getBoundingClientRect();
		const btnX = rect.left + rect.width / 2;
		const btnY = rect.top + rect.height / 2;
		const distX = e.clientX - btnX;
		const distY = e.clientY - btnY;
		btn.style.transform = `translate(${distX * 0.2}px, ${distY * 0.2}px)`;
	}

	function handleButtonLeave(e) {
		e.currentTarget.style.transform = 'translate(0, 0)';
	}

	// Text scramble effect
	class TextScramble {
		constructor(el) {
			this.el = el;
			this.chars = '!<>-_\\/[]{}—=+*^?#________';
			this.update = this.update.bind(this);
		}

		setText(newText) {
			const oldText = this.el.innerText;
			const length = Math.max(oldText.length, newText.length);
			const promise = new Promise((resolve) => (this.resolve = resolve));
			this.queue = [];

			for (let i = 0; i < length; i++) {
				const from = oldText[i] || '';
				const to = newText[i] || '';
				const start = Math.floor(Math.random() * 40);
				const end = start + Math.floor(Math.random() * 40);
				this.queue.push({ from, to, start, end });
			}

			cancelAnimationFrame(this.frameRequest);
			this.frame = 0;
			this.update();
			return promise;
		}

		update() {
			let output = '';
			let complete = 0;

			for (let i = 0, n = this.queue.length; i < n; i++) {
				let { from, to, start, end, char } = this.queue[i];

				if (this.frame >= end) {
					complete++;
					output += to;
				} else if (this.frame >= start) {
					if (!char || Math.random() < 0.28) {
						char = this.randomChar();
						this.queue[i].char = char;
					}
					output += `<span class="text-primary">${char}</span>`;
				} else {
					output += from;
				}
			}

			this.el.innerHTML = output;

			if (complete === this.queue.length) {
				this.resolve();
			} else {
				this.frameRequest = requestAnimationFrame(this.update);
				this.frame++;
			}
		}

		randomChar() {
			return this.chars[Math.floor(Math.random() * this.chars.length)];
		}
	}

	onMount(() => {
		mounted = true;

		if (browser) {
			// Initialize parallax layers
			parallaxLayers = document.querySelectorAll('.parallax-layer');

			// Initialize reveal animations
			revealElements = document.querySelectorAll('.reveal-text, .image-reveal, .fade-in');

			// Initialize staggered animations
			staggerElements = document.querySelectorAll('.stagger-children');

			// Set up text scramble
			heroHeading = document.querySelector('.scramble-text');
			if (heroHeading) {
				const phrases = ['Creative Developer', 'Problem Solver', 'UX Enthusiast', 'Web Craftsman'];

				const fx = new TextScramble(heroHeading);
				let counter = 0;

				const next = () => {
					fx.setText(phrases[counter]).then(() => {
						setTimeout(next, 2000);
					});
					counter = (counter + 1) % phrases.length;
				};

				next();
			}

			// Check elements visibility on scroll
			window.addEventListener('scroll', checkVisibility);
			checkVisibility();

			// Return cleanup function
			return () => {
				window.removeEventListener('scroll', checkVisibility);
			};
		}
	});
</script>

<svelte:head>
	<title>Syed Muhammad Abuzar Sherazi - Full Stack Developer</title>
	<meta
		name="description"
		content="Experienced Full Stack Developer, Syed Mohammad Abuzar Sherazi, skilled in React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, and Django. Proficient in creating responsive UIs and efficient back-ends. Contact me today to bring your web development project to life."
	/>
	<meta
		name="keywords"
		content="Abuzar Sherazi, Full Stack Developer, React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, Django"
	/>
</svelte:head>

<svelte:window on:mousemove={handleMouseMove} />

<section class="parallax-container min-h-screen flex flex-col md:flex-row">
	<!-- Left hero section -->
	<div class="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12 z-10">
		<div class="stagger-children">
			<span class="text-sm uppercase tracking-widest text-primary font-bold mb-2 block">
				Portfolio & Creative Works
			</span>
			<h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
				Syed Muhammad Abuzar<br />
				<span class="gradient-text scramble-text min-h-40">Creative Developer</span>
			</h1>
			<p class="text-lg md:text-xl text-base-content/80 my-6 max-w-xl">
				Building digital experiences with elegant design and powerful functionality. I create
				websites and applications that merge creativity with technical precision.
			</p>
			<div class="flex flex-wrap gap-4 mt-6">
				<a
					href="/contact"
					class="btn btn-primary magnetic-btn"
					on:mousemove={handleButtonMove}
					on:mouseleave={handleButtonLeave}
				>
					Hire Me
				</a>
				<a
					href="#projects"
					class="btn btn-outline magnetic-btn animated-underline"
					on:mousemove={handleButtonMove}
					on:mouseleave={handleButtonLeave}
				>
					View Projects
				</a>
			</div>
		</div>
	</div>

	<!-- Right hero section with decorative elements -->
	<div class="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen flex items-center justify-center ">
		<div class="absolute inset-0 bg-base-300/30 z-0" />
		<div
			class="parallax-layer absolute top-[10%] left-[15%] w-40 h-40 rounded-full bg-primary/20 backdrop-blur-md"
		/>
		<div
			class="parallax-layer absolute bottom-[20%] right-[10%] w-60 h-60 rounded-full bg-secondary/20 backdrop-blur-md"
		/>
		<div
			class="parallax-layer absolute top-[40%] right-[20%] w-20 h-20 rounded-full bg-accent/20 backdrop-blur-md"
		/>
		<div class="image-reveal absolute inset-0 z-0 flex items-center justify-center ">
			<img
				src="https://media.graphassets.com/EAg3lhPPQNWIUHVOvEBE"
				alt="Syed Muhammad Abuzar"
				class="w-full h-auto max-h-[90vh] object-contain"
			/>
		</div>
	</div>
</section>

<!-- Floating marquee divider -->
<div class="w-full py-6 bg-base-200 overflow-hidden">
	<div class="marquee">
		<div class="marquee-content">
			<span class="mx-4 text-xl font-bold">Developer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Designer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Creator</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Problem Solver</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Developer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Designer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Creator</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Problem Solver</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Developer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Designer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Creator</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Problem Solver</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Developer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Designer</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Creator</span>
			<span class="mx-4">•</span>
			<span class="mx-4 text-xl font-bold">Problem Solver</span>
		</div>
	</div>
</div>

<!-- Projects section -->
<section id="projects" class="py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="reveal-text mb-16">
		<h2 class="text-3xl md:text-4xl font-bold">Featured Projects</h2>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
		{#each data.projects.projects as project}
			<div class="spotlight hover-3d">
				<ProjectCard {project} />
			</div>
		{/each}
	</div>

	<div class="text-center mt-12 fade-in">
		<a href="/projects" class="btn btn-outline btn-primary px-8 rounded-lg">View All Projects</a>
	</div>
</section>

<!-- Floating tech stack section -->
<section class="py-16 bg-base-200">
	<div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="reveal-text mb-12">
			<h2 class="text-3xl md:text-4xl font-bold">Tech Stack</h2>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 stagger-children">
			<!-- React -->
			<div class="flex flex-col items-center group">
				<div
					class="w-16 h-16 flex items-center justify-center bg-base-100 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
				>
					<svg viewBox="0 0 24 24" class="w-8 h-8 text-[#61DAFB]">
						<path
							fill="currentColor"
							d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
						/>
					</svg>
				</div>
				<span class="mt-2 font-medium">React</span>
			</div>

			<!-- Svelte -->
			<div class="flex flex-col items-center group">
				<div
					class="w-16 h-16 flex items-center justify-center bg-base-100 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-8 h-8 text-[#FF3E00]"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						id="Layer_1"
						x="0px"
						y="0px"
						viewBox="0 0 98.1 118"
						xml:space="preserve"
					>
						<style type="text/css">
							.st0 {
								fill: #ff3e00;
							}
							.st1 {
								fill: #ffffff;
							}
						</style>
						<path
							class="st0"
							d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"
						/>
						<path
							class="st1"
							d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"
						/>
					</svg>
				</div>
				<span class="mt-2 font-medium">Svelte</span>
			</div>

			<!-- Next.js -->
			<div class="flex flex-col items-center group">
				<div
					class="w-16 h-16 flex items-center justify-center bg-base-100 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						data-testid="geist-icon"
						height="16"
						stroke-linejoin="round"
						class="w-8 h-8"
						style="color:currentColor"
						viewBox="0 0 16 16"
						width="16"
						><g clip-path="url(#clip0_53_108)">
							<circle
								cx="8"
								cy="8"
								r="7.375"
								fill="black"
								stroke="var(--ds-gray-1000)"
								strokewidth="1.25"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M10.63 11V5"
								stroke="url(#paint0_linear_53_108vsxrmxu21)"
								strokewidth="1.25"
								stroke-miterlimit="1.41421"
							/>
							<path
								fill-rule="evenodd"
								cliprule="evenodd"
								d="M5.995 5.00087V5H4.745V11H5.995V6.96798L12.3615 14.7076C12.712 14.4793 13.0434 14.2242 13.353 13.9453L5.99527 5.00065L5.995 5.00087Z"
								fill="url(#paint1_linear_53_108vsxrmxu21)"
							/>
						</g>
						<defs>
							<linearGradient
								id="paint0_linear_53_108vsxrmxu21"
								x1="11.13"
								y1="5"
								x2="11.13"
								y2="11"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="white" />
								<stop offset="0.609375" stop-color="white" stop-opacity="0.57" />
								<stop offset="0.796875" stop-color="white" stop-opacity="0" />
								<stop offset="1" stop-color="white" stop-opacity="0" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_53_108vsxrmxu21"
								x1="9.9375"
								y1="9.0625"
								x2="13.5574"
								y2="13.3992"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="white" />
								<stop offset="1" stop-color="white" stop-opacity="0" />
							</linearGradient>
							<clipPath id="clip0_53_108">
								<rect width="16" height="16" fill="red" />
							</clipPath>
						</defs></svg
					>
				</div>
				<span class="mt-2 font-medium">Next.js</span>
			</div>

			<!-- TypeScript -->
			<div class="flex flex-col items-center group">
				<div
					class="w-16 h-16 flex items-center justify-center bg-base-100 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
				>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#3178C6]" version="1.1" viewBox="0 0 260 260">
							<path d="m9.75 0h240.5c5.385 0 9.75 4.3652 9.75 9.75v240.5c0 5.385-4.365 9.75-9.75 9.75h-240.5c-5.3848 0-9.75-4.365-9.75-9.75v-240.5c0-5.3848 4.3652-9.75 9.75-9.75z" fill="#fff"/>
							<path d="m9.75 0h240.5c5.385 0 9.75 4.3652 9.75 9.75v240.5c0 5.385-4.365 9.75-9.75 9.75h-240.5c-5.3848 0-9.75-4.365-9.75-9.75v-240.5c0-5.3848 4.3652-9.75 9.75-9.75zm134.78 138.32v-21.324h-92.532v21.324h33.036v94.946h26.298v-94.946zm10.485 92.439c4.241 2.162 9.257 3.784 15.048 4.865 5.79 1.081 11.893 1.622 18.309 1.622 6.253 0 12.193-0.595 17.82-1.784 5.628-1.189 10.562-3.149 14.803-5.879s7.598-6.297 10.072-10.703 3.711-9.852 3.711-16.339c0-4.703-0.707-8.824-2.12-12.365-1.414-3.541-3.453-6.69-6.117-9.447s-5.859-5.23-9.583-7.419c-3.725-2.189-7.925-4.257-12.601-6.203-3.425-1.406-6.497-2.771-9.216-4.095-2.718-1.324-5.029-2.676-6.932-4.054-1.903-1.379-3.371-2.838-4.404-4.379-1.033-1.54-1.55-3.284-1.55-5.23 0-1.784 0.463-3.392 1.387-4.824 0.924-1.433 2.229-2.663 3.915-3.69 1.685-1.027 3.751-1.824 6.198-2.392 2.447-0.567 5.165-0.851 8.156-0.851 2.174 0 4.472 0.162 6.891 0.486 2.42 0.325 4.853 0.825 7.299 1.5 2.447 0.676 4.826 1.527 7.137 2.555 2.311 1.027 4.445 2.216 6.402 3.567v-24.244c-3.969-1.514-8.305-2.636-13.008-3.365-4.704-0.73-10.1-1.095-16.189-1.095-6.199 0-12.071 0.662-17.617 1.987-5.546 1.324-10.425 3.392-14.639 6.203s-7.544 6.392-9.991 10.743c-2.447 4.352-3.67 9.555-3.67 15.609 0 7.731 2.243 14.326 6.729 19.785 4.485 5.46 11.295 10.082 20.43 13.866 3.588 1.46 6.932 2.892 10.031 4.298 3.099 1.405 5.777 2.865 8.033 4.378 2.257 1.514 4.037 3.162 5.342 4.946s1.958 3.811 1.958 6.082c0 1.676-0.408 3.23-1.224 4.662-0.815 1.433-2.052 2.676-3.71 3.73-1.659 1.054-3.725 1.879-6.199 2.473-2.474 0.595-5.369 0.892-8.686 0.892-5.654 0-11.254-0.986-16.8-2.959s-10.684-4.933-15.415-8.879z" fill="#3178c6"/>
						</svg>
				</div>
				<span class="mt-2 font-medium">TypeScript</span>
			</div>

			<!-- Tailwind -->
			<div class="flex flex-col items-center group">
				<div
					class="w-16 h-16 flex items-center justify-center bg-base-100 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
				>
					<svg viewBox="0 0 24 24" class="w-8 h-8 text-[#38B2AC]">
						<path
							fill="currentColor"
							d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
						/>
					</svg>
				</div>
				<span class="mt-2 font-medium">Tailwind</span>
			</div>

			<!-- GoLang -->
			<div class="flex flex-col items-center group">
				<div
					class="w-16 h-16 flex items-center justify-center bg-base-100 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
				>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207 78" class="w-8 h-8"><g fill="#ffffff" fill-rule="evenodd"><path d="m16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6z"/><path d="m1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6z"/><path d="m25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z"/><g transform="translate(55)"><path d="m74.1 22.3c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7-3.6 0-8.1 0-19.3 0-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z"/><path d="m107.2 77.6c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z" fill-rule="nonzero"/></g></g></svg>
				</div>
				<span class="mt-2 font-medium">GoLang</span>
			</div>
		</div>

		<div class="text-center mt-8">
			<a href="/about" class="btn btn-outline btn-primary btn-sm">See More Skills</a>
		</div>
	</div>
</section>

<!-- Blog Articles -->
<section class="py-16 bg-base-200">
	<div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="reveal-text mb-12">
			<h2 class="text-3xl md:text-4xl font-bold">Latest Articles</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
			{#each data.posts.posts as post}
				<div class="spotlight">
					<ArticleCard {post} />
				</div>
			{/each}
		</div>

		<div class="text-center mt-8">
			<a href="/posts" class="btn btn-outline btn-primary">All Articles</a>
		</div>
	</div>
</section>

<!-- Call to action -->
<section class="py-24 bg-base-200 relative overflow-hidden">
	<div
		class="parallax-layer absolute top-[10%] left-[5%] w-60 h-60 rounded-full bg-primary/10 backdrop-blur-md"
	/>
	<div
		class="parallax-layer absolute bottom-[10%] right-[5%] w-40 h-40 rounded-full bg-secondary/10 backdrop-blur-md"
	/>

	<div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center stagger-children">
			<span class="text-sm uppercase tracking-widest text-primary font-bold mb-2 block">
				Let's Work Together
			</span>
			<h2 class="text-3xl md:text-5xl font-bold mb-6 glitch" data-text="Got a project in mind?">
				Got a project in mind?
			</h2>
			<p class="text-lg md:text-xl text-base-content/80 my-6 max-w-2xl mx-auto">
				I'm always open to discussing new projects, creative ideas or opportunities to be part of
				your vision. Let's create something amazing together.
			</p>
			<a
				href="/contact"
				class="btn btn-primary btn-lg mt-6 magnetic-btn"
				on:mousemove={handleButtonMove}
				on:mouseleave={handleButtonLeave}
			>
				Get In Touch
			</a>
		</div>
	</div>
</section>
