import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
	const userId = request.headers.get('Authorization');

	if (userId) {
		const { data } = await supabase.from('chats').select('*').eq('userId', userId);
		return json({ data });
	}
	return json({ message: 'Failed to Load data' });
}
