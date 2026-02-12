import type { Ref } from "vue";

interface TypingOptions {
	duration?: number;
}

export function typing(
	textRef: Ref<string>,
	fullText: string,
	options: TypingOptions = {},
): void {
	const { duration = 3000 } = options;
	const chars = fullText.split("");
	const delay = duration / chars.length;
	let index = 0;

	const revealChar = () => {
		if (index < chars.length) {
			textRef.value += chars[index];
			index++;
			setTimeout(revealChar, delay);
		}
	};

	revealChar();
}
