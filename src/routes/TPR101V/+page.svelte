<script lang="ts">
	import { Image, Button,ButtonToolbar  } from 'sveltestrap';
	import moment from 'moment';
	import { onMount } from 'svelte';
// 	import page01 from '$lib/images/TPR101V/TPR101V_01.jpg';import page21 from '$lib/images/TPR101V/TPR101V_21.jpg';
// 	import page02 from '$lib/images/TPR101V/TPR101V_02.jpg';import page22 from '$lib/images/TPR101V/TPR101V_22.jpg';
// 	import page03 from '$lib/images/TPR101V/TPR101V_03.jpg';import page23 from '$lib/images/TPR101V/TPR101V_23.jpg';
// 	import page04 from '$lib/images/TPR101V/TPR101V_04.jpg';import page24 from '$lib/images/TPR101V/TPR101V_24.jpg';
// 	import page05 from '$lib/images/TPR101V/TPR101V_05.jpg';import page25 from '$lib/images/TPR101V/TPR101V_25.jpg';
// 	import page06 from '$lib/images/TPR101V/TPR101V_06.jpg';import page26 from '$lib/images/TPR101V/TPR101V_26.jpg';
// 	import page07 from '$lib/images/TPR101V/TPR101V_07.jpg';import page27 from '$lib/images/TPR101V/TPR101V_27.jpg';
// 	import page08 from '$lib/images/TPR101V/TPR101V_08.jpg';import page28 from '$lib/images/TPR101V/TPR101V_28.jpg';
// 	import page09 from '$lib/images/TPR101V/TPR101V_09.jpg';import page29 from '$lib/images/TPR101V/TPR101V_29.jpg';
// 	import page10 from '$lib/images/TPR101V/TPR101V_10.jpg';import page30 from '$lib/images/TPR101V/TPR101V_30.jpg';
// 	import page11 from '$lib/images/TPR101V/TPR101V_11.jpg';import page31 from '$lib/images/TPR101V/TPR101V_31.jpg';
// 	import page12 from '$lib/images/TPR101V/TPR101V_12.jpg';import page32 from '$lib/images/TPR101V/TPR101V_32.jpg';
// 	import page13 from '$lib/images/TPR101V/TPR101V_13.jpg';import page33 from '$lib/images/TPR101V/TPR101V_33.jpg';
// 	import page14 from '$lib/images/TPR101V/TPR101V_14.jpg';import page34 from '$lib/images/TPR101V/TPR101V_34.jpg';
// 	import page15 from '$lib/images/TPR101V/TPR101V_15.jpg';import page35 from '$lib/images/TPR101V/TPR101V_35.jpg';
// 	import page16 from '$lib/images/TPR101V/TPR101V_16.jpg';import page36 from '$lib/images/TPR101V/TPR101V_36.jpg';
// 	import page17 from '$lib/images/TPR101V/TPR101V_17.jpg';import page37 from '$lib/images/TPR101V/TPR101V_37.jpg';
// 	import page18 from '$lib/images/TPR101V/TPR101V_18.jpg';import page38 from '$lib/images/TPR101V/TPR101V_38.jpg';
// 	import page19 from '$lib/images/TPR101V/TPR101V_19.jpg';import page39 from '$lib/images/TPR101V/TPR101V_39.jpg';
// 	import page20 from '$lib/images/TPR101V/TPR101V_20.jpg';import page40 from '$lib/images/TPR101V/TPR101V_40.jpg';
// 	import page41 from '$lib/images/TPR101V/TPR101V_41.jpg';
// 	import page42 from '$lib/images/TPR101V/TPR101V_42.jpg';
// 	let data = [page01, page02, page03, page04, page05, page06, page07, page08, page09, page10,
// 				page11, page12, page13, page14, page15, page16, page17, page18, page19, page20,
// 				page21, page22, page23, page24, page25, page26, page27, page28, page29, page30,
// 				page31, page32, page33, page34, page35, page36, page37, page38, page39, page40,page41,page42
// ];
	let activeIndex = 0;
	let TrangHT = 0;
	let Trang = data[TrangHT];
    let timerclick = new Date()
	var timer = moment(new Date()).diff(moment(timerclick), 'minutes')
	function nextpage() {
		TrangHT = TrangHT + 1;
		Trang = data[TrangHT];
		timer =0
		timerclick = new Date()
	}
	function backpage() {
		TrangHT = TrangHT - 1;
		Trang = data[TrangHT];
	}

	

	onMount(() => {
		const interval = setInterval(() => {
			 timer = moment(new Date()).diff(moment(timerclick), 'seconds')
		}, 1000);
	});
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>


<ButtonToolbar>
<Button on:click={backpage}>Back</Button>
<Button>{TrangHT}/{data.length}  </Button>
{#if timer >=3 }
	<Button on:click={nextpage}>Next</Button>
{/if}

</ButtonToolbar>
	
<Image fluid  src={Trang} />
