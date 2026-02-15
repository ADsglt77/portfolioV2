<script setup lang="ts">
import { computed } from "vue";

interface Props {
	modelValue: string;
	type?: "text" | "email" | "password";
	label?: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
	id?: string;
	name?: string;
	disabled?: boolean;
	textarea?: boolean;
	rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	label: "",
	placeholder: "",
	required: false,
	error: undefined,
	id: undefined,
	name: undefined,
	disabled: false,
	textarea: false,
	rows: 6,
});

const emit = defineEmits<{
	"update:modelValue": [value: string];
}>();

const inputId = computed(
	() => props.id || `input-${Math.random().toString(36).slice(2, 11)}`,
);

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement | HTMLTextAreaElement;
	emit("update:modelValue", target.value);
};
</script>

<template>
	<div class="input-group">
		<label v-if="label" :for="inputId">
			{{ label }}
		</label>
		<input
			v-if="!textarea"
			:id="inputId"
			:name="name || inputId"
			:type="type"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:class="{ 'input--error': error }"
			@input="handleInput"
		/>
		<textarea
			v-else
			:id="inputId"
			:name="name || inputId"
			:value="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:rows="rows"
			:class="{ 'input--error': error }"
			@input="handleInput"
		></textarea>
		<span class="input-error" :class="{ 'input-error--visible': error }">
			{{ error || "\u00A0" }}
		</span>
	</div>
</template>

<style scoped>
.input-group {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);
}

input,
textarea {
	width: 100%;
	padding: var(--spacing-sm);
	background: color-mix(in srgb, var(--text) 5%, transparent);
	border: 1px solid var(--glass-border);
	border-radius: var(--radius-sm);
	color: var(--text);
	font-family: var(--font-mono);
	font-size: var(--font-size-h5);
	transition: border-color 0.2s ease;
	resize: none;
}

input:focus,
textarea:focus {
	outline: none;
	border-color: var(--glass-border-hover);
}

input::placeholder,
textarea::placeholder {
	color: var(--muted);
	opacity: 0.6;
}

input:disabled,
textarea:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.input--error {
	border-color: var(--error);
}

.input-error {
	color: var(--error);
	opacity: 0;
	transition: opacity 0.15s ease;
}

.input-error--visible {
	opacity: 1;
}
</style>
