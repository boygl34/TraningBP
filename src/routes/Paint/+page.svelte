<script>
	import { Carousel, CarouselControl, CarouselItem, Image, InputGroup, Input, Label, Button, Row, Col, Progress } from 'sveltestrap';
	import { onMount } from 'svelte';
	import moment from 'moment';
	import { KTV, BoPhan, TenSach, TienDo, TrangDangHoc } from '../store.js';
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
	let activeIndex =0;
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
	let SachHoc = $TenSach;
	
	let time = new Date();
	onMount(() => {
		activeIndex=$TrangDangHoc*1
		setInterval(() => {
			ThoiGian = moment(new Date()).diff(time, 'minutes');
		}, 1000);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<Row>
	<Col xs="6">
		<InputGroup>
			<Input size="sm" type="select" name="select" bind:value={$TenSach}>
				{#each Sach as ten}
					<option value={ten.Ten}>{ten.Ten}</option>
				{/each}
			</Input>
		</InputGroup>
	</Col>
	<Col>{ThoiGian}</Col>
	<Col />
</Row>

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
