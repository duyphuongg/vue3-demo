<template>
  <i v-if="listPath" :class="className">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="widthIcon"
      :height="heightIcon"
      :viewBox="viewBox"
      class="icon-svg fill-current"
    >
      <path v-for="(item, index) in listPath" :key="index" :d="item" />
    </svg>
  </i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { iconPath } from '@/constants/icon-path';
export default defineComponent({
  name: 'IconComponent',
  props: {
    width: {
      type: [Number, String],
      default: null,
    },
    height: {
      type: [Number, String],
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'regular',
    },
    classColor: {
      type: String,
      default: null,
    },
    fillCurrent: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const listPath = computed(() => {
      let list: any = [];
      let type = props.type || 'regular';
      if (iconPath[props.name]) {
        list = iconPath[props.name][type];
      }
      return list;
    });
    const widthIcon = computed(() => {
      let width: any = 12;
      let dataIcon = iconPath[props.name];
      if (dataIcon && dataIcon.width) width = dataIcon.width;
      if (props.width) width = props.width;
      return width;
    });
    const heightIcon = computed(() => {
      let height: any = 12;
      let dataIcon = iconPath[props.name];
      if (dataIcon && dataIcon.height) height = dataIcon.height;
      if (props.height) height = props.height;
      return height;
    });
    const viewBox = computed(() => {
      let dataIcon = iconPath[props.name];
      return dataIcon ? `0 0 ${dataIcon.width} ${dataIcon.height}` : null;
    });
    const className = computed(() => {
      let color = props.fillCurrent ? '' : 'text-dark';
      if (props.classColor) {
        color = props.classColor;
      }
      return color;
    });
    return {
      listPath,
      widthIcon,
      heightIcon,
      viewBox,
      className,
    };
  },
});
</script>
