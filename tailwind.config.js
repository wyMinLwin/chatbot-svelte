/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#f9f3ee',
				primary: '#6e60ff',
				secondary: '#ffdb58',
				dark: '#252525',
				light: '#fefffb',
				error: '#ff6b6b',
				success: '#90ee90',
			}
		}
	},
	plugins: []
};
