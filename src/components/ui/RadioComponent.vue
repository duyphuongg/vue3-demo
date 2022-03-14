<template>
  <div class="radio-component">
    <label
      v-click-outside="closeTab"
      class="radio-group relative cursor-pointer group block"
      :class="[{ 'cursor-not-allowed': disabled }, $slots.custom ? 'w-full' : 'w-max']"
    >
      <div class="flex items-center">
        <input
          v-model="checkedRadio"
          class="radio-group__input absolute opacity-0 h-0 w-0"
          type="radio"
          :disabled="disabled"
          :value="valueRadio"
          :class="{ checked: checkedRadio === valueRadio, disabled: disabled }"
          :checked="checkedRadio === valueRadio"
          :name="nameRadio"
          @keyup.tab="checkTab = true"
          @keydown.tab="checkTab = false"
          @click="checkTab = false"
        />
        <span
          class="radio-group__checkmark relative left-0 w-4 h-4 border-2 border-bright-4 rounded-full"
          :class="[
            { 'checkmark-checked': checkedRadio === valueRadio, 'radio-focus': checkTab },
            disabled ? 'checkmark-disabled' : 'hover:bg-bright-2',
          ]"
        ></span>
        <span class="text-14 text-primary-900 content-radio pl-2" :class="{ 'text-bright-4': disabled }">
          <slot name="label"></slot>
        </span>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'RadioComponent',
  props: {
    modelValue: {
      type: null,
    },
    valueRadio: {
      type: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    nameRadio: {
      type: String,
      default: '',
    },
    isDatePicker: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change', 'update:defaultValue'],
  setup(props, { emit }) {
    const checkTab = ref(false),
      closeTab = () => {
        checkTab.value = false;
      };
    const checkedRadio = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        // if (props.modelValue == undefined){
        //     emit('change', value === props.valueRadio);
        //     return emit('update:modelValue', value === props.valueRadio);

        // } else{
        //     emit('change', value);
        //     return emit('update:modelValue', value);
        // }
        emit('change', value);
        return emit('update:modelValue', value);
      },
    });

    return {
      checkTab,
      closeTab,
      checkedRadio,
    };
  },
});
</script>

<style lang="scss">
.radio-component {
  .radio-group {
    &__checkmark {
      &::before {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        left: -3px;
        top: -3px;
        border-radius: 50%;
        display: none;
        @apply border-2 border-primary;
      }
      &.radio-focus {
        &:before {
          display: block;
        }
      }
      &.checkmark-disabled {
        border-color: #e9e9ec;
      }
    }
    &__input {
      & ~ .radio-group__checkmark {
        &::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          display: none;
          @apply bg-primary;
        }
      }
      &:checked {
        & ~ .radio-group__checkmark {
          border-width: 2px;
          @apply border-primary;
          &::after {
            display: block;
          }
          &.radio-focus:before {
            left: -4px;
            top: -4px;
          }
        }
        &:focus-visible {
          & ~ .radio-group__checkmark::before {
            left: -4px;
            top: -4px;
          }
        }
        &.disabled {
          & ~ .radio-group__checkmark {
            @apply border-primary-light-2;
            &::after {
              @apply bg-primary-light-2;
            }
          }
        }
      }
      &:focus-visible {
        & ~ .radio-group__checkmark::before {
          display: block;
        }
      }
    }
    &:hover {
      .radio-group__input {
        &:checked {
          & ~ .radio-group__checkmark:not(.checkmark-disabled) {
            background-color: #ffffff;
            @apply border-primary-dark-2;
            &::after {
              @apply bg-primary-dark-2;
            }
          }
        }
      }
    }
    .content-radio {
      width: calc(100% - 16px);
    }
  }
}
</style>
