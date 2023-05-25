<script>
	import ThemeSwitcher from './theme-switcher.svelte';
	import BurgerMenu from './icons/burgerMenu.svelte';

	let open = false;

	function toggle() {
		open = !open;
	}
</script>

<navbar class="navbar mb-16 shadow-lg bg-neutral text-neutral-content sticky top-0 z-10 lg:px-96">
	<div class="flex-1 px-2 mx-2">
		<a class="text-lg font-bold" href="/">Abuzar</a>
	</div>

	<div class="dropdown dropdown-left lg:hidden">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div tabindex="0" class="m-1 btn">
			<BurgerMenu playOpen={open} playClose={!open} on:click={toggle} />
		</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex="0"
			class="bg-neutral rounded-box shadow text-neutral-content p-2 w-52 menu dropdown-content "
		>
				<ThemeSwitcher />
			<a class="btn btn-ghost btn-sm rounded-btn" href="/projects" name="Projects"> Portfolio </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/posts" name="Blog"> Blog </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/about" name="About"> About </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/contact" name="Contact"> Contact </a>
		</ul>
	</div>

	<div class="flex-none hidden px-2 mx-2 lg:flex gap-4">
		<div class="flex items-stretch">
			<a class="btn btn-ghost btn-sm rounded-btn" href="/projects" name="Projects"> Portfolio </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/posts" name="Blog"> Blog </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/about" name="About"> About </a>
			<a class="btn btn-ghost btn-sm rounded-btn" href="/contact" name="Contact"> Contact </a>
			<div>
				<ThemeSwitcher />
			</div>
		</div>
	</div>
</navbar>
