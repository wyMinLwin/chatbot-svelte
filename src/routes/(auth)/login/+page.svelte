<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { supabase } from '$lib/supabaseClient';

	const oAuthLogin = async (loginMethod: 'GOOGLE' | 'GITHUB') => {
		if (loginMethod === 'GOOGLE') {
			await supabase.auth.signInWithOAuth({ provider: 'google' });
		} else if (loginMethod === 'GITHUB') {
			await supabase.auth.signInWithOAuth({ provider: 'github' });
		}
	};
</script>

<section
	class="bg-white/50 flex flex-col gap-2 items-center w-11/12 max-w-[340px] sm:w-[340px] p-5 sm:p-10 rounded-2xl bg- justify-center text-sm auth-form-container"
>
	<h2 class="text-center font-semibold font-title text-xl mb-3">SWE for your productivity</h2>
	<Button on:click={() => oAuthLogin("GOOGLE")} class="bg-light w-full gap-5 justify-start">
		<Icon class="text-lg" icon="logos:google-icon"></Icon>
		Login with Google
	</Button>
	<Button on:click={() => oAuthLogin("GITHUB")} class="bg-light w-full gap-5 justify-start">
		<Icon class="text-lg" icon="logos:github-icon"></Icon>
		Login with Github
	</Button>
</section>
<!-- <button on:click={googleSignin}>Google</button> -->
