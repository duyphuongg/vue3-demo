<template>
  <div ref="collapse" class="collapse">
    <div class="collapse__header" @click="onOpenCollapse">
      <slot name="header" />
    </div>
    <div class="collapse__body" :style="styleBody">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted, watch } from 'vue';
export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    selectorBody: {
      type: String,
      default: 'a', // class slot body
    },
  },
  emits: ['onActive'],
  setup(props, { emit }) {
    // declare variables
    const state = reactive({
      isShowCollapse: props.active,
      heightBody: 0,
    });

    const collapse: any = ref(null);

    // begin mounted
    onMounted(() => {
      setHeightBody();
    });
    // end mounted

    // begin watch
    watch(
      () => props.active,
      (newVal) => {
        state.isShowCollapse = newVal;
      },
    );
    // end watch

    // begin computed
    const styleBody = computed(() => {
      let style = state.isShowCollapse ? `height: ${state.heightBody}px;` : '';
      return style;
    });
    // end computed

    // begin methods
    const setHeightBody = () => {
      const eleBody = collapse.value.querySelector(`.collapse__body ${props.selectorBody}`);
      let height = 0;
      if (eleBody) {
        let style = eleBody.currentStyle || window.getComputedStyle(eleBody);
        let marginTop = parseInt(style.marginTop, 0);
        height = eleBody.offsetHeight + marginTop;
      }
      state.heightBody = height;
    };

    const onOpenCollapse = () => {
      setHeightBody();
      state.isShowCollapse = !state.isShowCollapse;
      if (state.isShowCollapse) emit('onActive');
    };
    // end methods

    return {
      state,
      collapse,
      styleBody,
      onOpenCollapse,
    };
  },
});
</script>

<style lang="scss" scoped>
.collapse {
  &__header {
  }
  &__body {
    height: 0px;
    overflow: hidden;
    transition: height 0.4s;
  }
}
</style>    