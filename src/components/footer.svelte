<script>
	import GithubIcon from './icons/github-icon.svelte';
	import TwitterIcon from './icons/twitter-icon.svelte';
	import YouTubeIcon from './icons/youtube-icon.svelte';
</script>

<button
	class="btn btn-ghost btn-sm rounded-btn fixed bottom-4 right-4 z-10 hidden lg:block h-16 w-16"
	on:click={() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path
			fill="#ffffff"
			d="M 12 6.9296875 L 5.9296875 13 L 7.4296875 14.5 L 12 9.9296875 L 16.570312 14.5 L 18.070312 13 L 12 6.9296875 z"
		/>
	</svg>
</button>
<footer class="p-10 footer bg-primary text-primary-content footer-center">
	<div class="grid grid-flow-col gap-8">
		<a class="link link-hover" href="/projects">Portfolio</a>
		<a class="link link-hover" href="/posts">Blog</a>
		<a class="link link-hover" href="/about">About</a>
		<a class="link link-hover" href="/contact">Contact</a>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a
				href="https://www.youtube.com/@abuzarsherazi1054"
				target="_blank"
				rel="noreferrer"
				name="YouTube"
				aria-label="YouTube"
			>
				<YouTubeIcon />
			</a>
			<a
				href="https://twitter.com/SyedMoh25065076"
				target="_blank"
				rel="noreferrer"
				name="Twitter"
				aria-label="Twitter"
			>
				<TwitterIcon />
			</a>
			<a
				href="http://github.com/abubow/"
				target="_blank"
				rel="noreferrer"
				name="Github"
				aria-label="Github"
			>
				<GithubIcon />
			</a>
		</div>
	</div>
	<div>
		<p>
			Copyright &copy; {`${new Date().getFullYear()}`} - All right reserved by Abuzar Sherazi
		</p>
	</div>
</footer>
