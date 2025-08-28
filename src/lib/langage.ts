import type { Lang } from './types';

export function isEnglishUrl(url: string): boolean {
	return url.startsWith('/en/') || url === '/en';
}

export function getLangAttr(url: string): Lang {
	return isEnglishUrl(url) ? 'en' : 'fr';
}

export function getLangString(url: string, fr: string, en: string): string {
	return isEnglishUrl(url) ? en : fr;
}
