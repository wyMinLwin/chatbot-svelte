<script lang="ts">
	import { fly } from 'svelte/transition';
	import { tick, onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { isFetchingMessages, messages } from '$lib/store/messagesStore';
	import { chatId } from '$lib/store/chatsStore';

	import { Skeleton } from '$lib/components/ui/skeleton';
	import InputAndRecord from '$lib/components/InputAndRecord.svelte';
	let records: Array<string> = [];
	let fetchedRecords: Array<string> = [];
	let question = '';
	let responseText = '';
	let messagesContainer: HTMLDivElement;

	const scrollAnchor = async () => {
		await tick();
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	};
	$: {
		if ($messages.length === 0) {
			fetchedRecords = [];
			records = [];
		} else {
			let temp: Array<string> = [];
			$messages.forEach((message) => {
				temp = [...temp, message.question, message.answer];
			});
			fetchedRecords = temp;
			scrollAnchor();
		}
	}

	const getGPTResponse = async () => {
		const userId = (await supabase.auth.getUser()).data.user?.id;
		const method = 'POST';
		const headers = {
			'Content-Type': 'application/json'
		};
		const body = JSON.stringify({ question, chatId: $chatId, userId });
		records = [...records, question];
		await tick();
		scrollAnchor();
		question = '';
		const response = await fetch('api/gpt', { method, headers, body });
		responseText = await response.json();
		records = [...records, responseText];
		await tick();
		scrollAnchor();
	};
</script>

<svelte:head>
	<meta name="description" content="Svelte SWE" />
</svelte:head>

<section class="flex flex-col w-full h-full overflow-hidden p-3">
	{#if $isFetchingMessages}
		<div class="grow">
			<div class="h-full flex flex-col justify-end py-2 gap-2">			
				<Skeleton class="w-[40%] h-10 self-end" />
				<Skeleton class="w-[45%] h-10 self-start" />
				<Skeleton class="w-[40%] h-10 self-end" />
				<Skeleton class="w-[45%] h-10 self-start" />
				<Skeleton class="w-[40%] h-10 self-end" />
				<Skeleton class="w-[45%] h-10 self-start" />
			</div>
		</div>
		<div class="grow-0 flex justify-center z-10">
			<InputAndRecord disabled={true} bind:question on:askQuestion={getGPTResponse} />
		</div>
	{:else}
		<div bind:this={messagesContainer} class="grow overflow-y-auto">
			<div class="min-h-full flex flex-col justify-end py-2 gap-2">
				{#each fetchedRecords as record, i (i)}
					<div class="flex z-0 {i % 2 === 0 ? 'justify-end' : 'justify-start'}">
						<div class="bg-gray-300 p-2 rounded-lg max-w-[85%]">
							{record}
						</div>
					</div>
				{/each}
				{#each records as record, i (i)}
					<div
						in:fly={{ x: i % 2 === 0 ? 100 : -100 }}
						class="flex z-0 {i % 2 === 0 ? 'justify-end' : 'justify-start'}"
					>
						<!-- in:fly={{ y: 200, duration: 500, delay: 300 }} -->
						<div class="bg-gray-300 p-2 rounded-lg max-w-[85%]">
							{record}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="grow-0 flex justify-center z-10">
			<InputAndRecord bind:question on:askQuestion={getGPTResponse} />
		</div>
	{/if}
</section>

<style>
</style>
