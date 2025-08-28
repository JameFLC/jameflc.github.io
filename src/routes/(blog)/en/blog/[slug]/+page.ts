import { error } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { getPosts } from '$lib/api/posts';

export async function load({ params }) {
	try {
		const post = await import(`$lib/posts/en/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}

export async function entries(): Promise<Array<RouteParams>> {
	const posts = await getPosts('en');

	return posts.map((post) => ({ slug: `${post.slug}` }));
}
