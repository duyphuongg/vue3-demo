<template>
  <div>
    <ImageLightBox :arr-images="arrImages" :is-show-max="3" />
  </div>
</template>

<script>
import ImageLightBox from '@/components/ui/ImageLightBoxComponent.vue';
import { ref } from 'vue';
export default {
  components: {
    ImageLightBox,
  },
  setup() {
    const arrImages = ref([
      'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
      'https://www.w3schools.com/howto/img_snow.jpg',
      'https://www.w3schools.com/howto/img_mountains.jpg',
      'https://s3.cloud.cmctelecom.vn/tinhte1/2013/06/3406499_wowwindows8_best-iphone-5-hd-wallpaper-39.jpg',
      'https://www.w3schools.com/howto/img_nature.jpg',
    ]);
    return { arrImages };
  },
};
</script>

<style lang="scss" scoped>
</style>