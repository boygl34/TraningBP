<script>
	import {  Carousel, CarouselControl, CarouselItem,Image,InputGroup,Input,Label,Button,Row,Col,Progress  } from 'sveltestrap';
	import { onMount } from "svelte";
	import moment from "moment"
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
	let SachHoc,ThoiGian
	let activeIndex = 0;
let time = new Date()
onMount(()=>{
	SachHoc='TPR100V'
	setInterval(()=>{
		ThoiGian = moment(new Date()).diff(time,"minutes")
		console.log(ThoiGian);
	},1000)
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
	if(page<10){ page = "0"+page}else{page=page}
	items.push({url:`https://flame-lowly-cirrus.glitch.me/Paint/${SachHoc}/${page}.jpg`})
	}
	}
function Resettime(){
 time = new Date() 
}
	


</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<Row>
    <Col xs="6">
	<InputGroup>
	<Input size="sm" type="select" name="select" bind:value={SachHoc} >
		{#each Sach as ten}
			<option value={ten.Ten}>{ten.Ten}</option>
		{/each}
	</Input>
	<Button size="sm" on:click={getLink} >Load</Button>
</InputGroup>
	</Col>
	<Col>{ThoiGian}</Col>
    <Col>
		<Progress value={(activeIndex+1)/SoTrang*100}></Progress>
	</Col>
   
  </Row>


<Carousel {items} bind:activeIndex>
	<div class="carousel-inner">
		{#each items as item, index}
			<CarouselItem bind:activeIndex itemIndex={index}>
				<Image fluid src={item.url} />
			</CarouselItem>
		{/each}
	</div>
	{#if  activeIndex != 0}
		<CarouselControl direction="prev" bind:activeIndex {items}  />
	{/if}
	{#if  activeIndex < SoTrang-1}
	<CarouselControl direction="next" bind:activeIndex {items} />
	
    {/if}
    {#if  activeIndex == SoTrang-1}
	{#if ThoiGian >5}
		<Button>Hoàn Thành</Button>
	{:else}
	<Button>Bạn Đọc Quá Nhanh</Button>
	{/if}
	{/if}
</Carousel>
