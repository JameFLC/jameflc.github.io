import { getLangAttr } from '$lib/langage';
import type { Handle } from '@sveltejs/kit';

// export const handle = (({ event, resolve }) => {
// 	return resolve(event, {
// 		transformPageChunk: ({ html }) => html.replace('%lang%', getLangAttr(event.url.pathname))
// 	});
// }) satisfies Handle;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(/lang=".*"/gm, `lang="${getLangAttr(event.url.pathname)}"`)
	});

	// Fix utf related issues (accents being corrupted) when javascript is disabled on the page
	if (
		response.headers.get('content-type')?.startsWith('text/html') &&
		!response.headers.get('content-type')?.includes('charset')
	) {
		response.headers.set('content-type', 'text/html; charset=utf-8');
	}

	return response;
};
