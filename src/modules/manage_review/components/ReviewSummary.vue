<template>
  <div class="border-solid border-1 border-bright-3 flex flex-row justify-start align-middle">
    <img
      class="object-cover h-[100px] w-[100px] mr-4"
      src="@/modules/manage_review/images/product-image.svg"
      alt="image-product"
    />
    <div class="review-desc flex flex-col justify-center pr-12">
      <span
        class="body-base-smbold line-clamp-2"
        title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id voluptatum non deserunt veniam totam provident? Hic
        perferendis voluptatem doloremque qui laborum, voluptate fuga numquam deserunt dolorum quasi aliquid molestiae
        sint."
      >
        Here's a block of text from a blog post that isn't conveniently three lines long like you designed for
        originally. It's probably like 6 lines on mobile or even on desktop depending on how you have things laid out.
        Truly a big pain in the derriere, and not the sort of thing you expected to be wasting your time trying to deal
        with at 2:45pm on a Friday am I right? You've got tickets to SmackDown and you heard there's gonna be a dark
        match with that local guy from two towns over that your cousin went to high school with before the show starts,
        and you're gonna miss it if you're not there early.
      </span>
      <div class="flex items-center mt-[14px]">
        <div class="text-12 text-primary mr-[10px] flex items-center border-r border-bright-3 pr-[10px]">
          <span class="mr-1 body-large-smbold leading-[19px]">4.5</span>
          <Icon name="star" type="solid" class="text-primary mb-[2px] product-detail-star" />
        </div>
        <p
          class="text-12 text-dark-3 body-small-smbold"
          v-html="$tc('manage_reviews.product_detail_reviews_count', 500, { num: 500 })"
        ></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/ui/IconComponent.vue';

export default defineComponent({
  name: 'ReviewSummary',
  components: {
    Icon,
  },
});
</script>
<style lang="scss">
i {
  &.product-detail-star {
    svg {
      width: 16px;
      height: 14px;
    }
  }
}
</style>
