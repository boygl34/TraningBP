<script>
	import axios from 'axios';
	import { Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle,Badge } from 'sveltestrap';
	import { KTV, BoPhan, TienDo, TenSach, TrangDangHoc, id, ThoiGianHoc, SachPaint, SachBody } from '../store';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { onMount } from 'svelte';
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
	let BoPhanGiaoBai,KTVGiaoBai;
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
                            <option value={ktv.fullname}>{ktv.fullname}</option>
                        {/if}
                    {/each}
            </Input>
        </FormGroup>
        {#each BaoCao as ktv}
            {#if  ktv.fullname==KTVGiaoBai && ktv.BoPhan==BoPhanGiaoBai }
                {#each ktv.TienDo as tiendo }
                <Card class="mb-3">
                    <CardHeader>
                        <CardTitle>{tiendo.TenSach} 
                            {#if tiendo.TrangThai=="Hoàn Thành" }
                            <Badge color= 'success'>{tiendo.TrangThai}</Badge>
                            {:else if tiendo.TrangThai=="Giao Bài" }
                            <Badge color='danger'>{tiendo.TrangThai}</Badge>
                            {:else if tiendo.TrangThai=="Đang Học" }
                            <Badge color='warning'>{tiendo.TrangThai}</Badge>
                            {/if}        
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <CardText>
                       
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                    <CardFooter>Footer</CardFooter>
                  </Card>
                {/each}
            {/if}
        {/each}

    {:catch error}
                    <p style="color: red">{error.message}</p>
    {/await}


	