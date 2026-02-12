import { inject, nextTick, onUnmounted, type Ref, watch } from "vue";
import { typing } from "../lib/typing";

type Options = {
	active?: Ref<boolean>; // ex: entered injecté depuis App
	typingDuration?: number; // durée du typing automatique (ex: 3000)
	threshold?: number; // seuil IntersectionObserver (ex: 0.3)
};

export function usePinnedTyping(
	sectionRef: Ref<HTMLElement | null>,
	fullText: string,
	displayedText: Ref<string>,
	options: Options = {},
) {
	const animationsEnabled = inject<{ value: boolean } | undefined>(
		"animationsEnabled",
	);
	const { active, typingDuration = 3000, threshold = 0.3 } = options;

	let hasTyped = false;
	let observer: IntersectionObserver | null = null;

	const setupObserver = () => {
		if (!sectionRef.value || !active?.value) return;
		if (observer) {
			observer.disconnect();
			observer = null;
		}

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasTyped && active.value) {
						hasTyped = true;
						displayedText.value = "";
						typing(displayedText, fullText, { duration: typingDuration });
					} else if (!entry.isIntersecting && hasTyped) {
						hasTyped = false;
						displayedText.value = "";
					}
				});
			},
			{ threshold },
		);

		observer.observe(sectionRef.value);
	};

	const applyMode = async () => {
		if (!active?.value) return;
		await nextTick();
		if (observer) {
			observer.disconnect();
			observer = null;
		}
		if (!animationsEnabled?.value) {
			displayedText.value = fullText;
			return;
		}
		hasTyped = false;
		displayedText.value = "";
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
}
