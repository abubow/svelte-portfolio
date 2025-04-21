<script>
  // Tech stack icons with better styling and organization
  
  // Define all technologies you want to showcase
  const technologies = [
    // Front-end
    { name: "HTML", category: "Frontend", className: "text-orange-500" },
    { name: "CSS", category: "Frontend", className: "text-blue-500" },
    { name: "JavaScript", category: "Frontend", className: "text-yellow-500" },
    { name: "TypeScript", category: "Frontend", className: "text-blue-600" },
    { name: "React", category: "Frontend", className: "text-cyan-400" },
    { name: "Svelte", category: "Frontend", className: "text-orange-600" },
    { name: "Next.js", category: "Frontend", className: "text-gray-800 dark:text-gray-200" },
    { name: "Tailwind", category: "Frontend", className: "text-cyan-500" },
    
    // Back-end
    { name: "Node.js", category: "Backend", className: "text-green-600" },
    { name: "Express", category: "Backend", className: "text-gray-700 dark:text-gray-300" },
    { name: "GraphQL", category: "Backend", className: "text-pink-600" },
    { name: "PHP", category: "Backend", className: "text-indigo-400" },
    { name: "Go", category: "Backend", className: "text-cyan-500" },
    { name: "C++", category: "Backend", className: "text-blue-500" },
    
    // Database
    { name: "MongoDB", category: "Database", className: "text-green-500" },
    { name: "PostgreSQL", category: "Database", className: "text-blue-700" },
    { name: "MySQL", category: "Database", className: "text-orange-500" },
    
    // DevOps/Tools
    { name: "Git", category: "Tools", className: "text-orange-600" },
    { name: "Docker", category: "Tools", className: "text-blue-600" },
    { name: "AWS", category: "Tools", className: "text-orange-400" },
    { name: "Vercel", category: "Tools", className: "text-gray-800 dark:text-gray-200" }
  ];
  
  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {});
  
  // Categories in specific display order
  const categories = ["Frontend", "Backend", "Database", "Tools"];
</script>

<div class="py-16">
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="reveal-text mb-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-2">Tech Stack</h2>
      <p class="text-base-content/70">Technologies I work with</p>
    </div>
    
    {#each categories as category}
      <div class="mb-10 fade-in">
        <h3 class="text-xl font-semibold mb-4">{category}</h3>
        
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 stagger-children">
          {#each groupedTechnologies[category] || [] as tech}
            <div class="flex flex-col items-center group">
              <div class="w-16 h-16 flex items-center justify-center bg-base-100 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group-hover:scale-110">
                <span class="text-2xl font-bold {tech.className}">{tech.name.charAt(0)}</span>
              </div>
              <span class="mt-2 font-medium text-sm">{tech.name}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div> 