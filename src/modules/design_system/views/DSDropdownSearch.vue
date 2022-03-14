<template>
  <!-- Choose type -->
  <div class="flex">
    <div class="mx-4 mt-[10px]">
      <label for="size" class="block text-sm font-semibold text-gray-700 mb-[4px]">Type Panel</label>
      <select id="size" v-model="state.typePannel" name="size" class="">
        <option value="">Normal</option>
        <option value="double-square">Double Square</option>
        <option value="sub-menu">Sub menu</option>
      </select>
    </div>
    <div class="mx-4 text-left">
      <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Has Icon</label>
      <input v-model="state.hasIcon" type="checkbox" class="mt-[10px]" />
    </div>
    <div class="mx-4 text-left">
      <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Has Search</label>
      <input v-model="state.showSearch" type="checkbox" class="mt-[10px]" />
    </div>
    <div class="mx-4 text-left">
      <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Disable</label>
      <input v-model="state.disabled" type="checkbox" class="mt-[10px]" />
    </div>
    <div class="mx-4 text-left">
      <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Without Label</label>
      <input v-model="state.withoutLabel" type="checkbox" class="mt-[10px]" @change="checkStatusLabel()" />
    </div>
    <div class="mx-4 text-left">
      <label for="Disable" class="block text-sm font-semibold text-gray-700 mb-[4px]">Type Button</label>
      <input v-model="state.checkType" type="checkbox" class="mt-[10px]" @change="checkTypeDropdown()" />
    </div>
  </div>
  <!-- Component -->
  <div class="preview-component my-[40px]">
    <DropdownSearch
      :type-panel="state.typePannel"
      :label="state.label"
      :show-search="state.showSearch"
      :options="state.typePannel == 'sub-menu' ? state.arrayItemChild : state.arrayItem"
      :has-icon="state.hasIcon"
      :disabled="state.disabled"
      :type="state.type"
      @change="handleGetValue"
      @search="handleSearch"
    />
  </div>
  <!-- Preview -->
  <div class="document-component">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import DropdownSearch from '@/components/ui/DropdownSearch.vue';
export default defineComponent({
  components: { DropdownSearch },
  setup() {
    const state = reactive({
      arrayItem: [
        { id: 1, label: 'Account', link: '#', icon: 'Clone', checked: true },
        { id: 2, label: 'Support', link: '#', icon: 'Clone', checked: false },
        { id: 3, label: 'License', link: '#', icon: 'Clone', checked: false },
        { id: 4, label: 'License', link: '#', icon: 'Clone', checked: false },
        { id: 5, label: 'License', link: '#', icon: 'Clone', checked: false },
        { id: 6, label: 'License', link: '#', icon: 'Clone', checked: false },
      ],
      arrayItemChild: [
        {
          id: 1,
          label: 'Account',
          link: '#',
          icon: 'Clone',
          checked: true,
          children: [
            { id: 1, label: 'Account Child', link: '#', icon: 'Clone', checked: true },
            { id: 2, label: 'Support Child', link: '#', icon: 'Clone', checked: false },
          ],
        },
        {
          id: 2,
          label: 'Support',
          link: '#',
          icon: 'Clone',
          checked: false,
          children: [
            { id: 1, label: 'Account Child', link: '#', icon: 'Clone', checked: true },
            { id: 2, label: 'Support Child', link: '#', icon: 'Clone', checked: false },
          ],
        },
        {
          id: 3,
          label: 'License',
          link: '#',
          icon: 'Clone',
          checked: false,
          children: [
            { id: 1, label: 'Account Child', link: '#', icon: 'Clone', checked: true },
            { id: 2, label: 'Support Child', link: '#', icon: 'Clone', checked: false },
          ],
        },
      ],
      selectedItem: null,
      label: 'Label Name',
      type: 'normal',
      typePannel: 'sub-menu',
      disabled: false,
      hasIcon: false,
      withoutLabel: false,
      checkType: false,
      showSearch: false,
    });
    const htmlComponent = computed(() => {
      let htmlType = `:type=${state.type}`;
      let htmlTypePanel = `:type-panel=${state.typePannel ? state.typePannel : ''}`;
      let htmlSearch = `:show-search=${state.showSearch}`;
      let htmlLabel = `:label=${state.label}`;
      let htmlListItem = `:options=Array`;
      let htmlHasIcon = `:has-icon=Boolean`;
      let htmlDisbled = `:disabled=Boolean`;
      let htmlFunction = `@change="functionChange"`;
      let htmlSearchFunction = `@search="functionSearch"`;
      return `
          <DropdownSearch
              ${htmlType}
              ${htmlTypePanel}
              ${htmlSearch}
              ${htmlLabel}
              ${htmlListItem}
              ${htmlHasIcon}
              ${htmlDisbled}
              ${htmlFunction}
              ${htmlSearchFunction}
          />`;
    });
    const checkStatusLabel = () => {
      console.log('event log', state.withoutLabel);
      if (state.withoutLabel) {
        return (state.label = '');
      } else {
        return (state.label = 'Label Name');
      }
    };

    const checkTypeDropdown = () => {
      if (state.checkType) {
        return (state.type = 'button');
      } else {
        return (state.type = 'normal');
      }
    };
    const handleGetValue = (option: any) => {
      console.log('okok', option);
      state.selectedItem = option;
    };
    const handleSearch = (keyword: any) => {
      console.log('keyword', keyword);
    };
    return { state, handleGetValue, handleSearch, checkTypeDropdown, checkStatusLabel, htmlComponent };
  },
});
</script>
