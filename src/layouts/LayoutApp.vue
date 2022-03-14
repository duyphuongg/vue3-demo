<template>
  <div>
    <!-- Static sidebar for desktop -->
    <sidebar />
    <div class="min993:pl-[240px] pl-[64px] flex flex-col flex-1 w-full h-full min-h-screen bg-bright-2">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './Sidebar.vue';
export default defineComponent({
  components: {
    Sidebar,
  },
});
</script>