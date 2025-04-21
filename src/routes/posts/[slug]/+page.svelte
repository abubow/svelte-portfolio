<script>
	import { marked } from 'marked';
	import ArticleCard from '../../../components/article-card.svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	const { title, date, tags, content, coverImage, metaDescription, metaTags } = data.post;
	
	// Filter other posts to get related posts (by matching tags)
	const otherPosts = data.otherPosts || [];
	
	// Find related posts based on matching tags
	let relatedPosts = [];
	if (tags && tags.length > 0 && otherPosts.length > 0) {
		// Sort posts by number of matching tags, in descending order
		relatedPosts = otherPosts
			.filter(post => post.tags && post.tags.some(tag => tags.includes(tag)))
			.sort((a, b) => {
				const aMatches = a.tags.filter(tag => tags.includes(tag)).length;
				const bMatches = b.tags.filter(tag => tags.includes(tag)).length;
				return bMatches - aMatches;
			})
			.slice(0, 3);
		
		// If we don't have 3 related posts, fill with other posts
		if (relatedPosts.length < 3) {
			const remainingPosts = otherPosts
				.filter(post => !relatedPosts.some(rp => rp.slug === post.slug))
				.slice(0, 3 - relatedPosts.length);
			
			relatedPosts = [...relatedPosts, ...remainingPosts];
		}
	} else {
		// If no tags or no other posts, just show most recent posts
		relatedPosts = otherPosts.slice(0, 3);
	}
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

<!-- Related Posts Section -->
{#if relatedPosts.length > 0}
<section class="mt-16 pt-16 border-t border-base-300">
	<h2 class="text-2xl font-bold mb-8">You might also like</h2>
	
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		{#each relatedPosts as post}
			<div class="fade-in">
				<ArticleCard {post} />
			</div>
		{/each}
	</div>
</section>
{/if}
