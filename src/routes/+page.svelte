<script>
// @ts-nocheck

	import { Input, Label, Button, Row, Col, Progress } from 'sveltestrap';
	import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'sveltestrap';
    import { Badge } from 'sveltestrap'
    import { goto } from '$app/navigation';
	import { KTV, BoPhan,TienDo,TenSach,TrangDangHoc,id,ThoiGianHoc,SachPaint } from './store';
	import axios from 'axios';
	import { onMount } from 'svelte';

	onMount(async () => {
		let ThongTin = await axios.get('https://serverbp.glitch.me/user/TVT_TRUCVC');
        $id=ThongTin.data.id;
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
		<CardTitle>{bai.TenSach} 
            {#if bai.TrangThai=="Hoàn Thành" }
            <Badge color= 'success'>{bai.TrangThai}</Badge>
            {:else if bai.TrangThai=="Giao Bài" }
            <Badge color='danger'>{bai.TrangThai}</Badge>
            {:else if bai.TrangThai=="Đang Học" }
            <Badge color='warning'>{bai.TrangThai}</Badge>
            {/if}        
        </CardTitle>
	</CardHeader>
	<CardBody>
		<CardSubtitle>Hoàn thành Trước : {bai.Deadline}</CardSubtitle>
		<CardText>Ngày Bắt Đầu : {bai.NgayBD}</CardText>
		<Button color= 'success' on:click={()=>{
                $TenSach = bai.TenSach
                $TrangDangHoc = bai.TrangDangHoc
                $ThoiGianHoc=bai.ThoiGianHoc
                goto(`/${$BoPhan}`)     
        }}>Học</Button>
	</CardBody>
	<CardFooter><Progress value={((bai.TrangDangHoc + 1) / bai.SoTrang) * 100} >{(bai.TrangDangHoc + 1)} / {bai.SoTrang}
    </Progress>
    </CardFooter>
</Card>
</Col>
{/each}
</Row>

