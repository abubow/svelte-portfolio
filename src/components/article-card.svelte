<script>
  import { format } from 'date-fns';

  export let post;

  // Format the date
  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  }
</script>

<a href={`/posts/${post.slug}`} class="card h-full hover:scale-[1.02] transition-all duration-300 bg-base-100 shadow-lg overflow-hidden">
  {#if post.coverImage?.url}
    <figure class="relative h-48 w-full overflow-hidden">
      <img
        src={post.coverImage.url}
        alt={post.title}
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        loading="lazy"
      />
      {#if post.tags && post.tags.length > 0}
        <div class="absolute top-0 right-0 p-2 flex gap-1 flex-wrap justify-end">
          {#each post.tags.slice(0, 2) as tag}
            <span class="badge badge-primary badge-sm">{tag}</span>
          {/each}
          {#if post.tags.length > 2}
            <span class="badge badge-sm">+{post.tags.length - 2}</span>
          {/if}
        </div>
      {/if}
    </figure>
  {/if}
  
  <div class="card-body p-5">
    <div class="flex items-center text-sm text-base-content/70 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>{formatDate(post.date)}</span>
      
      {#if post.readTime}
        <span class="mx-2">•</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{post.readTime} min read</span>
      {/if}
    </div>
    
    <h2 class="card-title text-lg font-bold">{post.title}</h2>
    
    <p class="text-base-content/80 text-sm line-clamp-2 mt-1">
      {post.metaDescription || post.description || ''}
    </p>
    
    <div class="card-actions justify-end mt-4">
      <span class="text-primary font-medium text-sm inline-flex items-center group">
        Read Article 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </div>
  </div>
</a>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 