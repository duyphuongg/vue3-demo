<template>
  <div>
    <RatingStar :rating="ratingVal" />
  </div>

  <div class="document-component mt-5">
    <pre class="language-html">{{ htmlComponent }}</pre>
  </div>
</template>

<script>
import RatingStar from '@/components/ui/RatingStarComponent.vue';

import { computed, ref } from 'vue';

export default {
  components: {
    RatingStar,
  },
  setup() {
    const ratingVal = ref(4);
    const htmlComponent = computed(() => {
      return `<RatingStar :rating="${ratingVal.value}" />`;
    });

    return { ratingVal, htmlComponent };
  },
};
</script>

<style lang="scss" scoped>
</style>