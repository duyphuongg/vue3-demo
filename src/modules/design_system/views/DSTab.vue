<template>
  <div class="ds-tooltip p-[12px]">
    <h1>Tabs</h1>
    <h4 class="my-5">Tabs with underline</h4>
    <tab-component v-model="tabUnderline" :tabs="tabsUnderline" :type="type_underline" @change="onChangeTab">
      <div id="tab-1">content tab 1</div>
      <div id="tab-2">content tab 2</div>
      <div id="tab-3">content tab 3</div>
      <div id="tab-4">content tab 4</div>
      <div id="tab-5">content tab 5</div>
      <div id="tab-6">content tab 6</div>
    </tab-component>
    <h4 class="my-5">Tabs in pills</h4>
    <tab-component v-model="tabPills" :tabs="tabsPills" :type="type_pill" @change="onChangeTab">
      <div id="tab-1">content tab 1</div>
      <div id="tab-2">content tab 2</div>
      <div id="tab-3">content tab 3</div>
      <div id="tab-4">content tab 4</div>
      <div id="tab-5">content tab 5</div>
      <div id="tab-6">content tab 6</div>
    </tab-component>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import TabComponent from '@/components/ui/TabComponent.vue';

export default defineComponent({
  name: 'Tabs',
  components: {
    TabComponent,
  },
  setup() {
    const tabsUnderline = ref([
      { key: 'tab-1', name: 'Tab 1', href: '#' },
      { key: 'tab-2', name: 'Tab 2', href: '#' },
      { key: 'tab-3', name: 'Tab 3', href: '#' },
      { key: 'tab-4', name: 'Tab 4', href: '#' },
      { key: 'tab-5', name: 'Tab 5', href: '#' },
      { key: 'tab-6', name: 'Tab 6', href: '#' },
    ]);
    const tabsPills = ref([
      { key: 'tab-1', name: 'Tab 1', href: '#' },
      { key: 'tab-2', name: 'Tab 2', href: '#' },
      { key: 'tab-3', name: 'Tab 3', href: '#' },
      { key: 'tab-4', name: 'Tab 4', href: '#' },
      { key: 'tab-5', name: 'Tab 5', href: '#' },
      { key: 'tab-6', name: 'Tab 6', href: '#' },
    ]);
    const tabUnderline = ref('tab-1');
    const tabPills = ref('tab-1');
    const type_underline = ref('underline');
    const type_pill = ref('pill');
    return {
      tabsUnderline,
      tabUnderline,
      tabPills,
      tabsPills,
      type_underline,
      type_pill,
    };
  },
  methods: {
    onChangeTab(tab) {
      console.log('Tab change:', tab);
    },
  },
});
</script>

<style lang="scss">
.ds-tooltip {
  .tooltip-component {
    margin: 0 auto;
  }
}
</style>
