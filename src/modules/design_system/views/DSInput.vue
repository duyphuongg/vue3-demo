<template>
  <div>
    <Input
      v-model="text"
      class="w-[300px]"
      :label="label == true ? 'Label' : ''"
      :state="state"
      :maxlength="200"
      :type="type"
      :disabled="state === 'disabled'"
      :is-search="isSearch"
      placeholder="Enter text"
    >
      <template v-if="suffix === true" #suffix>
        {{ suffixText }}
      </template>
    </Input>

    <div class="mt-5 flex space arround flex-wrap">
      <div class="mx-4">
        <input id="" v-model="label" type="checkbox" />
        <label for="label" class="ml-2 text-sm font-medium text-gray-700">Label</label>
      </div>

      <div class="mx-4">
        <label for="label" class="block text-sm font-medium text-gray-700">State</label>
        <select
          id="state"
          v-model="state"
          name="state"
          class="
            mt-1
            block
            w-full
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
          <option>default</option>
          <option>error</option>
          <option>disabled</option>
        </select>
      </div>
      <div class="mx-4">
        <label for="label" class="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="state"
          v-model="type"
          name="state"
          class="
            mt-1
            block
            w-full
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
          <option>text</option>
          <option>number</option>
          <option>password</option>
        </select>
      </div>

      <div class="mx-4">
        <input id="" v-model="isSearch" type="checkbox" />
        <label for="label" class="ml-2 text-sm font-medium text-gray-700">Search</label>
      </div>
      <div class="mx-4">
        <input id="" v-model="suffix" type="checkbox" />
        <label for="label" class="ml-2 text-sm font-medium text-gray-700">Suffix</label>
        <Input v-if="suffix === true" v-model="suffixText" class="w-200 mt-3" />
      </div>
    </div>
  </div>
  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Input from '@/components/ui/InputComponent.vue';
export default defineComponent({
  name: 'InputComp',
  components: {
    Input,
  },
  setup() {
    const text = ref('');
    const label = ref(false);
    const state = ref('default');
    const type = ref('text');
    const isSearch = ref(false);
    const suffix = ref(false);
    const suffixText = ref('$');

    const htmlComponent = computed(() => {
      let htmlLabel = label.value == true ? 'Label' : '';
      let htmlSuffix =
        suffix.value == true
          ? `
      <template #suffix>
        ${suffixText.value}
      </template>`
          : '';
      return `
    <Input
      v-model="text"
      :label="${htmlLabel}"
      :state="${state.value}"
      :maxlength="200"
      :type="${type.value}"
      :disabled="${state.value === 'disabled' ? true : false}"
      :is-search="${isSearch.value}"
      placeholder="Enter text"
    >${htmlSuffix}
    </Input>`;
    });

    return {
      text,
      label,
      state,
      type,
      isSearch,
      suffix,
      suffixText,
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
