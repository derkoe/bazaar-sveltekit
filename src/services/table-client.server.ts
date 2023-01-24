import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables';
import 'dotenv/config';

let _tableClient: TableClient | undefined;

const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME || 'poibazaardev';
const STORAGE_ACCOUNT_KEY = process.env.STORAGE_ACCOUNT_KEY || '';

export function tableClient(): TableClient {
	if (!_tableClient) {
		_tableClient = new TableClient(
			process.env.STORAGE_URL || `https://${STORAGE_ACCOUNT_NAME}.table.core.windows.net`,
			'offering',
			new AzureNamedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY)
		);
	}
	return _tableClient;
}
