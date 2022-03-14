<template>
  <div class="py-5 justify-around items-center">
    <!-- Preview setting -->
    <div class="flex">
      <div class="mx-4 mt-[10px]">
        <label for="size" class="block text-sm font-semibold text-gray-700 mb-[4px]">Size</label>
        <select id="size" v-model="state.size" name="size" class="">
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div class="mx-4 mt-[10px]">
        <label for="toggleDisabled" class="block text-sm font-semibold text-gray-700 mb-[4px]">Disabled</label>
        <select id="toggleDisabled" v-model="state.disabled" name="size" class="">
          <option :value="true">True</option>
          <option :value="false">False</option>
        </select>
      </div>
    </div>
    <!-- Preview -->
    <div class="preview-component my-[40px]">
      <ToggleComponent v-model="state.status" :disabled="state.disabled" :size="state.size" />
    </div>
    <!-- Show code -->
    <div class="document-component">
      <pre class="language-html">{{ htmlComponent }}</pre>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import ToggleComponent from '@/components/ui/ToggleComponent.vue';
export default defineComponent({
  name: 'DSToggle',
  components: {
    ToggleComponent,
  },
  setup() {
    const state = reactive({
      label: 'Label Name',
      disabled: false,
      status: false,
      size: 'medium',
    });
    const htmlComponent = computed(() => {
      let htmlStatus = `:v-model="status"`;
      let htmlDisabled = `:disabled=${state.disabled}`;
      let htmlFunction = `@change="functionName"`;
      let htmlSize = `:size=${state.size}`;
      return `
          <ToggleComponent
            ${htmlSize}
            ${htmlStatus}
            ${htmlDisabled}
            ${htmlFunction}
          />`;
    });
    return { state, htmlComponent };
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
