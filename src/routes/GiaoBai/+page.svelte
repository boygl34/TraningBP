<script>
	import axios from 'axios';
	import { Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle, Badge, Input, InputGroup, Progress } from 'sveltestrap';
	import { KTV, BoPhan, TienDo, TenSach, TrangDangHoc, id, ThoiGianHoc, SachPaint, SachBody } from '../store';
	import { Form, FormGroup, FormText, Label, Row, Col } from 'sveltestrap';
	import SveltyPicker from 'svelty-picker';
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';
	
	
	
	let promise = getThongTin();
	async function getThongTin() {
		let BaoCao = await axios.get('https://serverbp.glitch.me/user');
		let res = BaoCao.data;
		if (res.length > 0) {
			return res;
		} else {
			throw new Error(res);
		}
	}
	let BoPhanGiaoBai, KTVGiaoBai, SachGiaoBai;
	$: if (BoPhanGiaoBai == 'Paint') {
		SachGiaoBai = $SachPaint;
	} else {
		SachGiaoBai = $SachBody;
	}

 
</script>

<FormGroup>
	<Label for="exampleEmail">Bộ Phận</Label>
	<Input type="select" name="select" bind:value={BoPhanGiaoBai}>
		<option />
		<option value="Paint">Sơn</option>
		<option value="Body">Đông</option>
	</Input>
</FormGroup>

{#await promise}
	<p>...waiting</p>
{:then BaoCao}
	<FormGroup>
		<Label for="exampleEmail">Tên KTV</Label>
		<Input type="select" name="select" bind:value={KTVGiaoBai}>
			<option />
			{#each BaoCao as ktv}
				{#if ktv.BoPhan == BoPhanGiaoBai}
					<option value={ktv.id}>{ktv.fullname}</option>
				{/if}
			{/each}
		</Input>
	</FormGroup>
	<Row cols={{ lg: 3, md: 2, sm: 1 }}>
		{#each BaoCao as ktv}
			{#if ktv.id == KTVGiaoBai && ktv.BoPhan == BoPhanGiaoBai}
				{#each SachGiaoBai as sachgiao}
					<Col>
						<Card  >
							<CardHeader body color="info">
								<CardTitle color="info"
									>{sachgiao.Ten}
									{#each ktv.TienDo as sach}
										{#if sach.TenSach == sachgiao.Ten}
											{#if sach.TrangThai == 'Hoàn Thành'}
												<Badge color="success">{sach.TrangThai}</Badge>
											{:else if sach.TrangThai == 'Giao Bài'}
												<Badge color="danger">{sach.TrangThai}</Badge>
											{:else if sach.TrangThai == 'Đang Học'}
												<Badge color="warning">{sach.TrangThai}</Badge>
											{/if}
										{/if}
									{/each}
								</CardTitle>
							</CardHeader>
							<CardBody>

                                    {#each ktv.TienDo as sach}
                                        {#if sach.TenSach == sachgiao.Ten}
										<Row>
											<Col>
                                            <FormGroup floating label="Ngày Hoàn Thành">
                                                <SveltyPicker inputClasses=" floating form-control" format="dd/mm/yyyy" inputId={sach.TenSach+'NgayHT'} name="NgayHT" value={sach.NgayHT}  />
                                            </FormGroup>
										  </Col>
										  <Col>
                                            <FormGroup floating label="Ngày Bắt Đầu">
                                                <SveltyPicker inputClasses=" floating form-control" format="dd/mm/yyyy" name="NgayBD" value={sach.NgayBD} disabled/>
                                            </FormGroup>
										</Col>
										</Row>	
                                            <Button on:click={async()=>{
                                                  let NgayHT = document.getElementById(sach.TenSach+'NgayHT').value;
												  ktv.TienDo.forEach(element => {
													if (element.TenSach ==sach.TenSach){
														element.NgayHT = NgayHT
													}
												  });
												console.log( ktv.TienDo);
												
												  await axios.patch(`https://serverbp.glitch.me/user/${KTVGiaoBai}`, {TienDo:  ktv.TienDo });			  

											}}>Cập Nhật</Button>
                                        {/if}
                                    {/each}
                              
                                    <Button color="primary" on:click={async()=>{
										var ojb = {TenSach: sachgiao.Ten, TrangThai: 'Giao Bài', TrangDangHoc: 0,"ThoiGianHoc": 0}
                                          for (let index = 0; index < ktv.TienDo.length; index++) {
											const r = ktv.TienDo[index];
											if(r.TenSach==sachgiao.Ten){
												ktv.TienDo[index]=	 Object.assign(ktv.TienDo[index],ojb)
												await axios.patch(`https://serverbp.glitch.me/user/${KTVGiaoBai}`, {TienDo:  ktv.TienDo });
												return false;	
												}else if(index == (ktv.TienDo.length-1) ){
													ktv.TienDo.push(ojb)
												}
										  }  
                                            console.log("Giao Bài",  ktv.TienDo);
                                    await axios.patch(`https://serverbp.glitch.me/user/${KTVGiaoBai}`, {TienDo:  ktv.TienDo });
                                    }}>Giao Bài</Button>
                                
							</CardBody>

							<CardFooter>
								{#each ktv.TienDo as sach}
									{#if sach.TenSach == sachgiao.Ten}
										<Progress value={((sach.TrangDangHoc + 1) / sach.SoTrang) * 100}>{sach.TrangDangHoc + 1} / {sach.SoTrang}</Progress>
									{/if}
								{/each}
							</CardFooter>
						</Card>
					</Col>
				{/each}
			{/if}
		{/each}
	</Row>
{/await}
