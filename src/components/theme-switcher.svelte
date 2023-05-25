<script>
	import { onMount } from 'svelte';
	let theme;
	function handleThemeChange(event) {
		theme = event.target.value;
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
		console.log('theme', theme);
	}

	onMount(() => {
		theme = localStorage.getItem('theme');
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	});
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
</script>

<div>
	<select
		data-choose-theme
		bind:value={theme}
		on:change={handleThemeChange}
		class="select-sm text-base-content select select-bordered select-secondary w-full"
	>
		<option disabled="disabled" selected="selected">Choose a theme</option>
		{#each themes as theme}
			<option value={theme.toLowerCase()}>{theme}</option>
		{/each}
	</select>
</div>
