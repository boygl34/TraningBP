<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { Styles, Container } from 'sveltestrap';
</script>

<Header />
<Container
	><main>
		<slot />
	</main>
</Container>
<Styles />

<style>
</style>
