import { sveltekit } from '@sveltejs/kit/vite';
import unoCSS from '@unocss/svelte-scoped/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'vitest/config';

const targets = browserslistToTargets(
	browserslist('defaults, not IE 11, not IE_Mob 11, not OperaMini all')
);

export default defineConfig({
	build: {
		cssMinify: 'lightningcss'
	},
	css: {
		devSourcemap: true,
		lightningcss: {
			drafts: {
				nesting: true
			},
			targets
		},
		transformer: 'lightningcss'
	},
	plugins: [unoCSS(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
