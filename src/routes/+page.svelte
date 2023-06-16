<script>
    import {  Input, Label, Button, Row, Col, Progress } from 'sveltestrap';
    import { KTV,BoPhan } from "./store";
    
	
</script>

KTV
<Input size="sm" type="select" name="select" bind:value={$KTV} on:change>
    <option value="Trực">Trực</option>
    <option value="Châu">Châu</option>
    <option value="Thành">Thành</option>
</Input>
Bộ phận
<Input size="sm" type="select" name="select" bind:value={$BoPhan}>
    <option value="Đồng">Đồng</option>
    <option value="Sơn">Sơn</option>
</Input>


<Button size="sm">Load</Button>