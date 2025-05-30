<script>
	import emailjs from '@emailjs/browser';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let mailSentSuccess = false;
	let mailSentError = false;
	let sending = false;
	let formVisible = true;
	let socialLinks = [
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/syed-mohammad-abuzar/', icon: 'linkedin' },
		{ name: 'GitHub', url: 'https://github.com/abubow', icon: 'github' },
	];

	function sendEmail(e) {
		e.preventDefault();
		mailSentSuccess = false;
		mailSentError = false;
		sending = true;
		
		// Create form data object for better debugging and control
		const formData = {
			from_name: e.target.from_name.value,
			email: e.target.email.value,
			time: new Date().toLocaleString(),
			subject: e.target.subject.value,
			message: e.target.message.value
		};
		
		// Log form data for debugging
		console.log('Sending form data:', formData);
		
		// Send email with form data object
		emailjs
			.send(
				'service_mbk9sms',
				'template_7o1jser',
				formData,
				'4T1037Dv231-3kW6A'
			)
			.then(
				(result) => {
					console.log('Email sent successfully:', result.text);
					mailSentSuccess = true;
					sending = false;
					formVisible = false;
					setTimeout(() => {
						formVisible = true;
					}, 5000);
				},
				(error) => {
					console.error('Email send error:', error.text);
					mailSentError = true;
					sending = false;
				}
			);
	}

	$: if (mailSentSuccess) {
		setTimeout(() => {
			mailSentSuccess = false;
		}, 5000);
	}

	$: if (mailSentError) {
		setTimeout(() => {
			mailSentError = false;
		}, 5000);
	}
	
	// Get current year for copyright
	const currentYear = new Date().getFullYear();
	
	// For contact info animations
	let mounted = false;
	
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
	></script>
	<script type="text/javascript">
		(function () {
			emailjs.init("4T1037Dv231-3kW6A");
		})();
	</script>
	<title>Contact - Abuzar Sherazi</title>
	<meta name="description" content="Get in touch with Abuzar Sherazi. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision." />
</svelte:head>

<section class="py-16 md:py-24 bg-base-100">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Page Header with animated underline -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-bold mb-4" in:fly={{ y: -20, duration: 600 }}>
				Get In Touch
			</h1>
			<div class="w-24 h-1 bg-primary mx-auto rounded"></div>
			<p class="mt-6 text-lg max-w-2xl mx-auto text-base-content/80" in:fly={{ y: 20, duration: 600, delay: 200 }}>
				I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
			<!-- Contact Form Container -->
			<div class="bg-base-200 p-8 rounded-2xl shadow-lg" in:fly={{ x: -30, duration: 600, delay: 300 }}>
				<h2 class="text-2xl font-bold mb-6">Send Me a Message</h2>
				
				{#if mailSentSuccess}
					<div class="alert alert-success shadow-lg" in:fly={{ y: 10, duration: 300 }}>
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<div>
							<h3 class="font-bold">Thank you!</h3>
							<div class="text-sm">Your message has been sent successfully.</div>
						</div>
					</div>
				{/if}
				
				{#if mailSentError}
					<div class="alert alert-error shadow-lg" in:fly={{ y: 10, duration: 300 }}>
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<div>
							<h3 class="font-bold">Error!</h3>
							<div class="text-sm">There was a problem sending your message. Please try again.</div>
						</div>
					</div>
				{/if}
				
				{#if formVisible}
					<form class="flex flex-col space-y-6" on:submit|preventDefault={sendEmail} in:fade={{ duration: 300 }}>
						<div class="form-control w-full">
							<label class="label" for="from_name">
								<span class="label-text">Your Name</span>
							</label>
							<input
								type="text"
								placeholder="John Doe"
								class="input input-bordered w-full"
								id="from_name"
								name="from_name"
								required
							/>
						</div>

						<div class="form-control w-full">
							<label for="email">
								<span class="label-text">Your Email</span>
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="you@example.com"
								class="input input-bordered w-full"
								required
							/>
						</div>
						
						<div class="form-control w-full">
							<label for="subject">
								<span class="label-text">Subject</span>
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								placeholder="How can I help you?"
								class="input input-bordered w-full"
								required
							/>
						</div>

						<div class="form-control w-full">
							<label for="message">
								<span class="label-text">Your Message</span>
							</label>
							<textarea
								id="message"
								name="message"
								class="textarea textarea-bordered h-32 w-full"
								placeholder="Tell me about your project or inquiry..."
								required
							></textarea>
						</div>

						<button 
							class="btn btn-primary w-full" 
							type="submit" 
							disabled={sending}
						>
							{#if sending}
								<span class="loading loading-spinner loading-sm mr-2"></span>
								Sending...
							{:else}
								Send Message
							{/if}
						</button>
					</form>
				{/if}
			</div>

			<!-- Contact Info & Social Media Container -->
			<div in:fly={{ x: 30, duration: 600, delay: 300 }}>
				<!-- Direct Contact Information -->
				<div class="mb-10">
					<h2 class="text-2xl font-bold mb-6">Contact Information</h2>
					
					<ul class="space-y-4">
						<li class="flex items-start space-x-4">
							<div class="bg-primary/10 p-3 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<div>
								<h3 class="font-medium mb-1">Email</h3>
								<a href="mailto:smabuzar00@gmail.com" class="text-primary hover:underline">
									smabuzar00@gmail.com
								</a>
							</div>
						</li>
						
						<li class="flex items-start space-x-4">
							<div class="bg-primary/10 p-3 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
								</svg>
							</div>
							<div>
								<h3 class="font-medium mb-1">Phone</h3>
								<a href="tel:+923216505893" class="text-primary hover:underline">
									+92 321 6505893
								</a>
							</div>
						</li>
						
						<li class="flex items-start space-x-4">
							<div class="bg-primary/10 p-3 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
							<div>
								<h3 class="font-medium mb-1">Location</h3>
								<p class="text-base-content/80">
									Lahore, Pakistan
								</p>
							</div>
						</li>
					</ul>
				</div>
				
				<!-- Social Media Links -->
				<div>
					<h2 class="text-2xl font-bold mb-6">Connect With Me</h2>
					
					<div class="grid grid-cols-2 gap-4">
						{#each socialLinks as link, i}
							<a 
								href={link.url} 
								target="_blank" 
								rel="noopener noreferrer"
								class="flex items-center p-4 bg-base-200 rounded-lg transition-all hover:bg-primary/10 hover:scale-105"
								in:fly={{ y: 10, duration: 400, delay: 400 + (i * 100) }}
							>
								{#if link.icon === 'linkedin'}
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
										<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
									</svg>
								{:else if link.icon === 'github'}
									<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
									</svg>
								{/if}
								<span>{link.name}</span>
							</a>
						{/each}
					</div>
				</div>
				
				<!-- FAQ or additional info (optional) -->
				<div class="mt-10 bg-base-200 p-6 rounded-lg" in:fly={{ y: 30, duration: 600, delay: 600 }}>
					<h3 class="text-xl font-bold mb-4">Available for freelance work</h3>
					<p class="text-base-content/80">
						I'm currently accepting new projects and would love to hear about yours. Let's build something amazing together!
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
