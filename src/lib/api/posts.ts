import type { Lang, Post, PostType } from '$lib/types';

export async function getPosts(language: Lang): Promise<Post[]> {
	let posts: Post[] = [];

	let paths;

	switch (language) {
		case 'fr':
			paths = import.meta.glob('$lib/posts/fr/*.md', { eager: true });
			break;
		case 'en':
			paths = import.meta.glob('$lib/posts/en/*.md', { eager: true });
			break;
	}

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort((first, second) => {
		return new Date(second.date).getTime() - new Date(first.date).getTime();
	});

	return posts;
}

export async function getPostsBy(language: Lang, type: PostType): Promise<Post[]> {
	const posts = await getPosts(language);

	return posts.filter((post) => {
		post.type === type;
	});
}
