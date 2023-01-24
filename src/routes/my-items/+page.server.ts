import { redirect } from '@sveltejs/kit';
import { getUserId } from '../../services/auth.server';
import { createItem, loadUserItems } from '../../services/item-service.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const userId = getUserId(request);
	if (!userId) {
		throw new Error('No user id');
	}
	const items = await loadUserItems(userId);
	return {
		items
	};
};

export const actions: Actions = {
	default: async ({ url, request }) => {
		const itemId = await createItem({ owner: getUserId(request) });
		throw redirect(303, `${url}/${itemId}`);
	}
};
