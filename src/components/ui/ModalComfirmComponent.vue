<template>
  <modal-component
    v-model="showModalSync"
    class-container="bg-white shadow-inner-1px-bright-2 transform sm:my-8 sm:align-middle w-[406px] rounded"
    class-body="p-[20px]"
    class-footer="py-[16px] border-t px-[20px]"
    @close="onConfirm(false)"
  >
    <template #body>
      <div class="flex mb-[10px] items-center">
        <icon-component v-if="iconName != ''" :name="iconName" class="mr-[6px]" :class="iconClass" />
        <p class="body-large-smbold" v-html="title"></p>
      </div>
      <p class="body-base" v-html="content"></p>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <button-component type="subtle" :text-button="buttonDefaultText" class="mr-[8px]" @click="onConfirm(false)">
        </button-component>
        <button-component :type="buttonPrimaryType" :text-button="buttonPrimaryText" @click="onConfirm(true)">
        </button-component>
      </div>
    </template>
  </modal-component>
</template>

<script lang="ts">
import ModalComponent from '@/components/ui/ModalComponent.vue';
import IconComponent from '@/components/ui/IconComponent.vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ModalConfirmComponent',
  components: {
    ModalComponent,
    IconComponent,
    ButtonComponent,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: '',
    },
    buttonPrimaryText: {
      type: String,
      default: 'OK',
    },
    buttonPrimaryType: {
      type: String,
      default: 'dark',
    },
    buttonDefaultText: {
      type: String,
      default: 'Cancel',
    },
  },
  emits: ['onConfirm', 'update:showModal'],
  setup(props, { emit }) {
    const showModalSync = computed({
      get(): boolean {
        return props.showModal;
      },
      set(value: boolean) {
        emit('update:showModal', value);
      },
    });
    const onConfirm = (status) => {
      emit('onConfirm', status);
    };
    return { showModalSync, onConfirm };
  },
});
</script>

<style lang="scss" scoped>
</style>