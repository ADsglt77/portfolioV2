import { inject, nextTick, onUnmounted, type Ref, watch } from "vue";
import type { FadeInOptions } from "../lib/fadeIn";
import { fadeIn } from "../lib/fadeIn";

type UseFadeInOptions = {
	active?: Ref<boolean>; // ex: entered injecté depuis App
	threshold?: number; // seuil IntersectionObserver (ex: 0.3)
} & FadeInOptions;

export function useFadeIn(
	elementRef: Ref<HTMLElement | null>,
	options: UseFadeInOptions = {},
) {
	const animationsEnabled = inject<{ value: boolean } | undefined>(
		"animationsEnabled",
	);
	const {
		active,
		threshold = 0.3,
		duration = 800,
		delay = 0,
		translateY = 20,
		translateX = 0,
		opacity = 1,
	} = options;

	let hasAnimated = false;
	let observer: IntersectionObserver | null = null;
	let timeoutId: number | null = null;

	const reset = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		if (elementRef.value) {
			elementRef.value.style.opacity = "0";
			elementRef.value.style.transform = `translate(${translateX}px, ${translateY}px)`;
		}
	};

	const setVisible = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		if (elementRef.value) {
			elementRef.value.style.opacity = `${opacity}`;
			elementRef.value.style.transform = "translate(0, 0)";
		}
	};

	const setupObserver = () => {
		if (!elementRef.value || !active?.value) return;
		if (observer) {
			observer.disconnect();
			observer = null;
		}

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated && active.value) {
						hasAnimated = true;
						if (elementRef.value) {
							timeoutId = fadeIn(elementRef.value, {
								duration,
								delay,
								translateY,
								translateX,
								opacity,
							});
						}
					} else if (!entry.isIntersecting && hasAnimated) {
						hasAnimated = false;
						reset();
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
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		if (!animationsEnabled?.value) {
			setVisible();
			return;
		}
		hasAnimated = false;
		reset();
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
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	});

	return {
		trigger: () => {
			if (elementRef.value && !hasAnimated && animationsEnabled?.value) {
				hasAnimated = true;
				timeoutId = fadeIn(elementRef.value, {
					duration,
					delay,
					translateY,
					translateX,
					opacity,
				});
			}
		},
	};
}
