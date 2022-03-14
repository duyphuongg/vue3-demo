<template>
  <div class="flex justify-around">
    <pagination v-model="pagValLink" type="link" :total="10" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pagination from '@/components/ui/PaginationComponent.vue';

export default defineComponent({
  name: 'DSPagination',
  components: {
    Pagination,
  },
  data() {
    return {
      pagValLink: 1,
      pagValNum: 1,
    };
  },
});
</script>
