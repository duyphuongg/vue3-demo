<template>
  <div class="badge-notification-component">
    <span class="text-[11px] font-semibold text-center" :class="[bgBadge, widthBage]">
      <slot v-if="count <= 99">
        {{ count }}
      </slot>
      <slot v-else>99<span class="plus">+</span></slot>
    </span>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BadgeNotificationComponent',
  props: {
    count: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: 'primary',
    },
  },
  setup(props) {
    const bgBadge = computed(() => {
      return {
        'bg-danger-3 text-white border border-bright-1': props.type === 'primary',
        'bg-info-3 text-white border border-bright-1': props.type === 'secondary',
        'bg-bright-2 text-dark border border-bright-3': props.type === 'tertiary',
      };
    });

    const widthBage = computed(() => {
      if (1 <= props.count && props.count <= 9) {
        return 'w-[16px] h-[16px] rounded-[50%] flex items-center justify-center';
      } else if (10 <= props.count && props.count <= 99) {
        return 'w-[26px] h-[16px] rounded-[10px] px-[6px] flex items-center justify-center';
      } else if (props.count > 99) {
        return 'w-[34px] h-[16px] rounded-[10px] px-[6px] flex items-center justify-center';
      }
      return '';
    });

    return {
      bgBadge,
      widthBage,
    };
  },
});
</script>

<style lang="scss">
.badge-notification-component {
  .under9 {
    padding: 0 4.5px;
  }
  .plus {
    margin-left: 1px;
  }
}
</style>
