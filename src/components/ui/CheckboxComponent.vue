<template>
  <label
    :for="idCkb"
    :class="disabled ? 'opacity-40 pointer-events-none' : 'text-dark'"
    class="text-14 wrap-custom-box"
  >
    <span v-html="label"></span>
    <input :id="idCkb" v-model="valueSync" type="checkbox" :value="value" />
    <span class="checkmark-ckb"></span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    idCkb: {
      type: null,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Boolean, Array],
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

    return {
      valueSync,
    };
  },
});
</script>