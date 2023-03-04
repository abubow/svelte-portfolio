<script>
	import { marked } from 'marked';
	/** @type {import('./$types').PageData} */
	export let data;
	const {
		name,
		intro,
		bio,
		picture: { url, width, height }
	} = data.authors[0];
</script>

<svelte:head>
	<title>About {name}</title>
</svelte:head>

<h1 class="font-bold text-center mb-20 text-5xl">About Me</h1>

<div class="flex mb-40 items-end">
	<div class="mr-6">
		<h2 class="text-3xl mb-4 font-bold tracking-wider">{name}</h2>
		<p class="text-xl mb-4">{intro}</p>
	</div>

	<img {width} {height} class="mask mask-squircle" src={url} alt={name} style="width: 200px; height: 200px;" />
</div>

<article div class="prose prose-lg">
	{@html marked(bio)}
</article>
