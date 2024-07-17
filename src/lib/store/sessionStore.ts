import { derived, writable } from 'svelte/store';
import { supabase } from '../supabaseClient'; // Import your Supabase client

const session = writable(
	(async () => {
		return await supabase.auth.getSession();
	})()
);

const isLoggedIn = derived(session, async ($session) => {
	return $session;
});

export { session, isLoggedIn };
