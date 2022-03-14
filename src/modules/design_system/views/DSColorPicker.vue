<template>
  <div class="p-[16px]">
    <div class=""><input id="" v-model="disabled" type="checkbox" /> Disabled</div>
    <div class="mt-[16px]">
      <label class="pr-[16px]">Disabled:</label>
      <ColorPicker v-model="valueColor" :disabled="disabled" />
    </div>
  </div>
  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import ColorPicker from '@/components/ui/ColorPickerComponent.vue';

export default defineComponent({
  name: 'DSColorPicker',
  components: { ColorPicker },
  setup() {
    const valueColor = ref('#BA3737');
    const disabled = ref(false);

    const htmlComponent = computed(() => {
      return `
          <ColorPicker 
            v-model="valueColor" 
            disabled="${disabled.value}" 
          />`;
    });

    return {
      valueColor,
      disabled,
      htmlComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.color-picker-component {
  display: inline-block;
}
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
