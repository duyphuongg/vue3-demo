<template>
  <div :id="id_Tab">
    <div class="tab-component__header">
      <div :class="[type === 'underline' ? 'border-b border-bright-3' : '']">
        <nav
          class="-mb-px flex"
          :class="[type === 'underline' ? 'space-x-4' : '', type === 'pill' ? 'space-x-2' : '']"
          aria-label="Tab"
        >
          <a
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            :class="[
              tab.key === activeTab && type === 'underline'
                ? 'border-primary text-primary hover:text-primary-dark-1'
                : '',
              tab.key != activeTab && type === 'underline'
                ? 'border-transparent text-dark-1 hover:text-primary-dark-1'
                : '',
              'font-semibold text-14 font-60 leading-21',
              type === 'underline' ? 'border-b-2 py-[10px]' : '',
              type === 'pill' ? 'rounded-sm px-[12px] py-[6px] text-dark-1' : '',
              tab.key === activeTab && type === 'pill' ? 'bg-primary-light-1 text-primary-dark-1' : '',
              tab.key != activeTab && type === 'pill' ? 'hover:bg-bright-1 hover:text-dark' : '',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
            @click="selectTab(tab)"
          >
            {{ tab.name }}
          </a>
        </nav>
      </div>
    </div>
    <div class="tab-content h-full">
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { CommonUtility } from '@/utils/common.utility';
import { computed, defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'underline',
    },
    tabs: {
      type: Array,
      default: () => [],
      required: true,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    // key as id of tabs.because using javascript handle logic tab content
    const id_Tab = ref(CommonUtility.getGuid());
    const activeTab = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    const selectTab = (tabKey: any) => {
      activeTab.value = tabKey.key;
      emit('change', tabKey);

      const tabcontent: any = document.querySelector(`div[id='${id_Tab.value}'] .tab-content`);
      if (tabcontent) {
        Array.from(tabcontent.children).forEach((element: any) => {
          element.style.display = 'none';
        });
      }

      const tabContentId: any = document.querySelector(`div[id='${id_Tab.value}'] .tab-content #${tabKey.key}`);
      if (tabContentId) {
        tabContentId.style.display = 'block';
      }
    };
    const tabContents = () => {
      const tabcontent: any = document.querySelector(`div[id='${id_Tab.value}'] .tab-content`);
      console.log(tabcontent);
      if (tabcontent) {
        Array.from(tabcontent.children).forEach((element: any) => {
          if (props.modelValue === element.id) {
            element.style.display = 'block';
          }
        });
      }
    };

    onMounted(() => {
      tabContents();
    });
    return {
      tabContents,
      activeTab,
      selectTab,
      id_Tab,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab-content {
  > :deep(*) {
    display: none;
  }
}
</style>
