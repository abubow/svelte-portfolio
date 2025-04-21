<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // Organize skills into rows (without categories)
  const skillRows = [
    ["Python", "Golang", "Rust", "JavaScript", "TypeScript", "C#", "C++", "C", "Java"],
    ["React", "Svelte", "NextJS", "SvelteKit", "HTML", "CSS", "Tailwind", "Styled Components"],
    ["NodeJS", "FastAPI", "Django", "Gin", "Warp", "Rocket.rs", "Diesel.rs", "Echo (Go)"],
    ["AI", "NumPy", "TensorFlow", "PyTorch", "Computer Vision", "YOLO", "Generative AI"],
    ["DevOps", "Docker", "Kubernetes", "AWS", "Lambda", "Systems Design"],
    ["Postgres", "MongoDB", "Redis", "ElasticSearch", "Neo4j", "Kafka", "SQL"],
    ["WebDev", "GraphQL", "gRPC", "Unity", "Godot", "Arduino"]
  ];

  // Animation durations for each row (varying for natural feel)
  const durations = [30000, 25000, 40000, 35000, 28000, 32000, 38000];
  
  // Track which rows move in reverse
  const isReverse = [false, true, false, true, false, true, false];
  
  let skillsElement;
  let sliderRefs = [];

  onMount(() => {
    if (!browser) return;

    // Setup visibility observer to pause animations when not in viewport
    const visibilityObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const elements = entry.target.querySelectorAll('.marquee-content');
          
          elements.forEach(el => {
            if (entry.isIntersecting) {
              el.style.animationPlayState = 'running';
            } else {
              el.style.animationPlayState = 'paused';
            }
          });
        });
      },
      { threshold: 0.1 }
    );

    if (skillsElement) {
      visibilityObserver.observe(skillsElement);
    }

    return () => {
      if (visibilityObserver && skillsElement) {
        visibilityObserver.unobserve(skillsElement);
      }
    };
  });
</script>

<div class="w-full py-12 relative overflow-visible" bind:this={skillsElement}>
  <div class="container mx-auto mb-8 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
    <p class="text-lg opacity-75 max-w-2xl mx-auto">
      Technologies and tools I've worked with throughout my journey
    </p>
  </div>

  <div class="tag-list">
    {#each skillRows as skills, i}
      <div class="marquee">
        <div 
          class="marquee-content {isReverse[i] ? 'reverse' : ''}" 
          style="--duration:{durations[i]}ms;"
          bind:this={sliderRefs[i]}
        >
          {#each skills as skill}
            <div class="tag mx-2">
              <span>#</span> {skill}
            </div>
          {/each}
        </div>
        <div 
          class="marquee-content {isReverse[i] ? 'reverse' : ''}" 
          style="--duration:{durations[i]}ms;"
          aria-hidden="true"
        >
          {#each skills as skill}
            <div class="tag">
              <span>#</span> {skill}
            </div>
          {/each}
        </div>
      </div>
    {/each}
    <div class="fade"></div>
  </div>
</div>

<style>
  .tag-list {
    width: 100%;
    max-width: 90vw;
    margin: 0 auto;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    overflow: visible;
    gap: 1rem 0;
    position: relative;
    padding: 1.5rem 0;
  }

  .marquee {
    display: flex;
    width: 100%;
    user-select: none;
    gap: 0;
    position: relative;
  }

  .marquee-content {
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 100%;
    gap: 1rem;
    animation: scroll var(--duration) linear infinite;
  }
  
  .marquee-content.reverse {
    animation-direction: reverse;
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 0 0.2rem;
    color: hsl(var(--bc) / 0.9);
    font-size: 0.9rem;
    background-color: hsl(var(--n) / 0.8);
    border-radius: 0.4rem;
    padding: 0.7rem 1rem;
    box-shadow: 
      0 0.1rem 0.2rem rgba(0, 0, 0, 0.2),
      0 0.1rem 0.5rem rgba(0, 0, 0, 0.3),
      0 0.2rem 1.5rem rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .tag:hover {
    transform: translateY(-5px);
    background-color: hsl(var(--p) / 0.8);
    box-shadow: 
      0 0.5rem 1rem rgba(0, 0, 0, 0.3),
      0 0.8rem 2rem rgba(0, 0, 0, 0.2);
  }
  
  .tag span {
    font-size: 1.2rem;
    color: hsl(var(--p));
    font-weight: bold;
    margin-right: 0.2rem;
  }

  .fade {
    pointer-events: none;
    background: linear-gradient(
      90deg, 
      hsl(var(--b1)) 0%, 
      transparent 30%, 
      transparent 70%, 
      hsl(var(--b1)) 100%
    );
    position: absolute;
    inset: 0;
  }

  @media (min-width: 768px) {
    .tag-list {
      max-width: 70vw;
    }
  }

  @media (min-width: 1024px) {
    .tag-list {
      max-width: 60vw;
    }
  }
</style> 