export interface shortLang {
	language: string;
	shortened: string;
}

export function shortenLangage(lang: string): shortLang {
	if (lang === '') return { language: '', shortened: '' };

	const short: Record<string, string> = {
		csharp: 'cs',
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
