<template>
  <div class="flex">
    <div class="mx-4 text-left">
      <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Disable</label>
      <input v-model="state.disabled" type="checkbox" class="mt-[10px]" />
    </div>
  </div>
  <div class="preview-component my-10">
    <CheckboxComponent
      v-model="state.isCheckedNew"
      label="Label name new"
      :id-ckb="state.idCkbNew"
      :disabled="state.disabled"
    />
  </div>
  <div class="document-component">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import CheckboxComponent from '@/components/ui/CheckboxComponent.vue';
export default defineComponent({
  components: { CheckboxComponent },
  setup() {
    const state = reactive({
      label: 'Label Name',
      disabled: false,
      isChecked: true,
      isCheckedNew: true,
      idCkb: 1,
      idCkbNew: 2,
    });
    const htmlComponent = computed(() => {
      let htmlLabel = `:label=${state.label}`;
      let htmlID = `:id-ckb=${state.idCkb}`;
      let htmlChecked = `v-model=${state.isChecked}`;
      let htmlDisabled = `:disabled=${state.disabled}`;
      return `
          <CheckboxComponent
            ${htmlLabel}
            ${htmlID}
            ${htmlChecked}
            ${htmlDisabled}
          />`;
    });
    const handleGetValue = (e: any) => {
      console.log('getvalue', e);
      state.isChecked = e;
      console.log('isChecked', state.isChecked);
    };
    return { state, htmlComponent, handleGetValue };
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
