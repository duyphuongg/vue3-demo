<template>
  <div class="relative w-max">
    <div class="flex w-max">
      <img
        v-for="(img, index) of listImagesShow"
        :key="index"
        :src="img"
        class="
          w-[40px]
          h-[40px]
          rounded
          border border-bright-3
          mr-[6px]
          last:mr-0
          object-cover
          cursor-pointer
          inline-block
        "
        @click="openModal(index)"
      />
    </div>
    <template v-if="listImagesPopoverLength > 0">
      <Tooltip show-by-click hide-tooltip-by-click-content position="top-right" class="absolute top-0 right-0">
        <div
          class="
            w-[40px]
            h-[40px]
            rounded
            border
            items-center
            flex
            relative
            justify-center
            before:w-full
            before:absolute
            before:h-full
            before:bg-dark
            before:opacity-50
            before:rounded
            before:cursor-pointer
          "
        >
          <p class="body-small-bold text-white z-10 cursor-pointer">+ {{ listImagesPopoverLength }}</p>
        </div>
        <template #content>
          <div class="bg-dark rounded px-0 py-[4px] flex w-max">
            <img
              v-for="(img, index) of listImagesPopover"
              :key="index"
              :src="img"
              class="w-[40px] h-[40px] rounded border border-bright-3 mr-[6px] last:mr-0 object-cover cursor-pointer"
              @click="openModal(isShowMax + index - 1)"
            />
          </div>
        </template>
      </Tooltip>
    </template>
  </div>
  <LightBox v-model="isShowModal" custom-class="mx-auto relative" class="modal-image-lightbox" @close="closeModal">
    <template #body>
      <div class="flex justify-between fixed top-1/2 left-0 w-full z-10 text-white font-semibold px-[50px]">
        <button
          class="
            bg-white
            rounded-full
            w-[48px]
            h-[48px]
            flex
            items-center
            justify-center
            text-bright-4
            hover:text-bright-5 hover:bg-bright-1
          "
          @click="prev()"
        >
          <icon-component class="text-bright-4 hover:text-bright-5" name="chevron-left" />
        </button>
        <button
          class="
            bg-white
            rounded-full
            w-[48px]
            h-[48px]
            flex
            items-center
            justify-center
            text-bright-4
            hover:text-bright-5 hover:bg-bright-1
          "
          @click="next()"
        >
          <icon-component class="text-bright-4 hover:text-bright-5" name="chevron-right" />
        </button>
      </div>
      <div
        v-for="(img, index) of arrImages"
        :key="index"
        class="max-w-full p-3"
        :class="slideIndex == index ? 'block' : 'hidden'"
      >
        <img :src="img" class="max-w-full h-auto mx-auto" />
      </div>
    </template>
  </LightBox>
</template>

<script>
import LightBox from '@/components/ui/LightBoxComponent.vue';
import IconComponent from '@/components/ui/IconComponent.vue';
import Tooltip from '@/components/ui/TooltipComponent.vue';
import { computed, ref } from 'vue';

export default {
  components: {
    LightBox,
    Tooltip,
    IconComponent,
  },
  props: {
    arrImages: {
      type: Array,
      default: () => [],
    },
    isShowMax: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    const isShowModal = ref(false);
    const slideIndex = ref(1);
    const totalImages = computed(() => {
      return props.arrImages.length;
    });

    const slideIndexMax = computed(() => {
      return totalImages.value - 1;
    });

    const listImagesShow = computed(() => {
      if (totalImages.value <= props.isShowMax) {
        return props.arrImages;
      }
      return props.arrImages.slice(0, props.isShowMax);
    });
    const listImagesPopover = computed(() => {
      if (totalImages.value <= props.isShowMax) {
        return [];
      }
      return props.arrImages.slice(props.isShowMax - 1);
    });
    const listImagesPopoverLength = computed(() => {
      return listImagesPopover.value.length - 1;
    });

    const openModal = (position) => {
      showSlides((slideIndex.value = position));
      isShowModal.value = true;
    };
    const closeModal = () => {
      isShowModal.value = false;
    };
    const next = () => {
      showSlides((slideIndex.value += 1));
    };
    const prev = () => {
      showSlides((slideIndex.value -= 1));
    };
    const showSlides = (n) => {
      if (n > slideIndexMax.value) {
        slideIndex.value = 0;
      }
      if (n < 0) {
        slideIndex.value = slideIndexMax.value;
      }
    };
    return {
      isShowModal,
      slideIndex,
      listImagesShow,
      listImagesPopover,
      listImagesPopoverLength,
      closeModal,
      openModal,
      prev,
      next,
    };
  },
};
</script>
