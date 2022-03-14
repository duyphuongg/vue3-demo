<template>
  <div class="flex">
    <div class="mx-4 text-left">
      <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Disable</label>
      <input v-model="state.disabled" type="checkbox" class="mt-[10px]" />
    </div>
  </div>
  <div class="preview-component my-[40px] flex">
    <RadioComponent
      v-for="(item, i) in optionRadio"
      :key="i"
      v-model="state.picked"
      :value-radio="item.value"
      name-radio="groupRadio"
      :disabled="state.disabled"
      class="ml-5"
      @change="onChange"
    >
      <template #label>{{ item.label }}</template>
    </RadioComponent>
  </div>
  <div class="document-component">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import RadioComponent from '@/components/ui/RadioComponent.vue';
export default defineComponent({
  components: { RadioComponent },
  setup() {
    const state = reactive({
      label: 'Label Name',
      disabled: false,
      picked: '11',
    });
    const optionRadio = reactive([
      { label: '1', value: '11' },
      { label: '2', value: '22' },
      { label: '3', value: '33' },
    ]);
    const htmlComponent = computed(() => {
      let htmlDisabled = `:disabled=${state.disabled}`;
      let htmlFunction = `@change="functionName"`;
      return `
        <RadioComponent
            v-model="valueSelected"
            :value-radio="value"
            name-radio="name radio"
            ${htmlDisabled}
            ${htmlFunction}
            >
            <template #label>{{ label }}</template>
        </RadioComponent>
          `;
    });
    return { state, htmlComponent, optionRadio };
  },
  methods: {
    /* eslint-disable */
    onChange(e: any) {
      console.log(e);
    },
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
