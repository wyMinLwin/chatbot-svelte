import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	// const body = await request.json();
	const chatID = params.chatId;
	if (chatID) {
		const { data } = await supabase.from('messages').select('*').eq('chatId', chatID);
		return json({ data });
	}
	return json({ message: 'Failed to load Message' });
}
