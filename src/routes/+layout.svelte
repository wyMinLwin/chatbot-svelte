<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
import './styles.css';
</script>

<div class="app w-screen h-svh bg-bg flex overflow-hidden font-display">
	<Sidebar />
	<main class="w-full sm:w-2/3 lg:w-4/5">
		<slot />
	</main>
</div>

<style>
</style>
