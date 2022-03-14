<template>
  <teleport to="#toast">
    <div aria-live="assertive" class="fixed z-[999] font-sans top-[24px] right-[24px]">
      <transition-group name="slide-fade-right" tag="ul">
        <div
          v-for="toast of toasts"
          :key="toast.id"
          class="
            pl-[16px]
            pr-[16px]
            flex
            items-center
            w-max
            rounded-[4px]
            mt-[10px]
            mr-auto
            shadow-1p
            border border-l-[6px]
            min-w-[312px]
          "
          :class="classToast(toast.type, !!toast.desc)"
        >
          <div class="flex-1 text-dark-5 flex items-center">
            <icon-component v-if="toast.icon" :name="toast.icon" :class="toast.iconColor" class="mr-[16px]" />
            <div class="flex items-start flex-col">
              <p class="text-16 font-semibold" :class="!!toast.desc ? toast.iconColor : ''">
                {{ toast.title }}
              </p>
              <p v-if="toast.desc" class="text-14 font-normal">
                {{ toast.desc }}
              </p>
            </div>
            <button
              v-if="toast.btnLabel"
              class="ml-[24px] mr-[16px] text-14 font-medium focus:outline-none"
              @click="toast.btnFunction"
            >
              {{ toast.btnLabel }}
            </button>
          </div>
          <div class="ml-[12px] flex-shrink-0 flex">
            <button
              class="bg-transparent border-transparent inline-flex focus:outline-none p-[6px] border rounded-[2px]"
              @click="removeToast(toast.id)"
            >
              <span class="sr-only">Close</span>
              <icon-component name="times" :class="colorIconClose(toast.type)" />
            </button>
          </div>
        </div>
        <div
          v-if="toastSingle"
          class="
            pl-[16px]
            pr-[16px]
            flex
            items-center
            w-max
            rounded-[4px]
            mt-[10px]
            mr-auto
            shadow-1p
            border border-l-[6px]
            min-w-[312px]
          "
          :class="classToast(toastSingle.type, !!toastSingle.desc)"
        >
          <div class="flex-1 text-dark-5 flex items-center">
            <icon-component
              v-if="toastSingle.icon"
              :name="toastSingle.icon"
              :class="toastSingle.iconColor"
              class="mr-[16px]"
            />
            <div class="flex items-start flex-col">
              <p class="text-16 font-semibold" :class="!!toastSingle.desc ? toastSingle.iconColor : ''">
                {{ toastSingle.title }}
              </p>
              <p v-if="toastSingle.desc" class="text-14 font-normal">
                {{ toastSingle.desc }}
              </p>
            </div>
            <button
              v-if="toastSingle.btnLabel"
              class="ml-[24px] mr-[16px] text-14 font-medium focus:outline-none"
              @click="toastSingle.btnFunction"
            >
              {{ toastSingle.btnLabel }}
            </button>
          </div>
          <div class="ml-[12px] flex-shrink-0 flex">
            <button
              class="bg-transparent inline-flex focus:outline-none p-[6px] border border-transparent rounded-[2px]"
              @click="removeToastSingle"
            >
              <span class="sr-only">Close</span>
              <icon-component name="times" :class="colorIconClose(toastSingle.type)" />
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '@/components/ui/IconComponent.vue';
import { useToast } from '@/composables/useToast';

export default defineComponent({
  components: {
    IconComponent,
  },
  setup() {
    const classToast = (type: String, hasDesc: Boolean) => {
      if (type == 'success') {
        return `border-l-success-3 border-success-2 bg-success-1 ${hasDesc ? 'py-[8px]' : 'py-[12px]'}`;
      }
      if (type == 'info') {
        return `border-l-info-3 border-info-2 bg-info-1 ${hasDesc ? 'py-[8px]' : 'py-[12px]'}`;
      }
      if (type == 'warning') {
        return `border-l-warning-3 border-warning-2 bg-warning-1 ${hasDesc ? 'py-[8px]' : 'py-[12px]'}`;
      }
      if (type == 'danger') {
        return `border-l-danger-3 border-danger-2 bg-danger-1 ${hasDesc ? 'py-[8px]' : 'py-[12px]'}`;
      }
    };
    const colorIconClose = (type: String) => {
      if (type == 'success') {
        return 'text-success-2';
      }
      if (type == 'info') {
        return 'text-info-2';
      }
      if (type == 'warning') {
        return 'text-warning-2';
      }
      if (type == 'danger') {
        return 'text-danger-2';
      }
    };
    const { toasts, toastSingle, removeToast, removeToastSingle } = useToast();
    return {
      classToast,
      colorIconClose,
      toasts,
      toastSingle,
      removeToast,
      removeToastSingle,
    };
  },
});
</script>

<style lang="scss">
</style>
