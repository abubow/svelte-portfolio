<script>
	import ThemeSwitcher from './theme-switcher.svelte';
</script>

<navbar class="navbar mb-16 shadow-lg bg-neutral text-neutral-content sticky top-0 z-10 lg:px-96">
	<div class="flex-1 px-2 mx-2">
		<a class="text-lg font-bold" href="/">Portfolio and Blog</a>
	</div>

	<div class="dropdown dropdown-left lg:hidden">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div tabindex="0" class="m-1 btn">Links</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex="0"
			class="bg-neutral rounded-box shadow text-neutral-content p-2 w-52 menu dropdown-content "
		>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/projects" name="Projects"> Portfolio </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/posts" name="Blog"> Blog </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/about" name="About"> About </a>
			<div class="py-4">
				<ThemeSwitcher />
			</div>
		</ul>
	</div>

	<div class="flex-none hidden px-2 mx-2 lg:flex">
		<div class="flex items-stretch">
			<a class="btn btn-ghost btn-sm rounded-btn" href="/projects" name="Projects"> Portfolio </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/posts" name="Blog"> Blog </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/about" name="About"> About </a>
			<div class="px-4">
				<ThemeSwitcher />
			</div>
		</div>
	</div>
</navbar>
