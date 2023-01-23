import { getUserInfo } from '../services/auth.server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ request }) => {
	const user = getUserInfo(request);
	return {
		user
	};
};
