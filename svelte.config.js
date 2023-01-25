import preprocess from 'svelte-preprocess';
import azure from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: azure({
			customStaticWebAppConfig: {
				auth: {
					identityProviders: {
						azureActiveDirectory: {
							registration: {
								openIdIssuer:
									'https://login.microsoftonline.com/0f6f68be-4ef2-465a-986b-eb9a250d9789/v2.0',
								clientIdSettingName: 'AZURE_CLIENT_ID',
								clientSecretSettingName: 'AZURE_CLIENT_SECRET'
							}
						}
					}
				},
				routes: [
					{
						route: '/favicon.ico'
					},
					{
						route: '/*',
						rewrite: '/api/__render'
					}
				]
			}
		})
	}
};

export default config;
