export interface FadeInOptions {
	duration?: number; // Durée de l'animation en ms
	delay?: number; // Délai avant de commencer l'animation en ms
	translateY?: number; // Distance de translation verticale (px)
	translateX?: number; // Distance de translation horizontale (px)
	opacity?: number; // Opacité finale (0-1)
	instant?: boolean; // Afficher immédiatement sans animation
}

export function fadeIn(
	element: HTMLElement,
	options: FadeInOptions = {},
): number {
	const {
		duration = 800,
		delay = 0,
		translateY = 20,
		translateX = 0,
		opacity = 1,
		instant = false,
	} = options;

	if (instant) {
		element.style.opacity = `${opacity}`;
		element.style.transform = "translate(0, 0)";
		element.style.transition = "";
		return 0;
	}

	element.style.opacity = "0";
	element.style.transform = `translate(${translateX}px, ${translateY}px)`;
	element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;

	return window.setTimeout(() => {
		element.style.opacity = `${opacity}`;
		element.style.transform = "translate(0, 0)";
	}, delay);
}
