<template>
  <p>Homepage</p>
</template>
<script>
import { defineComponent } from 'vue';
import { useHome } from '../composable/useHome';
export default defineComponent({
  setup() {
    const { validateInitPage } = useHome();
    //validate
    validateInitPage();
  },
});
</script>
