<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, inject, ref } from "vue";
import { iconCheck, iconClose } from "../data/icons";
import { scrambleText } from "../lib/textScramble";

interface Props {
	label?: string;
	icon?: string;
	iconPosition?: "left" | "right";
	disabled?: boolean;
	padding?: string;
	borderRadius?: string;
	type?: "button" | "submit" | "reset";
	success?: boolean;
	successIcon?: string;
	error?: boolean;
	errorIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
	label: "",
	icon: undefined,
	iconPosition: "left",
	disabled: false,
	padding: "var(--spacing-md)",
	borderRadius: "var(--radius-lg) 0",
	type: "button",
	success: false,
	successIcon: iconCheck,
	error: false,
	errorIcon: iconClose,
});

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

const animationsEnabled = inject<{ value: boolean } | undefined>(
	"animationsEnabled",
);
const buttonRef = ref<HTMLElement>();
const labelRef = ref<HTMLElement>();
const displayLabel = ref(props.label);

const currentIcon = computed(() => {
	if (props.error && props.errorIcon) return props.errorIcon;
	if (props.success && props.successIcon) return props.successIcon;
	return props.icon;
});

const handleClick = (event: MouseEvent) => {
	if (!props.disabled) {
		emit("click", event);
	}
};

const handleMouseEnter = () => {
	if (props.label && labelRef.value) {
		scrambleText(labelRef.value, props.label, {
			duration: 1000,
			fps: 10,
			skipAnimation: !animationsEnabled?.value,
		});
	}
};
</script>

<template>
  <button
    ref="buttonRef"
    :type="type"
    :class="{ 'btn--disabled': disabled, 'btn--success': success, 'btn--error': error }"
    :style="{
      padding: padding,
      borderRadius: borderRadius,
    }"
    :disabled="disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <Icon
      v-if="currentIcon"
      :icon="currentIcon"
      :width="18"
      :height="18"
      :class="['btn__icon', (iconPosition === 'left' || error || success) ? 'btn__icon--left' : 'btn__icon--right']"
      aria-hidden
    />
    <slot>
      <span ref="labelRef" class="btn__label">{{ displayLabel }}</span>
    </slot>
    <Icon
      v-if="currentIcon && iconPosition === 'right' && !error && !success"
      :icon="currentIcon"
      :width="18"
      :height="18"
      class="btn__icon btn__icon--right"
      aria-hidden
    />
  </button>
</template>

<style scoped>
button {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text);
  font-family: var(--font-mono);
  cursor: pointer;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  &:hover {
    background: var(--glass-hover);
    border: 1px solid var(--glass-border-hover);
  }
}

.btn__icon {
  flex-shrink: 0;
}

.btn__label {
  display: inline-block;
}

.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--success {
  background-color: color-mix(in srgb, var(--success) 10%, transparent);
  border-color: color-mix(in srgb, var(--success) 50%, transparent);
  color: var(--success);
}

.btn--success:hover {
  background-color: color-mix(in srgb, var(--success) 20%, transparent);
  border-color: color-mix(in srgb, var(--success) 70%, transparent);
}

.btn--success .btn__icon {
  animation: successIcon 0.6s ease;
}

@keyframes successIcon {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.btn--error {
  background-color: color-mix(in srgb, var(--error) 10%, transparent);
  border-color: color-mix(in srgb, var(--error) 50%, transparent);
  color: var(--error);
}

.btn--error:hover {
  background-color: color-mix(in srgb, var(--error) 20%, transparent);
  border-color: color-mix(in srgb, var(--error) 70%, transparent);
}

.btn--error .btn__icon {
  animation: errorIcon 0.6s ease;
}

@keyframes errorIcon {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
</style>
