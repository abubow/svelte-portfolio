<script>
	import TwitterIcon from './icons/twitter-icon.svelte';
	import YouTubeIcon from './icons/youtube-icon.svelte';
</script>

<footer class="p-10 footer bg-primary text-primary-content footer-center">
	<div class="grid grid-flow-col gap-4">
		<a class="link link-hover" href="/projects">Portfolio</a>
		<a class="link link-hover" href="/posts">Blog</a>
		<a class="link link-hover" href="/about">About</a>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
			<a href="https://www.youtube.com/@abuzarsherazi1054" target="_blank" rel="noreferrer" name="YouTube" aria-label="YouTube">
				<YouTubeIcon />
			</a>
			<a href="https://twitter.com/SyedMoh25065076" target="_blank" rel="noreferrer" name="Twitter" aria-label="Twitter">
				<TwitterIcon />
			</a>
		</div>
	</div>
	<div>
		<p>
			Copyright &copy; {`${new Date().getFullYear()}`} - All right reserved by Abuzar Sherazi
		</p>
	</div>
</footer>
