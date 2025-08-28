import adapter from '@sveltejs/adapter-static';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from "shiki";
import githubLight from 'shiki/themes/github-light-default.mjs'
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkImageToVideo from './src/mdsvex/plugins/remark/ImageToVideo.js'
import rehypeImageToFigure from './src/mdsvex/plugins/rehype/ImageToFigure.js'
import rehypeVideoToFigure from './src/mdsvex/plugins/rehype/VideoToFigure.js'

/**
 * @typedef shortenLangage
 * @prop {string} language
 * @prop {string} shortened
 */

/**
 * Take a langage parameter as a string and returns the langage and its shortened version.
 * 
 * If no shortened version exists then both outputs will be the original verision.
 * 
 * Both outputs are all caps
 * @param {string} lang 
 * @returns {shortenLangage}
 */
export function shortenLangage(lang) {
	if (lang === null || lang === '') return { language: 'plaintext', shortened: 'txt' };

	const short = {
		csharp: 'c#',
		python: 'py',
		cpp: 'c++',
		gdresource: 'gdr',
		gdscript: 'gd',
		gdshader: 'gdsl',
		powershell: 'ps1'
	};

	lang = lang.toLowerCase();

	let shortened = short[lang] ?? lang;

	lang = lang.toUpperCase();
	shortened = shortened.toUpperCase();

	return { language: lang, shortened: shortened };
}






/** @type {import('mdsvex').mdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: './src/mdsvex.svelte'
	},
	highlight: {
		highlighter: async (code, lang) => {
			const highlighter = await createHighlighter({
				theme: githubLight,
				langs: [lang],
			})

			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang: lang,
					theme: githubLight
				}))


			highlighter.dispose();

			const shortLang = shortenLangage(lang)

			return `{@html \`
			<div class="blog-code-block mobile-side-merge">
				<div class="blog-code-block-content">
					${html}
				</div>
				<div class="language-legend" >
					<div class="language-legend-text" aria-label="${shortLang.language}">
							${shortLang.shortened}
					</div>
				</div>
			</div>\`}`;
		},

	},
	remarkPlugins: [
		remarkImageToVideo
	],
	rehypePlugins: [
		rehypeUnwrapImages,
		rehypeImageToFigure]
}


const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			strict: false,
			fallback: 'index.html'
		})
	},
	extensions: ['.svelte', '.md']
};

export default config;
