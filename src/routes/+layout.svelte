<script>
	import '../app.postcss';
	import Footer from '../components/footer.svelte';
	import Navbar from '../components/navbar.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	onMount(async () => {
		themeChange(false);
	});

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Navbar />
<main class="container max-w-3xl mx-auto px-4 mb-20">
	<slot />
</main>
<Footer />
