
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				bollywood: {
					red: "#E63946",
					"red-muted": "#AD2E38",
					dark: "#0F0F0F",
					"dark-accent": "#1A1A1A",
					gold: "#D4AF37",
					cream: "#F1FAEE"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
				display: ["SF Pro Display", "Inter", "sans-serif"]
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { 
						'box-shadow': '0 0 20px 5px rgba(230, 57, 70, 0.3)',
						'opacity': 0.8 
					},
					'50%': { 
						'box-shadow': '0 0 40px 10px rgba(230, 57, 70, 0.5)',
						'opacity': 1 
					}
				},
				'pulse-light': {
					'0%, 100%': { opacity: 0.8 },
					'50%': { opacity: 1 }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 }
				},
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'float': 'float 4s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'pulse-light': 'pulse-light 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out'
			},
			boxShadow: {
				'ticket': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
				'ticket-hover': '0 15px 40px -10px rgba(0, 0, 0, 0.6)',
				'red-glow': '0 0 20px 5px rgba(230, 57, 70, 0.3)',
				'gold-glow': '0 0 15px 2px rgba(212, 175, 55, 0.3)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'linear-gradient(to bottom, rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.95)), url("/hero-background.jpg")'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
