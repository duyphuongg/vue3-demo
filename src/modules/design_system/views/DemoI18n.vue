<template>
  <p>{{ $t('design_system.title') }}</p>
  <p>{{ $t('design_system.hello', { msg: hello }) }}</p>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const hello = ref('Hello');
    return { hello };
  },
};
</script>

<style lang="scss" scoped>
</style>