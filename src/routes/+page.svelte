<script>
	import { Input, Label, Button, Row, Col, Progress } from 'sveltestrap';
	import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'sveltestrap';
    import { Badge } from 'sveltestrap'
    import { goto } from '$app/navigation';
	import { KTV, BoPhan,TienDo,TenSach,TrangDangHoc } from './store';
	import axios from 'axios';
	import { onMount } from 'svelte';

	onMount(async () => {
		let ThongTin = await axios.get('https://serverbp.glitch.me/user/TVT_TRUCVC');
		console.log(ThongTin.data);
		$KTV = ThongTin.data.fullname;
		$BoPhan = ThongTin.data.BoPhan;
		$TienDo = ThongTin.data.TienDo;
	});
</script>
<Row>
{#each $TienDo as bai }
<Col>
    <Card class="mb-3">
	<CardHeader>
		<CardTitle>{bai.TenSach}  <Badge >{bai.TrangThai}</Badge></CardTitle>
	</CardHeader>
	<CardBody>
		<CardSubtitle>Hoàn thành Trước : {bai.Deadline}</CardSubtitle>
		<CardText>Ngày Bắt Đầu : {bai.NgayBD}</CardText>
		<Button on:click={()=>{
                $TenSach = bai.TenSach
                $TrangDangHoc = bai.TrangDangHoc
                goto(`/${$BoPhan}`)     
        }}>Học</Button>
	</CardBody>
	<CardFooter>Footer</CardFooter>
</Card>
</Col>
{/each}
</Row>
