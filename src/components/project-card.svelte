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

<a href={`/projects/${slug}`} {name}>
	<div class="card bg-base-100 shadow-xl">
		<figure>
			<img
				src={image.url}
				alt={name}
				class="object-cover h-full"
				height={image.height}
				width={image.width}
				style="max-height: 300px;"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">
				{name}
				<div class="badge badge-secondary">NEW</div>
			</h2>
			<p>{description.slice(0, 60)}...</p>
			<div class="card-actions justify-end">
				{#each tags as tag}
					<div class="badge badge-outline">{tag}</div>
				{/each}
			</div>
		</div>
	</div>
</a>
