const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: null
					}
				}
			},
			animation: {
				'spin-slow': 'spin 8s linear infinite',
				'bounce-slow': 'bounce 3s ease-in-out infinite',
				'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-in-out',
				'slide-down': 'slideDown 0.5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	
	daisyui: {
		themes: true,
		darkTheme: "dark",
	}
};

module.exports = config;
