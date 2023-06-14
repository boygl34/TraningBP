<script>
	import Header from './Header.svelte';
	import './styles.css';
    import { Styles } from 'sveltestrap';



</script>


	<Header />

	<main>
		<slot />
	</main>


<style>
</style>
<Styles />