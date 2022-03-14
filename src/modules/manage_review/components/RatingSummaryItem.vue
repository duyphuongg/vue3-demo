<template>
  <div class="flex flex-row justify-start items-center hover:cursor-pointer">
    <div class="body-small mr-1 w-[8px]">{{ rating }}</div>
    <icon :name="'star'" type="solid" class="text-primary-dark-1 mr-4"></icon>
    <div class="w-[160px] bg-bright-3 h-2 dark:bg-gray-700 mr-2">
      <div class="bg-primary-dark-4 h-2 dark:bg-gray-300" :style="`width:${totalRating}%`"></div>
    </div>
    <p class="body-small ml-auto">({{ total }})</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/ui/IconComponent.vue';

export default defineComponent({
  name: 'RatingSummaryItem',
  components: { Icon },
  props: {
    rating: {
      type: String,
      default: '',
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
});
</script>
