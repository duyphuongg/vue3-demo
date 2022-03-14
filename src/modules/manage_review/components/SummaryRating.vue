<template>
  <div class="min-w-[280px] pl-[22px] border-l border-bright-5">
    <rating-summary-item
      v-for="(item, index) of starArrangement"
      :key="index"
      :rating="item.key"
      :total-rating="item.totalRating"
      :total="item.total"
    >
    </rating-summary-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import RatingSummaryItem from './RatingSummaryItem.vue';
import * as _ from 'lodash';

export default defineComponent({
  name: 'SummaryRating',
  components: {
    RatingSummaryItem,
  },
  props: {
    reviews: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  emits: ['filter'],
  setup(props, { emit }) {
    const starArrangement = computed(() => {
      if (props.reviews && props.reviews.length > 0) {
        let result = _.chain(props.reviews)
          .groupBy('star')
          .map((value, key) => {
            let item = { key, total: value.length, totalRating: (value.length / props.reviews.length) * 100 };
            return item;
          })
          .sortBy()
          .reverse()
          .value();
        // console.log(props.reviews, result);
        return result;
      } else {
        let result = ['1', '2', '3', '4', '5'].map((key) => {
          let item = { key, total: 0, totalRating: 0 };
          return item;
        });
        // console.log(props.reviews, result);
        return result;
      }
    });
    const selectGroup = (tabKey: any) => {
      emit('filter', tabKey);
    };
    return {
      starArrangement,
      selectGroup,
    };
  },
});
</script>
