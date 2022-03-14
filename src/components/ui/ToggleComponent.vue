<template>
  <button
    type="button"
    :class="classBtn"
    class="
      bg-gray-200
      relative
      inline-flex
      flex-shrink-0
      border-2 border-transparent
      rounded-3xl
      cursor-pointer
      transition-colors
      ease-in-out
      duration-200
      focus:outline-none
    "
    aria-pressed="false"
    @click="onPressed"
  >
    <span class="sr-only">Use setting </span>
    <span
      aria-hidden="true"
      :class="classPoint"
      class="
        pointer-events-none
        inline-block
        rounded-full
        bg-white
        shadow-1p
        transform
        transition
        ease-in-out
        duration-200
      "
    ></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
    },
    size: {
      type: String,
      default: 'large',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const state: any = ref(props.modelValue);

    const classBtn = computed(() => {
      return {
        'w-10 h-4.5': props.size === 'medium',
        'w-12 h-6': props.size === 'large',
        'bg-success-3': state.value,
        'bg-bright-3': !state.value,
        'opacity-40 cursor-not-allowed pointer-events-none': props.disabled,
      };
    });

    const classPoint = computed(() => {
      return {
        'w-3.5 h-3.5': props.size === 'medium',
        'w-5 h-5': props.size === 'large',
        'translate-x-0': !state.value,
        'translate-x-[22px]': state.value && props.size === 'medium',
        'translate-x-6': state.value && props.size === 'large',
        'pointer-events-none': props.disabled,
      };
    });

    const onPressed = () => {
      state.value = !state.value;
      emit('update:modelValue', state.value);
      emit('change', state.value);
    };

    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== state.value) {
          state.value = newVal;
        }
      },
    );

    return { classBtn, classPoint, state, onPressed };
  },
});
</script>
