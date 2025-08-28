export type Lang = 'fr' | 'en';

export type PostType = 'project' | 'article';

export type Post = {
	title: string;
	description: string;
	thumbnail: string;
	date: '2025-05-01';
	tags: string[];
	published: boolean;
	type: PostType;
	slug: string;
};

export type Vector2 = {
	x: number;
	y: number;
};

export function lerpVector2(v1: Vector2, v2: Vector2, f: number): Vector2 {
	const xlerp = v1.x * (1.0 - f) + v2.x * f;
	const ylerp = v1.y * (1.0 - f) + v2.y * f;

	return { x: xlerp, y: ylerp };
}
