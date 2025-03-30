<script>
	import { onMount, tick } from 'svelte';
	let theme;
	let showThemeSelector = false;
	let themeSelectorRef;

	const featuredThemes = [
		{ name: 'Light', value: 'light', icon: '☀️' },
		{ name: 'Dark', value: 'dark', icon: '🌙' },
		{ name: 'Cyberpunk', value: 'cyberpunk', icon: '⚡' },
		{ name: 'Dracula', value: 'dracula', icon: '🧛' },
		{ name: 'Synthwave', value: 'synthwave', icon: '🌊' },
		{ name: 'Retro', value: 'retro', icon: '📺' }
	];

	let themes = [
		'Acid',
		'Aqua',
		'Autumn',
		'Black',
		'Bumblebee',
		'Business',
		'CMYK',
		'Coffee',
		'Corporate',
		'Cupcake',
		'Cyberpunk',
		'Dark',
		'Dracula',
		'Emerald',
		'Fantasy',
		'Forest',
		'Garden',
		'Halloween',
		'Lemonade',
		'Light',
		'Lofi',
		'Luxury',
		'Night',
		'Pastel',
		'Retro',
		'Synthwave',
		'Valentine',
		'Winter',
		'Wireframe'
	];

	function handleThemeChange(newTheme) {
		theme = newTheme;
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
		showThemeSelector = false;
	}

	// Close theme selector when clicking outside
	function handleClickOutside(event) {
		if (themeSelectorRef && !themeSelectorRef.contains(event.target)) {
			showThemeSelector = false;
		}
	}

	onMount(async () => {
		theme = localStorage.getItem('theme') || 'dark';
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
		
		// Add event listener for outside clicks
		document.addEventListener('click', handleClickOutside);
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative" bind:this={themeSelectorRef}>
	<button 
		class="btn btn-circle btn-ghost"
		on:click={() => showThemeSelector = !showThemeSelector}
		aria-label="Change theme"
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
		</svg>
	</button>
	
	{#if showThemeSelector}
		<div class="absolute right-0 mt-2 w-64 p-3 rounded-xl shadow-lg bg-base-200 z-50">
			<div class="mb-3">
				<h3 class="text-base-content font-medium mb-2">Featured Themes</h3>
				<div class="grid grid-cols-3 gap-2">
					{#each featuredThemes as featuredTheme}
						<button 
							class="flex flex-col items-center p-2 rounded hover:bg-base-300 transition-colors {theme === featuredTheme.value ? 'border-2 border-primary' : ''}"
							on:click={() => handleThemeChange(featuredTheme.value)}
						>
							<span class="text-xl">{featuredTheme.icon}</span>
							<span class="text-xs mt-1">{featuredTheme.name}</span>
						</button>
					{/each}
				</div>
			</div>
			
			<div>
				<h3 class="text-base-content font-medium mb-2">All Themes</h3>
				<div class="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto pr-1">
					{#each themes as themeOption}
						<button 
							class="text-left px-2 py-1 rounded hover:bg-base-300 transition-colors {theme === themeOption.toLowerCase() ? 'bg-base-300 font-medium' : ''}"
							on:click={() => handleThemeChange(themeOption.toLowerCase())}
						>
							{themeOption}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
