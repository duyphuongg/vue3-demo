<template>
  <div>
    <label v-if="label" class="block body-base-smbold text-dark mb-1">{{ label }}</label>
    <div class="text-14 arrow-off relative rounded-[4px] flex border transition" :class="classInputContainer">
      <div v-if="isSearch" class="inset-y-0 ml-[12px] mr-[8px] flex items-center text-dark">
        <icon-component name="search" :class="{ 'text-bright-4': disabled, 'text-dark': !disabled }" />
      </div>
      <div
        class="relative w-fill"
        :class="{
          'pl-[12px]': !isSearch,
          'pr-[12px]': !$slots.suffix,
        }"
      >
        <input
          v-model="valueSync"
          :type="type"
          :class="classInput"
          class="text-dark py-[5px] pl-0 block w-full outline-none text-sm"
          :placeholder="placeholder"
          aria-invalid="true"
          :maxlength="maxlength"
          :disabled="disabled"
          :autocomplete="type === 'password' ? 'on' : 'off'"
        />
      </div>
      <template v-if="type !== 'password'">
        <div
          v-if="$slots.suffix"
          class="inset-y-0 ml-[8px] mr-[12px] flex items-center text-dark"
          :class="{ 'text-bright-4': disabled }"
        >
          <slot v-if="$slots.suffix" name="suffix" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import IconComponent from '@/components/ui/IconComponent.vue';

export default defineComponent({
  components: {
    IconComponent,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'default',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isSearch: {
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

    const classInputContainer = computed(() => {
      const state = {
        'border-danger-3 shadow-3px-danger-1': props.state === 'error',
        'disabled bg-bright-2 cursor-not-allowed pointer-events-none border-bright-2 text-bright-4': props.disabled,
        'bg-white border-bright-3 focus-within:border-bright-5 hover:border-bright-5 hover:shadow-3px-bright-2':
          props.state === 'default',
      };

      return { ...state };
    });

    const classInput = computed(() => {
      const state = {
        ' placeholder-bright-4 text-dark': !props.disabled,
        ' placeholder-bright-4 text-bright-4 ': props.disabled,
      };
      return {
        ...state,
      };
    });

    return {
      classInput,
      classInputContainer,
      valueSync,
    };
  },
});
</script>

<style lang="scss" scoped>
.arrow-off {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
}
</style>
