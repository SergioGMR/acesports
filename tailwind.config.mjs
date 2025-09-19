/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'pulse-slow': 'pulse-slow 3s infinite',
				'shimmer-slow': 'shimmer-slow 4s infinite linear',
				'pulse-once': 'pulse-once 1s',
			},
			keyframes: {
				'pulse-slow': {
					'0%, 100%': { opacity: '0.2' },
					'50%': { opacity: '0.3' },
				},
				'shimmer-slow': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'pulse-once': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
			},
			minHeight: {
				'100': '25rem', // 400px
				'120': '30rem', // 480px
			},
			height: {
				'440': '440px',
			},
		},
	},
	plugins: [],
}
