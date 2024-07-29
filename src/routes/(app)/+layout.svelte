<script lang="ts">
	import type { ChatType } from '$lib/types/ChatType';
	import { setChats } from '$lib/store/chatsStore';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation'; // Import goto for navigation

	import Sidebar from '$lib/components/Sidebar.svelte';

	const getChats = async (userId: string) => {
		const headers = {
			'Content-Type': 'application',
			Authorization: userId
		};
		const res = await fetch('api/chats', { headers });
		if (res.ok) {
			const data = await res.json();

			setChats(data.data as Array<ChatType>);
		}
	};

	onMount(async () => {
		const session = await supabase.auth.getSession();
		if (session.data.session === null) {
			goto('/login');
			return;
		}
		await getChats(session.data.session.user.id);
	});
</script>

<Sidebar />
<main class="w-full sm:w-2/3 lg:w-4/5 h-full overflow-hidden">
	<slot />
</main>
