<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
	inject,
	nextTick,
	onMounted,
	onUnmounted,
	type Ref,
	ref,
	watch,
} from "vue";
import { fadeIn } from "../lib/fadeIn";

interface TimelineItem {
	date: string;
	organization: string;
	role?: string;
	description?: string;
	type: "formation" | "work";
}

interface Props {
	items: TimelineItem[];
}

const props = defineProps<Props>();
const entered = inject<Ref<boolean>>("entered")!;
const animationsEnabled = inject<{ value: boolean } | undefined>(
	"animationsEnabled",
);
const contentRefs = ref<(HTMLElement | null)[]>([]);
const hasAnimated = new Set<number>();
let observer: IntersectionObserver | null = null;

onMounted(() => {
	contentRefs.value = Array(props.items.length).fill(null);
});

const setupObserver = async () => {
	if (!entered.value) return;
	await nextTick();
	await nextTick(); // Double nextTick pour s'assurer que les refs sont assignées

	if (observer) {
		observer.disconnect();
	}

	const withAnimations = animationsEnabled?.value;

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const index = parseInt(
					(entry.target as HTMLElement).dataset.index || "0",
					10,
				);

				if (entry.isIntersecting) {
					if (hasAnimated.has(index)) return;

					hasAnimated.add(index);
					if (withAnimations) {
						const target = entry.target as HTMLElement;
						fadeIn(target, {
							duration: 800,
							delay: index * 100,
							translateY: 30,
						});
					}
				} else if (withAnimations) {
					if (hasAnimated.has(index)) {
						hasAnimated.delete(index);
						const target = entry.target as HTMLElement;
						target.style.opacity = "0";
						target.style.transform = "translateY(30px)";
					}
				}
			});
		},
		{ threshold: 0.2 },
	);

	contentRefs.value.forEach((el) => {
		if (el) {
			if (withAnimations) {
				el.style.opacity = "0";
				el.style.transform = "translateY(30px)";
				observer?.observe(el);
			} else {
				el.style.opacity = "1";
				el.style.transform = "translate(0, 0)";
			}
		}
	});
};

watch(
	[entered, () => animationsEnabled?.value],
	() => {
		if (entered.value) {
			setupObserver();
		}
	},
	{ immediate: true },
);

onUnmounted(() => {
	observer?.disconnect();
});
</script>

<template>
  <div class="timeline">
    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="['timeline-item', index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right']"
      >
        <div class="timeline-marker">
          <div class="timeline-marker-inner"></div>
        </div>
        <div
          :ref="
            (el) => {
              if (el) contentRefs[index] = el as HTMLElement
            }
          "
          :data-index="index"
          class="timeline-content"
        >
          <div class="timeline-date">
            <p>{{ item.date }}</p>
          </div>
          <div class="timeline-organization">
            <Icon
              :icon="item.type === 'formation' ? 'iconoir:graduation-cap' : 'iconoir:community'"
              class="timeline-icon"
            />
            <h4>{{ item.organization }}</h4>
          </div>
          <div v-if="item.role" class="timeline-role">
            <h5>{{ item.role }}</h5>
          </div>
          <div v-if="item.description" class="timeline-description">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-xl);
}

.timeline-container {
  position: relative;
  width: 100%;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--glass-border) 10%,
    var(--glass-border) 90%,
    transparent
  );
  transform: translateX(-50%);
  z-index: 0;
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-3xl);
  display: flex;
  align-items: flex-start;
}

.timeline-item--left {
  justify-content: flex-start;
}

.timeline-item--right {
  justify-content: flex-end;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  top: var(--spacing-md);
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-marker-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--text);
  border: 3px solid var(--bg);
  box-shadow: 0 0 0 2px var(--glass-border);
}

.timeline-content {
  display: flex;
  flex-direction: column;
  width: calc(50% - var(--spacing-3xl));
  background: color-mix(in srgb, var(--text) 8%, transparent);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  backdrop-filter: blur(10px);
  gap: var(--spacing-sm);
}

.timeline-date {
  color: var(--muted);
  text-transform: uppercase;
}

.timeline-organization {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.timeline-icon {
  width: 40px;
  height: 40px;
}

.timeline-role h5 {
  color: var(--muted);
}

@media (max-width: 768px) {
  .timeline-line {
    left: var(--spacing-xl);
  }

  .timeline-item {
    justify-content: flex-start !important;
  }

  .timeline-marker {
    left: var(--spacing-xl);
  }

  .timeline-content {
    width: calc(100% - var(--spacing-3xl));
    margin-left: var(--spacing-3xl) !important;
    margin-right: 0 !important;
  }
}
</style>
