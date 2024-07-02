import { json } from '@sveltejs/kit';
import { G4F } from 'g4f';
const g4f = new G4F();

const messages = [
	{
		role: 'system',
		content:
			'You are the best software engineer that ever born once in a generation with 30 years of experience'
	}
];
const options = {
	provider: g4f.providers.GPT,
	model: 'gpt-4',
	output: (text: string) => {
		return text;
	}
};

export async function POST({request}) {
    const body = await request.json();
    messages.push({ role: 'user', content: body.question });
	const response = await g4f.chatCompletion(messages, options);
	return json(response);
}
