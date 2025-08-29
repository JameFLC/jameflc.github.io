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

	// Only adjust headers if it's HTML
	if (response.headers.get('content-type')?.startsWith('text/html')) {
		response.headers.set('content-type', 'text/html');
		response.headers.set('charset', 'utf-8');
	}

	return response;
};
