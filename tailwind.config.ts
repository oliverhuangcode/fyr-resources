import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#1C1C1C',
        surface: '#242424',
        accent: '#F5C518',
        subtle: '#2E2E2E',
        primary: '#FFFFFF',
        muted: '#888888',
      },
    },
  },
  plugins: [],
}

export default config
