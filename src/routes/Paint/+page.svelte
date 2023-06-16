<script>
	import { Carousel, CarouselControl, CarouselItem, Image, InputGroup, Input, Label, Button, Row, Col, Progress } from 'sveltestrap';
	import { onMount,onDestroy } from 'svelte';
	import moment from 'moment';
	import { KTV, BoPhan, TenSach, TienDo, TrangDangHoc,id } from '../store.js';
	import axios from 'axios';
	const Sach = [
		{ Ten: 'TPR100V', Trang: 32 },
		{ Ten: 'TPR101V', Trang: 42 },
		{ Ten: 'TPR102V', Trang: 22 },
		{ Ten: 'TPR103V', Trang: 30 },
		{ Ten: 'TPR104V', Trang: 38 },
		{ Ten: 'TPR105V', Trang: 34 },
		{ Ten: 'TPR106V', Trang: 58 },
		{ Ten: 'TPR107V', Trang: 26 },
		{ Ten: 'TPR108V', Trang: 22 }
	];
	let SoTrang, ThoiGian;
	let activeIndex =$TrangDangHoc;
	if($TrangDangHoc>SoTrang){$TrangDangHoc=0}
	Sach.forEach((element) => {
		if (element.Ten == $TenSach) {
			SoTrang = element.Trang;
		}
	});
	let items = [];
	for (let page = 1; page <= SoTrang; page++) {
		if (page < 10) {
			page = '0' + page;
		} else {
			page = page;
		}
		items.push({ url: `https://flame-lowly-cirrus.glitch.me/Paint/${$TenSach}/${page}.jpg` });
	}

	let time = new Date();
let array = $TienDo
const uploadtd=	setInterval(async() => {
			let iduser = $id
			array.forEach(element => {
				if(element.TenSach == $TenSach){
					element.TrangDangHoc = activeIndex,
					element.SoTrang = SoTrang
				}
			});	
		await axios.patch(`https://serverbp.glitch.me/user/${iduser}`,{"TienDo":array})	
		}, 3000);
onDestroy(()=>{
	clearInterval(uploadtd)
})
</script>

<svelte:head>
	<title>{$TenSach}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<Progress value={((activeIndex + 1) / SoTrang) * 100} />

<Carousel {items} bind:activeIndex>
	<div class="carousel-inner">
		{#each items as item, index}
			<CarouselItem bind:activeIndex itemIndex={index}>
				<Image fluid src={item.url} />
			</CarouselItem>
		{/each}
	</div>
	{#if activeIndex != 0}
		<CarouselControl direction="prev" bind:activeIndex {items} />
	{/if}
	{#if activeIndex < SoTrang - 1}
		<CarouselControl direction="next" bind:activeIndex {items} />
	{/if}
	{#if activeIndex == SoTrang - 1}
		{#if ThoiGian > 5}
			<Button>Hoàn Thành</Button>
		{:else}
			<Button>Bạn Đọc Quá Nhanh</Button>
		{/if}
	{/if}
</Carousel>
