<script>
// @ts-nocheck

	import { Input, Label, Button, Row, Col, Progress } from 'sveltestrap';
	import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'sveltestrap';
    import { Badge } from 'sveltestrap'
    import { goto } from '$app/navigation';
	import { KTV, BoPhan,TienDo,TenSach,TrangDangHoc,id,ThoiGianHoc,SachPaint,Job } from './store';
	import axios from 'axios';
	import { onMount } from 'svelte';
	let iduser = localStorage.getItem("iduser")
    if(!iduser){
		let person = prompt("ID Đăng Nhâp");
			if (person != null) {
				dangnhap(person)
			}
		
		}else{
			dangnhap(localStorage.getItem("iduser"))
		
		}

	async	function dangnhap(params) {
			let ThongTin = await axios.get(`https://serverbp.glitch.me/user/${params}`)
									  .then(function (response) {
										localStorage.setItem("iduser",response.data.id)
										console.log(response.data.job);
										$Job = response.data.job
										$id=response.data.id
										$KTV = response.data.fullname;
										$BoPhan = response.data.BoPhan;
										$TienDo = response.data.TienDo;
    										})
										.catch(function (error) {
											alert("Lỗi không thể đăng nhập")
										})

			
		}



</script>

  

<Row cols={{ lg: 3, md: 2, sm: 1 }}>
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
		<CardSubtitle>Hoàn thành Trước : {bai.NgayHT}</CardSubtitle>
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

