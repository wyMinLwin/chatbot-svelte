<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation'; // Import goto for navigation
	import { supabase } from '$lib/supabaseClient';

	import Sidebar from '$lib/components/Sidebar.svelte';

	onMount(async () => {
		const session = await supabase.auth.getSession();
		if (session.data.session === null) {
			goto('/login');
		}
	});
</script>

<Sidebar />
<main class="w-full sm:w-2/3 lg:w-4/5">
	<button
		on:click={async () => {
			await supabase.auth.signOut();
			console.log(await supabase.auth.getSession());
		}}>Sign out</button
	>

	<!-- {#await isLoggedIn then }

	{/await} -->
	<slot />

	<!-- <slot /> -->
</main>
