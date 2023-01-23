import type { PagedAsyncIterableIterator, PageSettings } from '@azure/core-paging';
import type { TableEntityResult, TableEntityResultPage } from '@azure/data-tables';
import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

export interface Item {
	rowKey?: string;
	title: string;
	owner: string;
}

const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME || 'poibazaardev';
// TODO use managed idenity
const STORAGE_ACCOUNT_KEY = process.env.STORAGE_ACCOUNT_KEY || '';

const tableClient = new TableClient(
	process.env.STORAGE_URL || `https://${STORAGE_ACCOUNT_NAME}.table.core.windows.net`,
	'offering',
	new AzureNamedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY)
);

export const loadItems = async () => {
	const allItems = tableClient.listEntities<Item>();
	return mapItems(allItems);
};

export const loadUserItems = async (userId: string | undefined) => {
	if (!userId) {
		return [];
	}

	return mapItems(
		tableClient.listEntities<Item>({ queryOptions: { filter: `owner eq '${userId}'` } })
	);
};

export const loadUserItem = async (userId: string | undefined, itemId: string | undefined) => {
	if (!userId || !itemId) {
		return undefined;
	}

	const item = await tableClient.getEntity<Item>('offering', itemId);

	if (item.owner !== userId) {
		return undefined;
	}

	return item;
};

export const createItem = async (item: Partial<Item>) => {
	const rowKey = uuidv4();
	await tableClient.createEntity({ partitionKey: 'offering', rowKey, ...item });
	return rowKey;
};

export const updateItem = async (item: Partial<Item>) => {
	return item.rowKey;
};

const mapItems = async (
	items: PagedAsyncIterableIterator<
		TableEntityResult<Item>,
		TableEntityResultPage<Item>,
		PageSettings
	>
) => {
	const itemArr = [];
	for await (const item of items) {
		itemArr.push(item);
	}
	return itemArr;
};

// async function saveEntity() {
//   await tableClient.createEntity({
//     partitionKey: 'offering',
//     rowKey: uuidv4(),
//     title: 'Hello, World!'
//   });
// }
