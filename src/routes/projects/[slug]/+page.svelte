<script>
    import {marked} from 'marked';
    /** @type {import('./$types').PageData} */
    export let data;
</script>
<svelte:head>
  <title>My Portfolio | {data.project.name}</title>
  <meta
    name="description"
    content="Experienced Full Stack Developer skilled in React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, and Django. Proficient in creating responsive UIs and efficient back-ends. Contact me today to bring your web development project to life."
  />
  <meta
    name="keywords"
    content="Abuzar Sherazi, Full Stack Developer, React, NextJs, Svelte, Typescript, GraphQL, NodeJs, GoLang, PHP, Gin, C++, tRPC, Express, Sass, Tailwindcss, Django"
  />
</svelte:head>

<div class="sm:-mx-5 md:-mx-10 lg:-mx-20 xl:-mx-38 mb-5">
  <img
    class="rounded-lg"
    src={data.project.image[0].url}
    alt={data.project.title}
  />
</div>

<h1 class="text-4xl font-semibold mb-5">{data.project.name}</h1>

<div class="mb-5 flex justify-between">
  <div>
    {#if data.project.tags}
      {#each data.project.tags as tag}
        <span
          class="badge badge-primary mr-2 hover:bg-primary-focus cursor-pointer"
          >{tag}</span
        >
      {/each}
    {/if}
  </div>
</div>

<div
  class="mb-5 prose flex prose-a:text-primary hover:prose-a:text-primary-focus"
>
  <a class="mr-5" href={data.project.demo}>Demo</a>
  <a href={data.project.sourceCode}>Source Code</a>
</div>

<article class="prose prose-xl">
  {@html marked(data.project.description)}
</article>