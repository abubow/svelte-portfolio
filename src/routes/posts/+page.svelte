<script>
	import RightArrow from '../../components/icons/right-arrow.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Blog Posts - Abuzar Sherazi</title>
	<meta
		name="description"
		content="Experienced Full Stack Developer skilled in React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, and Django. Proficient in creating responsive UIs and efficient back-ends. Contact me today to bring your web development project to life."
	/>
	<meta
		name="keywords"
		content="Abuzar Sherazi, Full Stack Developer, React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, Django"
	/>
</svelte:head>

<h1 class="text-4xl mb-10 font-extrabold">Blog posts</h1>

{#each data.posts as { title, slug, metaDescription, coverImage, tags }}
	<div class="card text-center shadow-2xl mb-20 rounded-xl">
		<figure class="">
			<img class="" src={coverImage.url} alt={`Cover image for ${title}`} />
		</figure>
		<div class="card-body prose">
			<h2 class="title">{title}</h2>
			{metaDescription.slice(0, 200)}...
			<div class="flex justify-center mt-5 space-x-2">
				{#each tags as tag}
					<span class="badge badge-primary px-4 py-3 rounded-2xl">{tag}</span>
				{/each}
			</div>
			<div class="justify-center card-actions my-4">
				<a href={`/posts/${slug}`} class="btn btn-outline btn-primary">
					Read <RightArrow class="w-5 h-5 p-8" />
				</a>
			</div>
		</div>
	</div>
{/each}
