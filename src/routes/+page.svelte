<script>
	import { CardImg, Carousel, CarouselControl, CarouselItem, Image } from 'sveltestrap';
	Image
	let activeIndex = 0;
	const items = [];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Carousel {items} bind:activeIndex>
	<div class="carousel-inner">
	  {#each items as item, index}
		<CarouselItem bind:activeIndex itemIndex={index}>
		  <Image src={item} class="d-block w-100" alt={`${item} ${index + 1}`} />
		</CarouselItem>
	  {/each}
	</div>
  
	<CarouselControl direction="prev" bind:activeIndex {items} />
	<CarouselControl direction="next" bind:activeIndex {items} />
  </Carousel>

