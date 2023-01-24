import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, ViteDevServer } from 'vite';

const swaPlugin = () => ({
	name: 'configure-swa-proxy',
	configureServer(server: ViteDevServer) {
		server.middlewares.use((req, res, next) => {
			if (req.url === '/api/__render') {
				const originalUrl = req.headers['x-ms-original-url'] as string;
				const parsedUrl = new URL(originalUrl);
				const rewrittenUrl = parsedUrl.pathname + parsedUrl.search;
				req.url = rewrittenUrl;
				req.originalUrl = rewrittenUrl;
			}
			next();
		});
	}
});

const config: UserConfig = {
	plugins: [swaPlugin(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
