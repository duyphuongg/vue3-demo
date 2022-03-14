<template>
  <div class="mb-5"><input id="" v-model="hasTooltip" type="checkbox" /> Show tooltip country</div>
  <div>
    <Flag code="vn" :show-tooltip="hasTooltip" />
  </div>
  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script>
import Flag from '@/components/ui/FlagComponent.vue';
import { computed, ref } from 'vue';
export default {
  components: {
    Flag,
  },
  setup() {
    const hasTooltip = ref(true);
    const htmlComponent = computed(() => {
      return `<Flag code="vn" :show-tooltip="${hasTooltip.value}" />`;
    });
    return {
      hasTooltip,
      htmlComponent,
    };
  },
};
</script>