import type { MessageType } from '$lib/types/MessageType';
import { writable } from 'svelte/store';

const messages = writable<Array<MessageType>>([]);
const isFetchingMessages = writable<boolean>(false);

const setMessages = (messagesData: Array<MessageType>) => {
	messages.set(messagesData);
};

const addMessage = (message: MessageType) => {
	messages.update((messages) => [...messages, message]);
};

const setIsFetchingMessages = (isFetching: boolean) => {
	console.log('isFetching', isFetching);	
	isFetchingMessages.set(isFetching);
};

export { messages, setMessages, addMessage, isFetchingMessages, setIsFetchingMessages };
