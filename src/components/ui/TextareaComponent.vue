<template>
  <div>
    <label v-if="label" class="block body-base-smbold text-dark mb-1">{{ label }}</label>
    <textarea
      v-model="valueSync"
      :class="classInput"
      class="
        text-dark
        py-[8px]
        px-[12px]
        rounded-[4px]
        block
        w-full
        placeholder-bright-4
        outline-none
        text-sm
        resize-none
        border
        transition
      "
      :placeholder="placeholder"
      aria-invalid="true"
      :maxlength="maxlength"
      :disabled="disabled"
      autocomplete="off"
      :style="{ height: height + 'px' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    maxlength: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: 64,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const valueSync = computed({
      get(): any {
        return props.modelValue;
      },
      set(value: any) {
        emit('update:modelValue', value);
      },
    });

    const classInput = computed(() => {
      const state = {
        'border-danger-3 shadow-3px-danger-1': props.state === 'error',
        'bg-bright-2 cursor-not-allowed pointer-events-none border-bright-2 text-bright-4 ': props.disabled,
        'bg-white border-bright-3 focus-within:border-bright-5 hover:border-bright-5 hover:shadow-3px-bright-2':
          props.state === 'default',
      };
      return {
        ...state,
      };
    });

    return {
      classInput,
      valueSync,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
