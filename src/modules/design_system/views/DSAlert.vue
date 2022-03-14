<template>
  <div class="flex justify-around">
    <div>
      <select v-model="type" class="px-3 py-1 rounded">
        <option>success</option>
        <option>info</option>
        <option>warning</option>
        <option>error</option>
      </select>
    </div>
    <div class="mx-2"><input id="" v-model="icon" type="checkbox" /> Icon</div>
    <div class="mx-2"><input id="" v-model="border" type="checkbox" /> Border</div>
    <div class="mx-2"><input id="" v-model="label" type="checkbox" /> Label</div>
  </div>
  <div class="mt-[40px]">
    <Alert :type="type" :is-icon="icon" :is-border="border" :show-alert="showAlert" @closeAlert="closeAlert">
      <template #message>
        <p>This is a success alert</p>
      </template>
      <template v-if="label" #button> Label </template>
    </Alert>
  </div>

  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Alert from '@/components/ui/AlertComponent.vue';

export default defineComponent({
  name: 'DSAlert',
  components: { Alert },
  setup() {
    const type = ref('success');
    const icon = ref(true);
    const border = ref(true);
    const label = ref(true);
    const showAlert = ref(true);
    const closeAlert = () => {
      showAlert.value = false;
    };
    const htmlComponent = computed(() => {
      const labelHtml = label.value
        ? `
        <template #button>
          Label
        </template>`
        : '';
      return `
      <Alert 
        :type="${type.value}" 
        :is-icon="${icon.value}" 
        :show-alert="${showAlert.value}" 
        :is-border="${border.value}"
        @closeAlert="closeAlert"
      >
        <template #message>
          <p>String</p>
        </template>${labelHtml}
      </Alert>`;
    });
    return {
      type,
      icon,
      border,
      label,
      htmlComponent,
      showAlert,
      closeAlert,
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
