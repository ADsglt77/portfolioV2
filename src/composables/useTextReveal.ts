import { inject, nextTick, onUnmounted, type Ref, watch } from "vue";
import type { TextRevealOptions } from "../lib/textReveal";
import { textReveal } from "../lib/textReveal";

type UseTextRevealOptions = {
	active?: Ref<boolean>; // ex: entered injecté depuis App
	threshold?: number; // seuil IntersectionObserver (ex: 0.3)
} & TextRevealOptions;

export function useTextReveal(
	elementRef: Ref<HTMLElement | null>,
	text: string,
	options: UseTextRevealOptions = {},
) {
	const animationsEnabled = inject<{ value: boolean } | undefined>(
		"animationsEnabled",
	);
	const { active, threshold = 0.3, delay = 50 } = options;

	let hasRevealed = false;
	let observer: IntersectionObserver | null = null;

	// Sans animation : afficher le texte une fois, pas d'observer ni de clear
	const applyTextStatic = () => {
		if (elementRef.value && active?.value) {
			elementRef.value.textContent = text.trim().replace(/\s+/g, " ");
		}
	};

	const setupObserver = () => {
		if (!elementRef.value || !active?.value) return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasRevealed && active.value) {
						hasRevealed = true;
						if (elementRef.value) {
							textReveal(elementRef.value, text, { delay });
						}
					} else if (!entry.isIntersecting && hasRevealed) {
						hasRevealed = false;
						if (elementRef.value) {
							elementRef.value.innerHTML = "";
						}
					}
				});
			},
			{ threshold },
		);

		observer.observe(elementRef.value);
	};

	const applyMode = async () => {
		if (!active?.value) return;
		await nextTick();
		if (observer) {
			observer.disconnect();
			observer = null;
		}
		if (!animationsEnabled?.value) {
			applyTextStatic();
			return;
		}
		hasRevealed = false;
		if (elementRef.value) {
			elementRef.value.innerHTML = "";
		}
		setupObserver();
	};

	watch(active ?? ({ value: true } as Ref<boolean>), applyMode, {
		immediate: true,
	});

	watch(
		() => animationsEnabled?.value,
		() => {
			if (active?.value) applyMode();
		},
	);

	onUnmounted(() => {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	});

	return {
		reveal: () => {
			if (elementRef.value && !hasRevealed) {
				hasRevealed = true;
				if (!animationsEnabled?.value) {
					elementRef.value.textContent = text.trim().replace(/\s+/g, " ");
				} else {
					textReveal(elementRef.value, text, { delay });
				}
			}
		},
	};
}
