<script lang="ts">
	import { chatId, chats, setChatId } from '$lib/store/chatsStore';
	import { setIsFetchingMessages, setMessages } from '$lib/store/messagesStore';
	import type { MessageType } from '$lib/types/MessageType';
	import { tick } from 'svelte';

	import Icon from '@iconify/svelte';
	import { Button } from './ui/button';

	const getMessage = async (chatId: string) => {
		setChatId(chatId);
		setMessages([]);
		setIsFetchingMessages(true);
		await tick();
		try {
			const response = await fetch(`/api/messages/${chatId}`);
			const data = await response.json();
			setMessages(data.data as Array<MessageType>);
		} catch (error) {
			console.error(error);
		} finally {
			setIsFetchingMessages(false);
		}
	};

	const setNewChat = () => {
		setChatId('');
		setMessages([]);
	};
</script>

<aside class="bg-dark w-0 sm:w-1/3 lg:w-1/5 px-2 pt-4 hidden sm:block">
	<div class="flex justify-end mb-2">
		<Button
			on:click={setNewChat}
			size="icon"
			class="self-end pa-0 mr-2 text-light bg-transparent w-fit h-fit aspect-square"
		>
			<Icon icon="solar:pen-new-square-linear" class="text-3xl" />
		</Button>
	</div>
	{#each $chats as chat (chat.id)}
		<button
			class="chat-item {chat.id === $chatId && 'chat-item-active'}"
			on:click={() => getMessage(chat.id)}
		>
			<div class="grow overflow-hidden text-nowrap truncate pr-6">
				{chat.title}
			</div>

			<div class="delete-button">
				<Button class="bg-transparent shadow-none w-full h-full" size="icon">
					<Icon class="text-error text-2xl" icon="mage:tag-cross" />
				</Button>
			</div>
		</button>
	{/each}
</aside>

<style scoped>
	.chat-item {
		@apply w-full text-start flex items-center text-white gap-2 py-[6px] px-3 relative cursor-pointer hover:bg-light/10 hover:shadow-sm rounded-lg transition-all duration-300 ease-in-out;
	}

	.chat-item-active {
		@apply text-primary;
	}
	.delete-button {
		@apply invisible absolute top-1/2 right-3 -translate-y-1/2 w-6 h-6 bg-transparent shadow-none transition-all duration-200 ease-in;
	}
	.chat-item:hover .delete-button {
		@apply visible;
	}
</style>
