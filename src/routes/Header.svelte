<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import { Card } from "sveltestrap";
	import axios from "axios";
	import { KTV, BoPhan,TienDo,TenSach,TrangDangHoc,id,ThoiGianHoc,SachPaint,Job } from './store';
	console.log($Job);
</script>

<header>
	

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
 {#if $Job == "Giảng Viên"}
		 <li aria-current={$page.url.pathname === '/GiaoBai' ? 'page' : undefined}>
				<a href="/GiaoBai">Giao Bài</a>
			</li>
{/if}
			<!--	<li aria-current={$page.url.pathname.startsWith('/Body') ? 'page' : undefined}>
				<a href="/Body">Body</a>
			</li> -->
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
<div class="corner">
		<Card on:click={async()=>{
			localStorage.removeItem("iduser")
		let person = prompt("ID Đăng Nhâp");
			if (person != null) {
				let ThongTin = await axios.get(`https://serverbp.glitch.me/user/${person}`)
									  .then(function (response) {
										localStorage.setItem("iduser",response.data.id)
										$Job = response.data.job
										$id=response.data.id
										$KTV = response.data.fullname;
										$BoPhan = response.data.BoPhan;
										$TienDo = response.data.TienDo;})
										.catch(function (error) {
											alert("lỗi không thể đăng nhập")
										})
			}
		
		

		}} body color="light" >{$KTV}</Card>
	</div>
	<!-- <div class="corner">
		<a>
			<img src={github} alt="GitHub" />
		</a>
	</div> -->
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: auto;
		height: auto;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
