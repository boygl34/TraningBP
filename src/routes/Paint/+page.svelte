<script>
	import { Carousel, CarouselControl, CarouselItem, Image, InputGroup, Input, Label, Button, Row, Col, Progress } from 'sveltestrap';
	import { onMount, onDestroy } from 'svelte';
	import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'sveltestrap';
	import moment from 'moment';
	import { KTV, BoPhan, TenSach, TienDo, TrangDangHoc, id, ThoiGianHoc,SachPaint } from '../store.js';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	if($TenSach=="none"){goto("/")}

	let SoTrang;
	let activeIndex = $TrangDangHoc;
	if ($TrangDangHoc > SoTrang) {
		$TrangDangHoc = 0;
	}
	$SachPaint.forEach((element) => {
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
	let array = $TienDo;
	const uploadtd = setInterval(async () => {
		let iduser = $id;
		$ThoiGianHoc = $ThoiGianHoc + 1;
		array.forEach((element) => {
			if (element.TenSach == $TenSach) {
				(element.TrangDangHoc = activeIndex), (element.SoTrang = SoTrang), (element.ThoiGianHoc = $ThoiGianHoc);
			}
		});
		await axios.patch(`https://serverbp.glitch.me/user/${iduser}`, { TienDo: array });
	}, 60000);
	onDestroy(() => {
		clearInterval(uploadtd);
	});
</script>

<svelte:head>
	<title>{$BoPhan}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Card >
	<CardHeader>
		<CardTitle>
			<Row>
				<Col>{$TenSach}</Col>
				<Col>{activeIndex + 1}/ {SoTrang} - {$ThoiGianHoc}Phút<Progress value={((activeIndex + 1) / SoTrang) * 100} /></Col>
			</Row>
		</CardTitle>
	</CardHeader>
	<CardBody>
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
		</Carousel>
	</CardBody>

	<CardFooter>
		{#if activeIndex == SoTrang - 1}
			{#if $ThoiGianHoc > 5}
				<Button on:click={async()=>{
						let iduser = $id;
					array.forEach((element) => {
			if (element.TenSach == $TenSach) {
				element.TrangDangHoc = activeIndex; 
				element.SoTrang = SoTrang;
				element.ThoiGianHoc = $ThoiGianHoc;
				element.TrangThai= "Hoàn Thành";

			}
		});
		await axios.patch(`https://serverbp.glitch.me/user/${iduser}`, { TienDo: array });
				}


				}>Hoàn Thành</Button>
			{/if}
		{/if}
	</CardFooter>
</Card>
