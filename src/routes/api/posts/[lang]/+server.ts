import { getPosts } from '$lib/api/posts';
import type { Lang as Lang, Post } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { lang } = params;

	const posts = await getPosts(lang === 'en' ? 'en' : 'fr');

	return json(posts);
}
