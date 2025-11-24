import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 6px 24px rgba(0, 0, 0, 0.08)',
        soft: '0 4px 12px rgba(15, 23, 42, 0.08)'
      },
      borderRadius: {
        xl: '14px'
      }
    }
  },
  plugins: []
};

export default config;
