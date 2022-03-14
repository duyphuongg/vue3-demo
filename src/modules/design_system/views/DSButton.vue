<template>
  <div class="ds-button pb-5">
    <div class="flex mt-[5px]">
      <div class="mr-[4px] mt-[10px]">
        <label for="type" class="block text-sm font-semibold text-gray-700 mb-[4px]">Type</label>
        <select id="type" v-model="type" name="type" class="">
          <option v-for="item in listType" :key="item" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="mx-4 mt-[10px]">
        <label for="size" class="block text-sm font-semibold text-gray-700 mb-[4px]">Size</label>
        <select id="size" v-model="size" name="size" class="">
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div class="ml-4 mr-8 mt-[10px] text-center">
        <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Disable</label>
        <input v-model="disabled" type="checkbox" class="mt-[10px]" />
      </div>
      <div class="text-center flex border-[1px] border-gray-300 rounded-[4px] p-[8px]">
        <div v-for="item in listTypeIcon" :key="item" class="mx-4 text-center">
          <label for="Icon" class="block text-sm font-semibold text-gray-700 mb-[4px]">{{ item.name }}</label>
          <input v-model="typeIcon" class="mt-[11px]" type="radio" :value="item.id" />
        </div>
      </div>
    </div>
    <div class="preview-component my-[20px] min-h-[50px] flex items-center">
      <button-component
        :type="type"
        :size="size"
        :disabled="disabled"
        :icon="icon"
        :only-icon="onlyIcon"
        :disclosure="disclosure"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div class="document-component" v-html="htmlComponent" />
    <!--eslint-enable-->

    <div class="import-compoment mt-4">
      <h3>Import</h3>
      <p>import ButtonComponent from '@/components/ui/ButtonComponent.vue';</p>
    </div>
    <div class="props-compoment mt-4">
      <h3>Props</h3>
      <p>text-button: String</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
export default defineComponent({
  components: {
    ButtonComponent,
  },
  setup: () => {
    const listType = ref([
      { id: 'primary', name: 'Primary' },
      { id: 'secondary', name: 'Secondary' },
      { id: 'dark', name: 'Dark' },
      { id: 'outline', name: 'Outline' },
      { id: 'destructive', name: 'Destructive' },
      { id: 'subtle', name: 'Subtle' },
      { id: 'subtle-primary', name: 'Subtle Primary' },
      { id: 'subtle-destructive', name: 'Subtle Destructive' },
      { id: 'link', name: 'Link' },
      { id: 'link-primary', name: 'Link Primary' },
      { id: 'link-destructive', name: 'Link Destructive' },
    ]);

    const listTypeIcon = ref([
      { id: 'normal', name: 'Normal' },
      { id: 'with-icon', name: 'With icon' },
      { id: 'only-icon', name: 'Only icon' },
      { id: 'disclosure', name: 'Disclosure' },
    ]);

    const type = ref('primary');
    const size = ref('small');
    const disabled = ref(false);
    const typeIcon = ref('normal');

    const icon = computed(() => {
      let iconName = '';

      if (['link', 'link-primary', 'link-destructive'].indexOf(type.value) != -1) {
        iconName = 'link';
      }

      switch (typeIcon.value) {
        case 'with-icon':
          iconName = 'plus';
          break;
        case 'only-icon':
          iconName = 'comment-alt-lines';
          break;
        case 'disclosure':
          iconName = 'chervon-down';
          break;

        default:
          break;
      }

      return iconName;
    });

    const onlyIcon = computed(() => {
      return typeIcon.value === 'only-icon';
    });
    const disclosure = computed(() => {
      return typeIcon.value === 'disclosure';
    });

    const htmlComponent = computed(() => {
      let htmlType = type.value != 'secondary' ? `<li>type="${type.value}"</li>` : '';
      let htmlSize = size.value != 'small' ? `<li>size="${size.value}"</li>` : '';
      let htmlDisabled = disabled.value ? `<li>:disabled="${disabled.value}"</li>` : '';
      let htmlIcon = ['with-icon', 'only-icon'].indexOf(typeIcon.value) != -1 ? `<li>icon="${icon.value}"</li>` : '';
      let htmlOnlyIcon = onlyIcon.value ? `<li>:only-icon="${onlyIcon.value}"</li>` : '';
      let htmlDisclosure = disclosure.value ? `<li>:disclosure="${disclosure.value}"</li>` : '';
      if (['link', 'link-primary', 'link-destructive'].indexOf(type.value) != -1) {
        htmlSize = '';
      }

      return `<div class="preview-code">
        <div class="tag">&#60;button-component</div>
          <ul>
            ${htmlType}
            ${htmlSize}
            ${htmlDisabled}
            ${htmlIcon}
            ${htmlOnlyIcon}
            ${htmlDisclosure}
          </ul>
        <div class="tag">/></div>
      </div>`;
    });

    return {
      listType,
      listTypeIcon,
      typeIcon,
      type,
      size,
      disabled,
      icon,
      onlyIcon,
      disclosure,
      htmlComponent,
    };
  },
});
</script>

<style lang="scss">
.ds-button {
  .preview-code {
    width: max-content;
    background-color: #ddd;
    border-radius: 4px;
    padding: 10px 20px;
    min-width: 315px;
    ul {
      li {
        padding: 0px 30px;
      }
    }
  }

  select {
    border-radius: 4px;
    padding: 5px 3px;
    outline: none;
  }
}
</style>