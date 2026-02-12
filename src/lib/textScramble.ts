interface ScrambleOptions {
	duration?: number;
	fps?: number;
	charset?: string;
	/** Afficher le texte directement sans effet (ex. mode sans animation) */
	skipAnimation?: boolean;
}

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function scrambleText(
	el: HTMLElement,
	finalText: string,
	options: ScrambleOptions = {},
): void {
	if (
		options.skipAnimation ||
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		el.textContent = finalText;
		return;
	}

	const {
		duration = 1000,
		fps = 10,
		charset: customCharset = charset,
	} = options;
	const frameTime = 1000 / fps;
	const totalFrames = Math.ceil(duration / frameTime);
	let frame = 0;

	const getRandomChar = () =>
		customCharset[Math.floor(Math.random() * customCharset.length)] ?? "A";

	const animate = () => {
		if (frame >= totalFrames) {
			el.textContent = finalText;
			return;
		}

		const progress = frame / totalFrames;
		let text = "";

		for (let i = 0; i < finalText.length; i++) {
			if (progress < 0.8) {
				text += getRandomChar();
			} else {
				const reveal = Math.floor(((progress - 0.8) / 0.2) * finalText.length);
				text += i <= reveal ? finalText[i] : getRandomChar();
			}
		}

		el.textContent = text;
		frame++;
		setTimeout(() => requestAnimationFrame(animate), frameTime);
	};

	animate();
}

export function scrambleFromEvent(
	e: Event,
	finalText: string,
	options: ScrambleOptions = {},
): void {
	scrambleText(e.currentTarget as HTMLElement, finalText, options);
}
