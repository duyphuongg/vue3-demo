<template>
  <component :is="layout">
    <router-view />
  </component>
  <toast-component />
</template>;

<script lang="ts">
import { useRoute } from 'vue-router';
import { defineComponent, defineAsyncComponent, computed } from 'vue';

export default defineComponent({
  components: {
    ToastComponent: defineAsyncComponent(
      () => import('./../components/ui/ToastComponent.vue' /* webpackChunkName: "ToastComponent" */),
    ),
    AppLayout: defineAsyncComponent(() => import('./LayoutApp.vue' /* webpackChunkName: "LayoutApp" */)),
    AuthLayout: defineAsyncComponent(() => import('./LayoutAuth.vue' /* webpackChunkName: "LayoutAuth" */)),
  },
  setup() {
    const route = useRoute();
    const defaultLayout = 'AppLayout';
    const layout = computed(() => route.meta.layout || defaultLayout);
    return { layout };
  },
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;
}
</style>
