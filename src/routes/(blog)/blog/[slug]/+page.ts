import { error } from '@sveltejs/kit';
import type { RouteParams } from './$types.js';
import { getPosts } from '$lib/api/posts.js';

export async function load({ params }) {
	try {
		const post = await import(`$lib/posts/fr/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}

export async function entries(): Promise<Array<RouteParams>> {
	const posts = await getPosts('fr');

	return posts.map((post) => ({ slug: `${post.slug}` }));
}
