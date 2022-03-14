<template>
  <div
    v-show="visible"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 bg-dark bg-opacity-50 transition-opacity"
        aria-hidden="true"
        @click="eventOutSide ? onCloseModal() : () => true"
      ></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <transition
        enter-active-class="duration-300 ease-out translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to-class="translate-y-0 opacity-100 sm:scale-100"
        leave-active-class="duration-200 ease-in"
        leave-class="translate-y-0 opacity-100 sm:scale-100"
        leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      >
        <div class="inline-block align-bottom text-left overflow-hidden transition-all" :class="classContainer">
          <div class="hidden sm:block absolute top-0 right-0 pt-2 pr-2 z-[1]">
            <button
              type="button"
              class="
                bg-white
                rounded-md
                text-bright-3
                hover:text-bright-5 hover:bg-bright-1
                font-light
                leading-[20]
                font-20
              "
              @click="onCloseModal"
            >
              <span class="sr-only">Close</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-show="visible">
            <div class="modal-body" :class="[classBody]">
              <slot name="body"> </slot>
            </div>
            <div v-if="$slots.footer" :class="[classFooter]">
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ModalComponent',
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    classBody: {
      type: String,
      default: 'py-40p',
    },
    classFooter: {
      type: String,
      default: '',
    },
    classContainer: {
      type: String,
      default: '',
    },
    eventOutSide: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const visible = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const onCloseModal = () => {
      emit('update:modelValue', !visible.value);
      emit('close');
      visible.value = !visible.value;
    };

    return {
      visible,
      onCloseModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
