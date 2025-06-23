// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  integrations: [
		mdx(), 
		sitemap(), 
		react({
      include: ['**/react/*']
  	}), 
		svelte({
      include: ['**/svelte/*']
  	}),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});