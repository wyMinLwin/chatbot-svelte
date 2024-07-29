import type { ChatType } from '$lib/types/ChatType';
import { writable } from 'svelte/store';

const chats = writable<Array<ChatType>>([]);
const chatId = writable<string>('');

const addChat = (chat: ChatType) => {
	chats.update((chats) => [...chats, chat]);
};

const setChats = (chatsData: Array<ChatType>) => {
	chats.set(chatsData);
};

const setChatId = (id: string) => {
	chatId.set(id);
};

export { chats, addChat, setChats, chatId, setChatId };
