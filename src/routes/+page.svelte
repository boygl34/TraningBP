<script>
	import {  Carousel, CarouselControl, CarouselItem,Image } from 'sveltestrap';
	

	let data=[]
for (let index = 1; index <= 42; index++) {
	data.push({url:`src/lib/images/TPR101V/TPR101V_${index}.jpg`})
    
}
	let activeIndex = 0;
	const items = data;
console.log(items);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<!-- <Image src='src/lib/images/TPR101V/TPR101V_1.jpg' /> -->
<Carousel {items} bind:activeIndex>
	<div class="carousel-inner">
	  {#each items as item, index}
		<CarouselItem bind:activeIndex itemIndex={index}>
		  <Image fluid  src={item.url} />
		</CarouselItem>
	  {/each}
	</div>
  
	<CarouselControl direction="prev" bind:activeIndex {items} />
	<CarouselControl direction="next" bind:activeIndex {items} />
  </Carousel>

