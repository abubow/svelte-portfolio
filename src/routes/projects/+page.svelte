<script>
	import ProjectCard from '../../components/project-card.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>My Portfolio projects</title>
</svelte:head>

<h1 class="font-bold mb-20 text-center text-5xl">Recent Projects by Me</h1>

<div class="grid gap-12 md:grid-cols-4 md:px-10 lg:grid-cols-3 lg:-mx-52">
	{#each data.projects as { name, slug, description, image, tags }}
		<ProjectCard {name} {description} image={image[0]} {slug} {tags} />
	{/each}
</div>
