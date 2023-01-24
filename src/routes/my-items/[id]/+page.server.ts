import { getUserId } from '../../../services/auth.server';
import { loadUserItem } from '../../../services/item-service.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, params }) => {
	const userId = getUserId(request);
	if (!userId) {
		throw new Error('No user id');
	}
	const item = await loadUserItem(userId, params.id);
	return {
		item
	};
};
