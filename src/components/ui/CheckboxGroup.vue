<template>
  <div class="checkbox-component">
    <div v-if="typeCheckbox === 'group'">
      <div class="group-checkbox">
        <label
          v-for="(item, i) in optionGroupCheckbox"
          :key="i"
          class="checkbox-item text-14 outline-none py-2 px-3"
          :class="{ 'checkbox-item-checked': isChecked(item.value), 'checkbox-item-disabled': item.disable }"
        >
          <input
            v-model="checkedCheckbox"
            type="checkbox"
            class="checkbox-input"
            :class="{ disabled: item.disable, checked: isChecked(item.value) }"
            :value="item.value"
            :name="nameGroupCheckbox"
            :disabled="item.disable"
          />

          <!-- <span class="checkbox-text">{{ item.label }}</span> -->
          <span class="checkbox-text">
            <slot name="label" :item="item">{{ item }}</slot>
          </span>
          <span
            class="checkmark w-4 h-4 border rounded border-bright-4 bg-white"
            :class="{ 'checkmark-checked': checkedCheckbox, 'checkmark-disabled': item.disable }"
          ></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'CheckboxComponent',
  props: {
    typeCheckbox: {
      type: String,
      default: '',
    },
    valueSingleCheckbox: {
      type: String,
      default: '',
    },
    nameSingleCheckbox: {
      type: String,
      default: '',
    },
    disabledSingleCheckbox: {
      type: Boolean,
      default: false,
    },
    nameGroupCheckbox: {
      type: String,
      default: '',
    },
    optionGroupCheckbox: Array,
    modelValue: {
      type: [Boolean, Array],
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const checkedCheckbox = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit('change', value);
        return emit('update:modelValue', value);
      },
    });
    const checkTab = ref(false),
      closeTab = () => {
        checkTab.value = false;
      };
    const changeValueSingleSelect = (e: any) => {
      emit('change', e.target.checked);
    };

    return {
      checkedCheckbox,
      checkTab,
      closeTab,
      changeValueSingleSelect,
    };
  },
  methods: {
    // eslint-disable-next-line
    isChecked: function (val: string) {
      if (typeof this.modelValue == 'object') return this.modelValue.includes(val);
    },
  },
});
</script>

<style lang="scss">
.checkbox-component {
  .group-checkbox {
    .checkbox-item {
      .checkmark {
        left: 12px;
      }

      .checkbox-input:focus-visible ~ .checkmark::before {
        content: '';
        width: 21px;
        height: 21px;
        @apply border bg-primary border-primary transition;
        background: transparent;
        position: absolute;
        left: -3px;
        top: -3px;
        border-radius: 4px;
      }
    }
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    position: relative;
    width: max-content;

    &:not(.checkbox-item-disabled) {
      &:hover {
        .checkbox-input ~ .checkmark {
          background-color: #f6f6f8;
        }

        .checkbox-input {
          &.checked ~ .checkmark {
            @apply bg-primary-dark-2 border-primary-dark-2 transition;
          }
        }
      }
    }

    .checkbox-text {
      padding-left: 23px;
    }

    .checkbox-input {
      & ~ .check-focus.checkmark::before {
        content: '';
        width: 21px;
        height: 21px;
        @apply border bg-primary border-primary;
        background: transparent;
        position: absolute;
        left: -3px;
        top: -3px;
        border-radius: 4px;
      }

      & ~ .check-focus.checkmark-disabled::before {
        display: none;
      }

      &.checked {
        & ~ .checkmark {
          @apply bg-primary border-primary;

          &:after {
            display: block;
          }
        }
      }
    }

    .checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      &::after {
        content: '';
        position: absolute;
        display: none;
        left: 5px;
        top: 2px;
        width: 5px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    &-disabled {
      color: #9b9ba8;
      cursor: not-allowed;

      .checkmark-disabled {
        border-color: #e9e9ec;
      }

      &:hover {
        .checkbox-input ~ .checkmark-disabled {
          background-color: #ffffff;
        }
      }

      .checkbox-input.checked {
        & ~ .checkmark-disabled {
          background-color: #bfcef3;
          border-color: #bfcef3;

          &:after {
            display: block;
          }
        }
      }
    }
  }
}
</style>