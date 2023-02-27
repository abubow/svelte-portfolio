<script>
	/** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Projects</h1>
<pre>{JSON.stringify(data.projects, null, 2)}</pre>
<pre>{JSON.stringify(data.message, null, 2)}</pre>
