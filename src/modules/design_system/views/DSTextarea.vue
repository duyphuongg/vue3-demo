<template>
  <div>
    <div class="flex mt-[20px]">
      <Textarea
        v-model="text"
        class="w-[300px]"
        :label="label == true ? 'Label' : ''"
        :state="state"
        :maxlength="200"
        :disabled="state === 'disabled'"
        placeholder="Enter text"
      >
      </Textarea>
    </div>
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
    </div>
  </div>

  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Textarea from '@/components/ui/TextareaComponent.vue';
export default defineComponent({
  name: 'TextareComp',
  components: {
    Textarea,
  },
  setup() {
    const text = ref('');
    const label = ref(false);
    const state = ref('default');

    const htmlComponent = computed(() => {
      let htmlLabel = label.value == true ? 'Label' : '';
      return `
    <Textarea
      v-model="text"
      :label="${htmlLabel}"
      :state="${state.value}"
      :maxlength="200"
      :disabled="${state.value === 'disabled' ? true : false}"
      placeholder="Enter text"
      height="64"
    >
    </Textarea>`;
    });
    return {
      text,
      label,
      state,
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
