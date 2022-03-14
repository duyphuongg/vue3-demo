<template>
  <div
    ref="subMenuParent"
    class="submenu__title ml-0"
    :class="classCustom"
    v-bind="$attrs"
    @click="showTooltip('click')"
  >
    <slot></slot>
  </div>
  <teleport to="#submenu">
    <div
      v-if="isShowTooltip"
      ref="subMenuChild"
      v-click-outside="hideTooltip"
      class="submenu__content break-words w-full fixed text-14 block text-left transition-all"
      :class="[positionTooltip, maxWidthContent ? maxWidthContent : 'max-w-320']"
      :style="[
        {
          width: width != '' ? width + 'px' : 'max-content',
          right: rightTooltip !== 'auto' ? `${rightTooltip}px` : rightTooltip,
          left: leftTooltip !== 'auto' ? `${leftTooltip}px` : leftTooltip,
          top: topTooltip !== 'auto' ? `${topTooltip}px` : topTooltip,
          bottom: bottomTooltip !== 'auto' ? `${bottomTooltip}px` : bottomTooltip,
        },
      ]"
    >
      <span class="tooltip__inner relative block">
        <slot name="content"></slot>
      </span>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue';

export default defineComponent({
  name: 'TooltipComponent',
  props: {
    position: {
      type: String,
      default: 'right',
    },
    width: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    timeout: {
      type: Number,
      default: 400,
    },
    classCustom: {
      type: String,
      default: '',
    },
    paddingRight: {
      type: Number,
      default: 0,
    },
    maxWidthContent: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const tooltipArrow = ref<HTMLElement>();
    const subMenuParent = ref<HTMLElement>();
    const subMenuChild = ref<HTMLElement>();
    const rightTooltip = ref<number | string>('auto');
    const leftTooltip = ref<number | string>('auto');
    const topTooltip = ref<number | string>('auto');
    const bottomTooltip = ref<number | string>('auto');
    const rightArrow = ref<number | string>('auto');
    const leftArrow = ref<number | string>('auto');
    const topArrow = ref<number | string>('auto');
    const bottomArrow = ref<number | string>('auto');
    const isShowTooltip = ref<boolean>(false);
    const timeoutFunction = ref<any>(null);

    const checkPositionTooltip = computed(() => {
      if (subMenuChild.value && subMenuParent.value) {
        const rangeRightToScreen =
          document.documentElement.clientWidth - subMenuParent.value.getBoundingClientRect().right;

        const tooltipWidth = subMenuChild.value.getBoundingClientRect().width;
        switch (props.position) {
          case 'right':
          case 'right-top':
          case 'right-bottom':
            return tooltipWidth > rangeRightToScreen;
        }
      }
      return false;
    });

    const checkContentTooltip = computed(() => {
      const content = {
        overflowLeft: false,
        overflowRight: false,
        overflowTop: false,
        overflowBottom: false,
      };
      if (subMenuChild.value && subMenuParent.value) {
        const tooltipWidth = subMenuChild.value.getBoundingClientRect().width;

        if (props.position === 'top' || props.position === 'bottom') {
          const rangeRightToScreen =
            document.documentElement.clientWidth -
            (subMenuParent.value.getBoundingClientRect().right - subMenuParent.value.offsetWidth / 2);
          const rangeLeftToScreen =
            subMenuParent.value.getBoundingClientRect().left + subMenuParent.value.offsetWidth / 2;
          content.overflowLeft = tooltipWidth / 2 > rangeLeftToScreen;
          content.overflowRight = tooltipWidth / 2 > rangeRightToScreen;
        }
        if (
          props.position === 'top-left' ||
          props.position === 'bottom-left' ||
          props.position === 'top-right' ||
          props.position === 'bottom-right'
        ) {
          const rangeRightToScreen =
            document.documentElement.clientWidth -
            (subMenuParent.value.getBoundingClientRect().right - subMenuParent.value.offsetWidth);
          const rangeLeftToScreen = subMenuParent.value.getBoundingClientRect().left + subMenuParent.value.offsetWidth;
          content.overflowLeft = tooltipWidth > rangeLeftToScreen;
          content.overflowRight = tooltipWidth > rangeRightToScreen;
        }
      }
      return content;
    });

    const positionTooltip = computed(() => {
      const state = {
        'pos-right pl-10p':
          (props.position === 'right' || props.position === 'right-top' || props.position === 'right-bottom') &&
          !checkPositionTooltip.value,
        'pos-right-left pr-10p':
          (props.position === 'right' || props.position === 'right-top' || props.position === 'right-bottom') &&
          checkPositionTooltip.value,
      };

      return { ...state };
    });

    const getPositionParent = async () => {
      isShowTooltip.value = true;
      let TooltipWidth: any = 0;
      let TooltipHeight: any = 0;
      let justifyY = 0;
      let justifyX = 0;
      await nextTick();
      if (subMenuChild.value && subMenuParent.value) {
        TooltipWidth = subMenuChild.value?.offsetWidth;
        TooltipHeight = subMenuChild.value?.offsetHeight;
        if (
          (props.position === 'right' && !checkPositionTooltip.value) ||
          (props.position === 'left' && checkPositionTooltip.value)
        ) {
          rightTooltip.value = 'auto';
          leftTooltip.value = subMenuParent.value.getBoundingClientRect().right + props.paddingRight;
          justifyY = TooltipHeight / 2 - subMenuParent.value.getBoundingClientRect().height / 2;
          topTooltip.value = subMenuParent.value.getBoundingClientRect().top;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'right-top' && !checkPositionTooltip.value) ||
          (props.position === 'left-top' && checkPositionTooltip.value)
        ) {
          rightTooltip.value = 'auto';
          leftTooltip.value = subMenuParent.value.getBoundingClientRect().right;
          topTooltip.value = subMenuParent.value.getBoundingClientRect().top;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'right-bottom' && !checkPositionTooltip.value) ||
          (props.position === 'left-bottom' && checkPositionTooltip.value)
        ) {
          rightTooltip.value = 'auto';
          leftTooltip.value = subMenuParent.value.getBoundingClientRect().right;
          topTooltip.value = subMenuParent.value.getBoundingClientRect().bottom - TooltipHeight;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'left' && !checkPositionTooltip.value) ||
          (props.position === 'right' && checkPositionTooltip.value)
        ) {
          rightTooltip.value = 'auto';
          leftTooltip.value = subMenuParent.value.getBoundingClientRect().left - TooltipWidth;
          justifyY = TooltipHeight / 2 - subMenuParent.value.getBoundingClientRect().height / 2;
          topTooltip.value = subMenuParent.value.getBoundingClientRect().top - justifyY;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'left-top' && !checkPositionTooltip.value) ||
          (props.position === 'right-top' && checkPositionTooltip.value)
        ) {
          rightTooltip.value = 'auto';
          leftTooltip.value = subMenuParent.value.getBoundingClientRect().left - TooltipWidth;
          topTooltip.value = subMenuParent.value.getBoundingClientRect().top;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'left-bottom' && !checkPositionTooltip.value) ||
          (props.position === 'right-bottom' && checkPositionTooltip.value)
        ) {
          rightTooltip.value = 'auto';
          leftTooltip.value = subMenuParent.value.getBoundingClientRect().left - TooltipWidth;
          topTooltip.value = subMenuParent.value.getBoundingClientRect().bottom - TooltipHeight;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'top' && !checkPositionTooltip.value) ||
          (props.position === 'bottom' && checkPositionTooltip.value)
        ) {
          if (checkContentTooltip.value.overflowLeft) {
            leftTooltip.value = 4;
          } else {
            justifyX = TooltipWidth / 2 - subMenuParent.value.getBoundingClientRect().width / 2;
            leftTooltip.value = subMenuParent.value.getBoundingClientRect().left - justifyX;
          }
          if (checkContentTooltip.value.overflowRight) {
            rightTooltip.value = 4;
            leftTooltip.value = 'auto';
          } else {
            rightTooltip.value = 'auto';
          }
          topTooltip.value = subMenuParent.value.getBoundingClientRect().top - TooltipHeight;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'top-left' && !checkPositionTooltip.value) ||
          (props.position === 'bottom-left' && checkPositionTooltip.value)
        ) {
          if (checkContentTooltip.value.overflowRight) {
            rightTooltip.value = 4;
            leftTooltip.value = 'auto';
          } else {
            rightTooltip.value = 'auto';
            leftTooltip.value = subMenuParent.value.getBoundingClientRect().left;
          }
          topTooltip.value = subMenuParent.value.getBoundingClientRect().top - TooltipHeight;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'top-right' && !checkPositionTooltip.value) ||
          (props.position === 'bottom-right' && checkPositionTooltip.value)
        ) {
          if (checkContentTooltip.value.overflowLeft) {
            leftTooltip.value = 4;
            rightTooltip.value = 'auto';
          } else {
            rightTooltip.value =
              document.documentElement.clientWidth - subMenuParent.value.getBoundingClientRect().right;
            leftTooltip.value = 'auto';
          }
          topTooltip.value = subMenuParent.value.getBoundingClientRect().top - TooltipHeight;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'bottom' && !checkPositionTooltip.value) ||
          (props.position === 'top' && checkPositionTooltip.value)
        ) {
          if (checkContentTooltip.value.overflowRight) {
            rightTooltip.value = 4;
          } else {
            rightTooltip.value = 'auto';
          }
          if (checkContentTooltip.value.overflowLeft) {
            leftTooltip.value = 4;
          } else {
            justifyX = TooltipWidth / 2 - subMenuParent.value.getBoundingClientRect().width / 2;
            leftTooltip.value = subMenuParent.value.getBoundingClientRect().left - justifyX;
          }
          topTooltip.value = subMenuParent.value.getBoundingClientRect().bottom;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'bottom-left' && !checkPositionTooltip.value) ||
          (props.position === 'top-left' && checkPositionTooltip.value)
        ) {
          if (checkContentTooltip.value.overflowRight) {
            rightTooltip.value = 4;
            leftTooltip.value = 'auto';
          } else {
            rightTooltip.value = 'auto';
            leftTooltip.value = subMenuParent.value.getBoundingClientRect().left;
          }
          topTooltip.value = subMenuParent.value.getBoundingClientRect().bottom;
          bottomTooltip.value = 'auto';
        }
        if (
          (props.position === 'bottom-right' && !checkPositionTooltip.value) ||
          (props.position === 'top-right' && checkPositionTooltip.value)
        ) {
          if (checkContentTooltip.value.overflowLeft) {
            leftTooltip.value = 4;
            rightTooltip.value = 'auto';
          } else {
            rightTooltip.value =
              document.documentElement.clientWidth - subMenuParent.value.getBoundingClientRect().right;
            leftTooltip.value = 'auto';
          }
          topTooltip.value = subMenuParent.value.getBoundingClientRect().bottom;
          bottomTooltip.value = 'auto';
        }
      }
    };

    const hideTooltip = () => {
      if (props.timeout > 0) {
        clearTimeout(timeoutFunction.value);
      }
      isShowTooltip.value = false;
    };

    const showTooltip = (action: string) => {
      if (action === 'click') {
        if (props.timeout === null) {
          getPositionParent();
        }
        if (props.timeout > 0) {
          timeoutFunction.value = setTimeout(() => {
            getPositionParent();
          }, props.timeout);
        }
      }
    };
    return {
      isShowTooltip,
      positionTooltip,
      tooltipArrow,
      checkPositionTooltip,
      checkContentTooltip,
      subMenuParent,
      subMenuChild,
      rightArrow,
      leftArrow,
      topArrow,
      bottomArrow,
      rightTooltip,
      leftTooltip,
      topTooltip,
      bottomTooltip,
      timeoutFunction,
      getPositionParent,
      showTooltip,
      hideTooltip,
    };
  },
});
</script>

<style lang="scss">
.submenu__title {
  display: inherit;
}
.submenu__inner {
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15);
}
</style>
