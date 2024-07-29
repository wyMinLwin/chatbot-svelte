<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button/';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let disabled = false;

	export let question = '';
	$: rows = question.split('\n').length <= 2 ? question.split('\n').length : 3;

	const askQuestion = () => {
		dispatch('askQuestion');
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			askQuestion();
		}
	};
</script>

<div
	class="flex justify-between border-dark bg-light border-[1px] border-dashed w-full h-fit sm:w-3/4 md:w-7/12 px-2 py-1 {rows ===
	1
		? 'items-center'
		: 'items-end'}"
>
	<textarea
		{rows}
		{disabled}
		bind:value={question}
		on:keydown={handleKeyDown}
		class="resize-none w-full outline-none py-2"
		placeholder="Enter your question..."
	></textarea>
	<div>
		<Button {disabled} size="icon" class="rounded-sm">
			<Icon icon="fluent:arrow-up-12-filled" class="w-5 h-5 text-light" />
		</Button>
	</div>
</div>
