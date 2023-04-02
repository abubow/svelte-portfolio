<script>
	import { marked } from 'marked';
	/** @type {import('./$types').PageData} */
	export let data;

	const { title, date, tags, content, coverImage, metaDescription, metaTags } = data.post;
</script>

<svelte:head>
	<title>{title} - Abuzar Sherazi</title>
	<meta name="description" content={metaDescription} />
	<meta name="keywords" content={metaTags} />
	<meta name="image" content={coverImage.url} />
	<meta property="published" content={date} />
	<meta property="category" content={tags} />
	<meta property="og:url" content="https://abuzar.live" />
	<meta property="og:type" content="blog" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={coverImage.url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@SyedMoh25065076" />
	<meta name="twitter:creator" content="@SyedMoh25065076" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={coverImage.url} />
</svelte:head>

<div class="sm:-mx-5 md:-mx-10 lg:-mx-20 my-5">
	<img class="rounded-xl" src={coverImage.url} alt={`Cover image for ${title}`} />
</div>

<div class="prose prose-xl">
	<h1>{title}</h1>
</div>

<p class="text-secondary text-sm tracking-widest font-semibold my-3">
	{new Date(date).toDateString()}
</p>

<div class="mb-5 flex justify-between">
	{#if tags}
		<div class="mt-5 space-x-2">
			{#each tags as tag}
				<span class="badge badge-primary py-4 px-5">{tag}</span>
			{/each}
		</div>
	{/if}
</div>

<article div class="prose prose-xl">
	{@html marked(content)}
</article>
