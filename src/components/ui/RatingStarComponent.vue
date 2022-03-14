<template>
  <div class="rating-star inline-flex">
    <icon
      v-for="(star, index) of starObj"
      :key="index"
      name="star"
      :type="star"
      class="text-primary-dark-1 mr-[4px] last:mr-0"
    ></icon>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/ui/IconComponent.vue';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    rating: {
      type: Number,
      default: 5,
    },
    color: {
      type: String,
      default: 'text-primary-dark-1',
    },
  },
  setup(props) {
    const starObj = computed(() => {
      const obj: any = {};
      for (let i = 1; i <= 5; i++) {
        if (props.rating < i) {
          obj[i] = '';
        } else {
          obj[i] = 'solid';
        }
      }
      return obj;
    });

    return { starObj };
  },
});
</script>