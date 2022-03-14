<template>
  <button class="button flex items-center justify-center" :class="classAtt">
    <icon-component v-if="(icon != '' || onlyIcon != '') && !disclosure" :class="classIcon" :name="icon" />
    <span v-if="!onlyIcon" :class="classTextButton">{{ textButtonDisplay }}</span>
    <icon-component v-if="disclosure" :class="classIcon" :name="'chevron-down'" />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import IconComponent from '@/components/ui/IconComponent.vue';
export default defineComponent({
  components: {
    IconComponent,
  },
  props: {
    type: {
      type: String,
      default: 'secondary',
    },
    size: {
      type: String,
      default: 'small',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    onlyIcon: {
      type: Boolean,
      default: false,
    },
    disclosure: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '',
    },
    textButton: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const classAtt = computed(() => {
      const isLink = ['link', 'link-primary', 'link-destructive'].indexOf(props.type) != -1;
      const classSize = {
        'h-[32px]': props.size === 'small',
        'h-[40px]': props.size === 'large',
        'h-[21px]': isLink,
      };
      const classPadding = {
        'px-[16px]': props.size === 'small' && !isLink && (props.icon === '' || !props.onlyIcon),
        'px-[20px]': props.size === 'large' && !isLink && (props.icon === '' || !props.onlyIcon),
        'pl-[10px] pr-[16px]':
          props.size === 'small' && !isLink && props.icon != '' && !props.onlyIcon && !props.disclosure,
        'pl-[12px] pr-[20px]':
          props.size === 'large' && !isLink && props.icon != '' && !props.onlyIcon && !props.disclosure,
        'pl-[16px] pr-[10px]':
          props.size === 'small' && !isLink && props.icon != '' && !props.onlyIcon && props.disclosure,
        'pl-[20px] pr-[12px]':
          props.size === 'large' && !isLink && props.icon != '' && !props.onlyIcon && props.disclosure,
        'px-[8px]': props.size === 'small' && !isLink && props.icon != '' && props.onlyIcon,
        'px-[12px]': props.size === 'large' && !isLink && props.icon != '' && props.onlyIcon,
        'px-[4px]': isLink && props.icon === '',
        'pr-[4px]': isLink && props.icon != '',
      };
      const classBorderRadius = {
        'rounded-[4px]': true,
      };
      const classTypeDefault = {
        // primary
        'bg-primary text-white hover:bg-primary-dark-1 active:bg-primary active:shadow-inner-2px-primary-light-2':
          props.type === 'primary' && !props.disabled,
        'bg-primary-light-2 text-white': props.type === 'primary' && props.disabled,
        // secondary
        'bg-bright-2 text-dark hover:bg-bright-3 active:bg-bright-3 active:shadow-inner-2px-bright-2':
          props.type === 'secondary' && !props.disabled,
        'bg-bright-2 text-bright-4': props.type === 'secondary' && props.disabled,
        // Dark
        'bg-dark text-white hover:bg-dark-2 active:bg-dark active:shadow-inner-2px-dark-1':
          props.type === 'dark' && !props.disabled,
        'bg-bright-3 text-white': props.type === 'dark' && props.disabled,
        // outline
        'bg-white text-dark shadow-inner-1px-bright-3 hover:bg-bright-2 active:bg-bright-3':
          props.type === 'outline' && !props.disabled,
        'bg-white text-bright-4 shadow-inner-1px-bright-2': props.type === 'outline' && props.disabled,
        // destructive
        'bg-danger-3 text-white hover:bg-danger-4 active:shadow-inner-2px-danger-2 active:bg-danger-3':
          props.type === 'destructive' && !props.disabled,
        'bg-danger-2 text-white': props.type === 'destructive' && props.disabled,
        // subtle
        'bg-white text-dark hover:bg-bright-2 active:bg-bright-3': props.type === 'subtle' && !props.disabled,
        'bg-white text-bright-4': props.type === 'subtle' && props.disabled,
        // subtle-primary
        'bg-white text-primary hover:bg-primary-light-1 active:bg-primary-light-1':
          props.type === 'subtle-primary' && !props.disabled,
        'bg-white text-primary-light-2 ': props.type === 'subtle-primary' && props.disabled,
        // subtle-destructive
        'bg-white text-danger-3 hover:bg-danger-1 active:bg-danger-1':
          props.type === 'subtle-destructive' && !props.disabled,
        'bg-white text-danger-2 ': props.type === 'subtle-destructive' && props.disabled,
        // link
        'bg-white text-info-3 hover:underline active:bg-bright-1 active:underline':
          props.type === 'link' && !props.disabled,
        'bg-white text-info-2': props.type === 'link' && props.disabled,
        // link primary
        'bg-white text-primary hover:underline active:bg-bright-1 active:underline':
          props.type === 'link-primary' && !props.disabled,
        'bg-white text-primary-light-2': props.type === 'link-primary' && props.disabled,
        // link destructive
        'bg-white text-danger-3 hover:underline active:bg-bright-1 active:underline':
          props.type === 'link-destructive' && !props.disabled,
        'bg-white text-danger-2': props.type === 'link-destructive' && props.disabled,
      };
      const classDisabled = {
        'pointer-events-none': props.disabled,
      };
      return {
        ...classSize,
        ...classPadding,
        ...classBorderRadius,
        ...classTypeDefault,
        ...classDisabled,
      };
    });

    const textButtonDisplay = computed(() => {
      let text = 'Button';
      switch (props.type) {
        case 'subtle':
        case 'subtle-primary':
        case 'subtle-destructive':
          text = 'Label';
          break;
        case 'link':
        case 'link-primary':
        case 'link-destructive':
          text = 'Link';
          break;
        default:
          break;
      }

      if (props.textButton) {
        text = props.textButton;
      }
      return text;
    });
    const classTextButton = computed(() => {
      return ['link', 'link-primary', 'link-destructive'].indexOf(props.type) != -1 ? 'body-base' : 'body-base-smbold';
    });
    const classIcon = computed(() => {
      const isLink = ['link', 'link-primary', 'link-destructive'].indexOf(props.type) != -1;
      let marginRight = '';
      let marginLeft = '';
      let widthHeight = 'w-[20px] h-[20px]';
      if (props.icon != '') {
        marginRight = 'mr-[4px]';
        if (isLink) {
          marginRight = 'mr-[2px]';
        }
      }
      if (props.onlyIcon) {
        marginRight = '';
        widthHeight = 'w-[16px] h-[16px]';
      }
      if (props.disclosure) {
        marginRight = '';
        marginLeft = 'ml-[4px]';
      }
      return `${widthHeight} luniq-center ${marginRight} ${marginLeft}`;
    });
    return { classAtt, textButtonDisplay, classTextButton, classIcon };
  },
});
</script>

<style>
</style>