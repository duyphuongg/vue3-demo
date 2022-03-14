<template>
  <div class="p-12p">
    <div class="mt-16p">
      <div class="grid grid-flow-col grid-cols-2">
        <div class="p-12p text-center">
          <select-multi
            v-model="valueSelectMultiple"
            :error="type == 'error'"
            :disabled="type == 'disable'"
            :options="optionSelectMultiple"
            class="select"
            :error-text="isError ? 'This is error message' : ''"
            show-search
          >
            <template #label="{ item }">{{ item.item.label }}</template>
          </select-multi>
        </div>
      </div>
    </div>
  </div>
  <div class="document-component mt-10">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SelectMulti from '@/components/ui/SelectMultipleComponent.vue';

export default defineComponent({
  components: {
    SelectMulti,
  },
  setup() {
    const htmlComponent = computed(() => {
      return `
       <select-multi
            v-model="valueSelectMultiple"
            :options="optionSelectMultiple"
            :error="type == 'error'"
            :disabled="type == 'disable'"
            class="select"
            :error-text="isError ? 'This is error message' : ''"
            show-search
            @change="changeFunction"
          >
            <template #label="{ item }">{{ item.item.label }}</template>
          </select-multi>
          `;
    });
    return { htmlComponent };
  },
  data() {
    return {
      valueSelect: '1',
      valueSelectMultiple: [],
      optionSelectMultiple: [
        { label: 'Hintonburg', value: '12' },
        { label: 'Westboro', value: '22' },
        { label: 'Downtown', value: '32' },
        { label: 'Richmond Hill', value: '123' },
      ],
      type: 'default',
      isError: false,
      imageAssign: '',
    };
  },
  methods: {},
});
</script>

<style scoped lang="scss">
select {
  margin: 0 auto;
}
.custom-select-component,
.custom-select-multiple-component {
  max-width: 200px;
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
