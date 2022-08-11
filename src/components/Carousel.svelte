<script>
    import { onMount } from 'svelte';
  
    let Carousel; // for saving Carousel component class
    let carousel; // for calling methods of the carousel instance
    onMount(async () => {
      const module = await import('svelte-carousel');
      Carousel = module.default;
    });
  
    const handleNextClick = () => {
      carousel.goToNext()
    }

    const handlePrevClick = () => {
      carousel.goToPrev()
    }

    export let slides;
  </script>
<div class="relative my-8">
    <svelte:component
    this={Carousel}
    bind:this={carousel}
    arrows={false}
    {...slides}
  >
        {#each slides as slide}
            <div>
                <img src="{slide.slide.mediaItemUrl}" alt="bici" class=" w-full">
            </div>
        {/each}

    </svelte:component>

    <div  on:click={handlePrevClick} class="w-11 absolute top-1/2 -translate-y-1/2  left-0  overflow-hidden hidden md:inline-block cursor-pointer">
        <div class=" h-16  bg-fuga-pink -rotate-45 transform origin-top-right"></div>
    </div>
       
    <div on:click={handleNextClick} class="w-11 absolute top-1/2 right-0 -translate-y-1/2  overflow-hidden md:inline-block cursor-pointer hidden">
        <div class=" h-16  bg-fuga-pink rotate-45 transform origin-top-left"></div>
    </div>
</div>
