import { theme, logo, button, form } from './maps';
import type { themes, baseValues } from './map.types';

export function setTheme(bgColor: string | null | undefined, mapName: string) {
	const map: themes = selectTheme(mapName);
	return selectThemeVariant(map, bgColor);
}

type ReturnTheme<T> = T extends 'logo'
	? themes
	: T extends 'button'
		? themes
		: T extends 'form'
			? themes
			: themes;

function selectTheme(themeName: string): ReturnTheme<'logo' | 'button' | 'form' | 'theme'> {
	switch (themeName.toLowerCase()) {
		case 'logo':
			return logo;
		case 'button':
			return button;
		case 'form':
			return form;
		default:
			return theme;
	}
}

function selectThemeVariant(
	theme: ReturnTheme<themes>,
	baseColor: string | undefined | null
): baseValues {
	switch (baseColor?.toLowerCase()) {
		case 'two':
			return theme?.two || theme?.one;
		case 'three':
			return theme?.three || theme?.one;
		case 'four':
			return theme?.four || theme?.one;
		case 'five':
			return theme?.five || theme?.one;
		case 'six':
			return theme?.six || theme?.one;
		case 'seven':
			return theme?.seven || theme?.one;
		case 'eight':
			return theme?.eight || theme?.one;
		case 'nine':
			return theme?.nine || theme?.one;
		case 'ten':
			return theme?.ten || theme?.one;
		default:
			return theme.one;
	}
}
