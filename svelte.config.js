import azure from 'svelte-adapter-azure-swa';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: azure({
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
			}
		})
	}
};

export default config;
