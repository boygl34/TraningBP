<script>
	import {  Carousel, CarouselControl, CarouselItem,Image,FormGroup,Input,Label } from 'sveltestrap';
	const Sach=[{Ten:"TPR100V",Trang:32},
				{Ten:"TPR101V",Trang:42},
				{Ten:"TPR102V",Trang:22},
				{Ten:"TPR103V",Trang:30},
				{Ten:"TPR104V",Trang:38},
				{Ten:"TPR105V",Trang:34},
				{Ten:"TPR106V",Trang:58},
				{Ten:"TPR107V",Trang:26},
				{Ten:"TPR108V",Trang:22}]
    let items=[]
	let SoTrang 
	let SachHoc='TPR100V'
	let activeIndex = 0;
	getLink()
	function getLink() {
		console.log(SachHoc);
        activeIndex = 0
		items=[];
		SoTrang=42
	for (let SoTrang = 1; SoTrang <= 42; SoTrang++) {
	if(SoTrang<10){SoTrang = "0"+SoTrang}else{SoTrang=SoTrang}
	items.push({url:`https://flame-lowly-cirrus.glitch.me/Paint/${SachHoc}/${SoTrang}.jpg`})
	}
	console.log(items);
	}

	


</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<FormGroup>
	<Input type="select" name="select" bind:value={SachHoc} on:change={getLink}>
		{#each Sach as ten}
			<option value={ten.Ten}>{ten.Ten}</option>
		{/each}
	</Input>
</FormGroup>

<Carousel bind:items={items} bind:activeIndex>
	<div class="carousel-inner">
		{#each items as item, index}
			<CarouselItem bind:activeIndex itemIndex={index}>
				<Image fluid src={item.url} />
			</CarouselItem>
		{/each}
	</div>

	<CarouselControl direction="prev" bind:activeIndex {items} />
	<CarouselControl direction="next" bind:activeIndex {items} />
</Carousel>
