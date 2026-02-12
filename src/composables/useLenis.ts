import Lenis from "lenis";
import { onUnmounted } from "vue";

type LenisState = {
	rafId: number | null;
	lenis: Lenis | null;
};

const state: LenisState = {
	rafId: null,
	lenis: null,
};

function loop(time: number): void {
	if (!state.lenis) return;
	state.lenis.raf(time);
	state.rafId = requestAnimationFrame(loop);
}

interface LenisOptions {
	lerp?: number; // Vitesse de lissage (0.01 = très lent/smooth, 0.1 = rapide) - défaut: 0.06
	duration?: number; // Durée de l'animation de scroll en secondes - défaut: 1.2
	wheelMultiplier?: number; // Multiplicateur de vitesse de la molette - défaut: 1
	touchMultiplier?: number; // Multiplicateur de vitesse pour le touch (mobile) - défaut: 2
	smoothWheel?: boolean; // Active le smooth scroll avec la molette - défaut: true
	easing?: (t: number) => number; // Fonction d'easing personnalisée
}

export function useLenis(options: LenisOptions = {}) {
	const start = (): void => {
		if (state.lenis) return;

		state.lenis = new Lenis({
			lerp: options.lerp ?? 0.06,
			duration: options.duration ?? 1.2,
			wheelMultiplier: options.wheelMultiplier ?? 1,
			touchMultiplier: options.touchMultiplier ?? 2,
			smoothWheel: options.smoothWheel ?? true,
			easing: options.easing,
		});

		state.rafId = requestAnimationFrame(loop);
	};

	const stop = (): void => {
		if (state.rafId !== null) {
			cancelAnimationFrame(state.rafId);
			state.rafId = null;
		}
		if (state.lenis) {
			state.lenis.destroy();
			state.lenis = null;
		}
	};

	onUnmounted(stop);

	return {
		start,
		stop,
		getInstance: () => state.lenis,
	};
}
