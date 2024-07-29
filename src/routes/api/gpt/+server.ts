import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';
import { G4F } from 'g4f';
const g4f = new G4F();

const messages = [
	{
		role: 'system',
		content: ''
	}
];
const options = {
	provider: g4f.providers.GPT,
	model: 'gpt-4',
	output: (text: string) => {
		return text;
	}
};

export async function POST({ request }) {
	const body = await request.json();
	messages.push({ role: 'user', content: body.question });
	const response = await g4f.chatCompletion(messages, options);
	
	if (!body.chatId) {
		const { data } = await supabase
			.from('chats')
			.insert([{ userId: body.userId, title: body.question }])
			.select();
		if (data) {
			const chatId = data[0].id;
			await supabase
				.from('messages')
				.insert([{ chatId, question: body.question, answer: response }]);
		}
	} else {
		const { data } = await supabase.from('chats').select().eq('id', body.chatId);
		if (data) {
			await supabase
				.from('messages')
				.insert([{ chatId: body.chatId, question: body.question, answer: response }]);
		}
	}

	return json(response);
}
