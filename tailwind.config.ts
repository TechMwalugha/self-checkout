import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	fontSize: {
		"heading1-bold": [
		  "36px",
		  {
			lineHeight: "140%",
			fontWeight: "700",
		  },
		],
		"heading1-semibold": [
		  "36px",
		  {
			lineHeight: "140%",
			fontWeight: "600",
		  },
		],
		"heading2-bold": [
		  "30px",
		  {
			lineHeight: "140%",
			fontWeight: "700",
		  },
		],
		"heading2-semibold": [
		  "30px",
		  {
			lineHeight: "140%",
			fontWeight: "600",
		  },
		],
		"heading3-bold": [
		  "24px",
		  {
			lineHeight: "140%",
			fontWeight: "700",
		  },
		],
		"heading4-medium": [
		  "20px",
		  {
			lineHeight: "140%",
			fontWeight: "500",
		  },
		],
		"body-bold": [
		  "18px",
		  {
			lineHeight: "140%",
			fontWeight: "700",
		  },
		],
		"body-semibold": [
		  "18px",
		  {
			lineHeight: "140%",
			fontWeight: "600",
		  },
		],
		"body-medium": [
		  "18px",
		  {
			lineHeight: "140%",
			fontWeight: "500",
		  },
		],
		"body-normal": [
		  "18px",
		  {
			lineHeight: "140%",
			fontWeight: "400",
		  },
		],
		"body1-bold": [
		  "18px",
		  {
			lineHeight: "140%",
			fontWeight: "700",
		  },
		],
		"base-regular": [
		  "16px",
		  {
			lineHeight: "140%",
			fontWeight: "400",
		  },
		],
		"base-medium": [
		  "16px",
		  {
			lineHeight: "140%",
			fontWeight: "500",
		  },
		],
		"base-semibold": [
		  "16px",
		  {
			lineHeight: "140%",
			fontWeight: "600",
		  },
		],
		"base1-semibold": [
		  "16px",
		  {
			lineHeight: "140%",
			fontWeight: "600",
		  },
		],
		"small-regular": [
		  "14px",
		  {
			lineHeight: "140%",
			fontWeight: "400",
		  },
		],
		"small-medium": [
		  "14px",
		  {
			lineHeight: "140%",
			fontWeight: "500",
		  },
		],
		"small-semibold": [
		  "14px",
		  {
			lineHeight: "140%",
			fontWeight: "600",
		  },
		],
		"subtle-medium": [
		  "12px",
		  {
			lineHeight: "16px",
			fontWeight: "500",
		  },
		],
		"subtle-semibold": [
		  "12px",
		  {
			lineHeight: "16px",
			fontWeight: "600",
		  },
		],
		"tiny-medium": [
		  "10px",
		  {
			lineHeight: "140%",
			fontWeight: "500",
		  },
		],
		"x-small-semibold": [
		  "7px",
		  {
			lineHeight: "9.318px",
			fontWeight: "600",
		  },
		],
	  },
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		textShadow: {
			home: '0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93, -2px 1px #cdd2d5, -2px 3px #808d93, -3px 2px #cdd2d5, -3px 4px #808d93, -4px 3px #cdd2d5, -4px 5px #808d93, -5px 4px #cdd2d5, -5px 6px #808d93, -6px 5px #cdd2d5, -6px 7px #808d93, -7px 6px #cdd2d5, -7px 8px #808d93, -8px 7px #cdd2d5',
			sm: '0 1px 2px var(--tw-shadow-color)',
			DEFAULT: '0 2px 4px var(--tw-shadow-color)',
			lg: '0 8px 16px var(--tw-shadow-color)',
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
	  {
		'text-shadow': (value) => ({
		  textShadow: value,
		}),
	  },
	  { values: theme('textShadow') }
	)
  }),
		require("tailwindcss-animate")
          ],
};
export default config;
