<script>
	import {  Carousel, CarouselControl, CarouselItem,Image,InputGroup,Input,Label,Button,Row,Col,Progress  } from 'sveltestrap';
	import { onMount } from "svelte";
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
	let SachHoc
	let activeIndex = 0;

onMount(()=>{
	SachHoc='TPR100V'
getLink()
})
	

async function getLink() {
        activeIndex = 0
		items=[];
		SoTrang=1
		Sach.forEach(element => {
			if(element.Ten==SachHoc){
				SoTrang = element.Trang	
			}
		});
	for  (let page = 1; page <= SoTrang; page++) {
	if(page<10){page = "0"+page}else{page=page}
	items.push({url:`https://flame-lowly-cirrus.glitch.me/Paint/${SachHoc}/${page}.jpg`})
	}
	}

	


</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<Row>
    <Col>
	<InputGroup>
	<Input type="select" name="select" bind:value={SachHoc} >
		{#each Sach as ten}
			<option value={ten.Ten}>{ten.Ten}</option>
		{/each}
	</Input>
	<Button on:click={getLink} >Load</Button>
</InputGroup>
	</Col>
    <Col></Col>
    <Col>
		<Progress value={(activeIndex+1)/SoTrang*100}></Progress>
	</Col>
    <Col>Trang {activeIndex+1}/{SoTrang}</Col>
  </Row>


<Carousel {items} bind:activeIndex>
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
