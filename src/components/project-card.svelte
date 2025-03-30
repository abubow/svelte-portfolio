<script>
	export let image;
	export let name = '';
	export let slug = '';
	export let description = '';
	export let tags = [];
</script>

<!-- previous data -->
<!-- <div class="relative group card shadow-2xl col-span-2">
	<figure class="overflow-hidden rounded-xl">
		<img
			src={image.url}
			alt={name}
			class="object-cover h-full"
			height={image.height}
			width={image.width}
			style="max-height: 300px;"
		/>
	</figure>
	<a href={`/projects/${slug}`} {name}>
		<div
			class="absolute bottom-0 left-0 right-0 lg:opacity-0 group-hover:opacity-100 bg-primary p-4 duration-300 text-primary-content"
		>
			<h2 class="font-bold lg:text-xl">{name}</h2>
			<p class="text-sm lg:text-xl">
				{description.slice(0, 60)}...
			</p>
		</div>
	</a>
</div> -->
<!-- Template to be converted -->
<!-- <div class="card w-96 bg-base-100 shadow-xl">
	<figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
	<div class="card-body">
	  <h2 class="card-title">
		Shoes!
		<div class="badge badge-secondary">NEW</div>
	  </h2>
	  <p>If a dog chews shoes whose shoes does he choose?</p>
	  <div class="card-actions justify-end">
		<div class="badge badge-outline">Fashion</div> 
		<div class="badge badge-outline">Products</div>
	  </div>
	</div>
  </div> -->

<!-- formatted -->

<a 
	href={`/${slug}`} 
	class="group block hover-card overflow-hidden rounded-xl bg-base-100"
>
	<div class="relative overflow-hidden">
		<!-- Image with overlay gradient effect -->
		<img
			src={image.url}
			alt={name}
			class="object-cover w-full transition-transform duration-500 group-hover:scale-105"
			height={image.height}
			width={image.width}
			style="height: 200px;"
		/>
		
		<!-- Tags overlay at top -->
		{#if tags.length > 0}
			<div class="absolute top-0 right-0 p-3 flex flex-wrap justify-end gap-1 max-w-[70%]">
				{#each tags.slice(0, 3) as tag}
					<span class="badge badge-sm badge-primary badge-outline bg-base-100/70 backdrop-blur-sm">
						{tag}
					</span>
				{/each}
				{#if tags.length > 3}
					<span class="badge badge-sm badge-primary">+{tags.length - 3}</span>
				{/if}
			</div>
		{/if}
	</div>
	
	<div class="p-5">
		<h2 class="card-title text-lg font-bold mb-2 group-hover:text-primary transition-colors">
			{name.length > 30 ? `${name.slice(0, 30)}...` : name}
		</h2>
		
		<p class="text-sm opacity-90 line-clamp-3 mb-3">
			{description.length > 150 ? `${description.slice(0, 150)}...` : description}
		</p>
		
		<div class="flex justify-between items-center mt-2">
			<span class="text-xs text-primary font-medium">View project →</span>
			
			<!-- New badge if needed -->
			<!-- <span class="badge badge-sm badge-secondary">New</span> -->
		</div>
	</div>
</a>
