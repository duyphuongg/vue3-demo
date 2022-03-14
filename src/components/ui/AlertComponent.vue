<template>
  <div v-if="showAlert" class="alert rounded py-[16px] px-[16px] border" :class="[classBg, classBorder]">
    <div class="flex items-center">
      <div v-if="isIcon" class="flex-shrink-0 mr-[8px]">
        <icon-component :name="nameIcon" :class="colorIcon" />
      </div>
      <div class="content-alert text-dark text-left w-full flex justify-between">
        <div v-if="$slots.message" class="body-base">
          <slot name="message"></slot>
        </div>
        <div v-if="$slots.button" class="body-base-smbold" :class="colorIcon">
          <slot name="button"></slot>
        </div>
      </div>
      <div class="ml-auto pl-3">
        <div class="">
          <button type="button" class="inline-flex bg-transparent rounded p-1.5" @click="closeAlert">
            <span class="sr-only">Dismiss</span>
            <icon-component name="times" :class="colorIconClose" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '@/components/ui/IconComponent.vue';

export default defineComponent({
  name: 'AlertComponent',
  components: { IconComponent },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    isIcon: {
      type: Boolean,
      default: true,
    },
    isBorder: {
      type: Boolean,
      default: true,
    },
    showAlert: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['closeAlert'],
  computed: {
    classBg(): string {
      return this.bgAlert(this.type);
    },
    classBorder(): string {
      if (this.isBorder) {
        return this.borderAlert(this.type);
      }
      return 'border-transparent';
    },
    colorIcon(): string {
      return this.colorIconAlert(this.type);
    },
    colorIconClose(): string {
      return this.colorIconCloseAlert(this.type);
    },
    nameIcon(): string {
      return this.nameIconAlert(this.type);
    },
  },
  methods: {
    bgAlert(val: string) {
      switch (val) {
        case 'success':
          return 'alert-success bg-success-1';
        case 'info':
          return 'alert-info bg-info-1';
        case 'warning':
          return 'alert-warning bg-warning-1';
        case 'error':
          return 'alert-error bg-danger-1';
        default:
          return 'alert-default';
      }
    },
    borderAlert(val: string) {
      switch (val) {
        case 'success':
          return 'border-success-2';
        case 'info':
          return 'border-info-2';
        case 'warning':
          return 'border-warning-2';
        case 'error':
          return 'border-danger-2';
        default:
          return '';
      }
    },
    colorIconAlert(val: string) {
      switch (val) {
        case 'success':
          return 'text-success-3';
        case 'info':
          return 'text-info-3';
        case 'warning':
          return 'text-warning-3';
        case 'error':
          return 'text-danger-3';
        default:
          return '';
      }
    },
    colorIconCloseAlert(val: string) {
      switch (val) {
        case 'success':
          return 'text-success-2';
        case 'info':
          return 'text-info-2';
        case 'warning':
          return 'text-warning-2';
        case 'error':
          return 'text-danger-2';
        default:
          return '';
      }
    },
    nameIconAlert(val: string) {
      switch (val) {
        case 'success':
          return 'check-circle';
        case 'info':
          return 'info-circle';
        case 'warning':
          return 'exclamation-circle';
        case 'error':
          return 'times-circle';
        default:
          return '';
      }
    },
    closeAlert() {
      this.$emit('closeAlert');
    },
  },
});
</script>

<style lang="scss">
</style>
