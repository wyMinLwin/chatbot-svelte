<script lang="ts">
	import InputAndRecord from '$lib/components/InputAndRecord.svelte';

	let question = '';
	let responseText = '';

	const getGPTResponse = async () => {
		const method = 'POST';
		const headers = {
			'Content-Type': 'application/json'
		};
		const body = JSON.stringify({ question });
		const response = await fetch('api/gpt', { method, headers,body });
		responseText = await response.json()
	};

</script>

<svelte:head>
	<title>Chat</title>
	<meta name="description" content="Chat Svelte" />
</svelte:head>

<section class="flex flex-col w-full h-full p-3">
	<div class="grow flex flex-col justify-end"></div>
	<div class="grow-0 flex justify-center">
		<InputAndRecord bind:question on:askQuestion={getGPTResponse} />
	</div>
</section>

<style>
</style>
