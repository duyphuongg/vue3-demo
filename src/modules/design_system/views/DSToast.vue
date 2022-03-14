<template>
  <div class="p-[10px]">
    <div class="flex justify-between">
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addSuccessWithDesc">
        <span> Toast success with desc</span>
      </button>
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addSuccess">
        <span> Toast success </span>
      </button>
    </div>
    <div class="flex justify-between">
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addInfoWithDesc">
        <span> Toast info</span>
      </button>
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addInfo">
        <span> Toast info</span>
      </button>
    </div>

    <div class="flex justify-between">
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addWarningWithDesc">
        <span> Toast warning</span>
      </button>
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addWarning">
        <span> Toast warning</span>
      </button>
    </div>
    <div class="flex justify-between">
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addErrorWithDesc">
        <span> Toast error</span>
      </button>
      <button class="mb-1 bg-gray-800 text-white px-3 py-4 rounded block" @click="addError">
        <span> Toast error</span>
      </button>
    </div>
  </div>

  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useToast } from '@/composables/useToast';

export default defineComponent({
  name: 'Toast',
  setup() {
    const { addToast } = useToast();
    const addMoreToast = () => {
      addToast({
        title: 'Another Toast Demo Test',
        type: 'success',
        icon: 'WifiSlash',
        iconColor: 'neutrals-400',
        timeout: 3000,
        btnLabel: 'Add more',
        btnFunction: addMoreToast,
      });
    };
    const addSuccessWithDesc = () => {
      addToast({
        title: 'Success',
        desc: 'This is success message ',
        icon: 'check-circle',
        iconColor: 'text-success-3',
        type: 'success',
        timeout: 3000,
      });
    };
    const addSuccess = () => {
      addToast({
        title: 'This is success message ',
        icon: 'check-circle',
        iconColor: 'text-success-3',
        type: 'success',
        timeout: 3000,
      });
    };
    const addInfoWithDesc = () => {
      addToast({
        title: 'Info',
        desc: 'This is info message ',
        icon: 'info-circle',
        iconColor: 'text-info-3',
        type: 'info',
        timeout: 3000,
      });
    };
    const addInfo = () => {
      addToast({
        title: 'Info',
        icon: 'info-circle',
        iconColor: 'text-info-3',
        type: 'info',
        timeout: 3000,
      });
    };
    const addWarningWithDesc = () => {
      addToast({
        title: 'Warning',
        desc: 'This is warning message ',
        icon: 'exclamation-circle',
        iconColor: 'text-warning-3',
        type: 'warning',
        timeout: 3000,
      });
    };
    const addWarning = () => {
      addToast({
        title: 'Warning',
        icon: 'exclamation-circle',
        iconColor: 'text-warning-3',
        type: 'warning',
        timeout: 3000,
      });
    };
    const addErrorWithDesc = () => {
      addToast({
        title: 'Error',
        desc: 'This is Error message',
        icon: 'times-circle',
        iconColor: 'text-danger-3',
        type: 'danger',
        timeout: 3000,
      });
    };
    const addError = () => {
      addToast({
        title: 'Error',
        icon: 'times-circle',
        iconColor: 'text-danger-3',
        type: 'danger',
        timeout: 3000,
      });
    };

    const htmlComponent = computed(() => {
      return `
      addToast({
        title: 'Success',
        desc: 'This is success message ',
        icon: 'check-circle',
        iconColor: 'text-success-3',
        type: 'success',
        timeout: 3000,
      });`;
    });
    return {
      addMoreToast,
      addSuccess,
      addSuccessWithDesc,
      addInfo,
      addWarning,
      addError,
      addInfoWithDesc,
      addWarningWithDesc,
      addErrorWithDesc,
      htmlComponent,
    };
  },
});
</script>

<style lang="scss">
.language-html {
  width: max-content;
  line-height: 1.4;
  margin: 0px;
  padding: 0px 55px 15px 0px;
  background-color: #f6f6f6;
  border-radius: 6px;
  overflow: auto;
}
</style>
