<template>
  <div class="ds-tooltip p-[12px]">
    <div class="grid grid-flow-col grid-cols-3 mb-[16px]">
      <div class="position">
        <label for="size" class="block text-sm font-semibold text-gray-700 mb-4p">Position</label>
        <select
          id="position"
          v-model="position"
          name="position"
          class="
            mt-1
            block
            pl-3
            pr-10
            py-2
            text-base
            border-gray-300
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
            rounded-md
          "
        >
          <option :value="'top'">Top</option>
          <option :value="'top-left'">Top Left</option>
          <option :value="'top-right'">Top Right</option>
          <option :value="'bottom'">Bottom</option>
          <option :value="'bottom-left'">Bottom Left</option>
          <option :value="'bottom-right'">Bottom Right</option>
          <option :value="'left'">Left</option>
          <option :value="'left-top'">Left Top</option>
          <option :value="'left-bottom'">Left Bottom</option>
          <option :value="'right'">Right</option>
          <option :value="'right-top'">Right Top</option>
          <option :value="'right-bottom'">Right Bottom</option>
        </select>
      </div>

      <div class="position">
        <label for="size" class="block text-sm font-semibold text-gray-700 mb-4p">Type</label>
        <select
          id="position"
          v-model="type"
          name="position"
          class="
            mt-1
            block
            pl-3
            pr-10
            py-2
            text-base
            border-gray-300
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
            rounded-md
          "
        >
          <option :value="'dark'">dark</option>
          <option :value="'light'">light</option>
        </select>
      </div>
    </div>
    <div class="grid grid-flow-col grid-cols-2 gap-5 mb-[16px]">
      <div class="text-left">
        <tooltip-component class="inline-block" :type="type" :position="position" content="This is a small tooltip.">
          <div class="px-4 py-2 border rounded-[3px]">Tooltip</div>
        </tooltip-component>
      </div>
      <div class="text-left">
        <tooltip-component
          class="inline-block"
          :type="type"
          :position="position"
          content="This is a large and dark tooltip. This is a large and dark tooltip. This is a large and dark tooltip. This is a large and dark tooltip."
          label="Tooltip"
        >
          <div class="px-4 py-2 border rounded-[3px]">Tooltip large</div>
        </tooltip-component>
      </div>
    </div>
    <!-- <div class="grid grid-flow-col grid-cols-2 mb-[16px]">
      <div class="p-[12px] text-center">
        <tooltip-component
          class="inline-block"
          type="light"
          position="bottom"
          label="Tooltip"
        >
          <span>Test button copy in tooltip - pos: bottom</span>
          <template #content>
            <div class="flex items-center">
              <span>This is a small tooltip.</span>
              <tooltip-component
                class="inline-block"
                type="dark"
                position="top"
                content="Copied"
                label="Tooltip"
                show-by-click
              >
                <icon-component
                  name="copy"
                  class="cursor-pointer hover:text-primary-500"
                />
              </tooltip-component>
            </div>
          </template>
        </tooltip-component>
      </div>
    </div> -->
  </div>

  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
  name: 'Tooltip',
  components: {
    TooltipComponent,
  },
  setup() {
    const type = ref('dark');
    const size = ref('small');
    const position = ref('right');
    const htmlComponent = computed(() => {
      return `
      <tooltip-component
        :position="${position.value}"
        :type="${type.value}"
        content="String"
      >
        <slot />
      </tooltip-component>`;
    });

    return {
      type,
      size,
      position,
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
