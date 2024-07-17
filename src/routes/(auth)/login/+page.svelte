<script lang="ts">
	import { supabase } from "$lib/supabaseClient";

	const googleSignin = async () => {
		await supabase.auth.signInWithOAuth({provider: 'google'})
	};
</script>

<button on:click={googleSignin}>Google</button>
