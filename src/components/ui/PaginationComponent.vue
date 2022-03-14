<template>
  <div class="flex aligns">
    <button-group type="default">
      <button-comp
        :disabled="current === 1"
        size="large"
        icon="chevron-left"
        :only-icon="true"
        @click="onPressedPage(current - 1, current === 1)"
      ></button-comp>

      <button-comp
        :class="[]"
        size="large"
        :type="current === 1 ? activeBtnType : unActiveBtnType"
        text-button="1"
        @click="onPressedPage(1)"
      >
      </button-comp>

      <template v-if="current > 2">
        <button-comp v-if="current !== 3" size="large" type="subtle" text-button="..."></button-comp>
        <button-comp
          v-if="current === totalVal && totalVal > 3"
          size="large"
          :type="unActiveBtnType"
          :text-button="current - 2 + ''"
          @click="onPressedPage(current - 2)"
        >
        </button-comp>
        <button-comp
          size="large"
          :type="unActiveBtnType"
          :text-button="current - 1 + ''"
          @click="onPressedPage(current - 1)"
        >
        </button-comp>
      </template>

      <button-comp
        v-if="current != 1 && current !== totalVal"
        size="large"
        :type="activeBtnType"
        :text-button="current + ''"
      >
      </button-comp>

      <template v-if="current < totalVal - 1">
        <button-comp
          size="large"
          :type="unActiveBtnType"
          :text-button="current + 1 + ''"
          @click="onPressedPage(current + 1)"
        >
        </button-comp>
        <button-comp v-if="current !== totalVal - 2" size="large" type="subtle" text-button="..."></button-comp>
      </template>

      <button-comp
        size="large"
        :type="current === totalVal ? activeBtnType : unActiveBtnType"
        :text-button="totalVal + ''"
        @click="onPressedPage(totalVal)"
      >
      </button-comp>
      <button-comp
        :disabled="current === totalVal"
        size="large"
        icon="chevron-right"
        :only-icon="true"
        @click="onPressedPage(current + 1, current === totalVal)"
      >
      </button-comp>
    </button-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ButtonGroup from '@/components/ui/ButtonGroupComponent.vue';
import ButtonComp from '@/components/ui/ButtonComponent.vue';

export default defineComponent({
  name: 'Pagination',
  components: {
    ButtonGroup,
    ButtonComp,
  },
  props: {
    total: {
      type: Number,
      default: 99,
    },
    defaultCurrent: {
      type: Number || String,
      default: 8,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: 'link',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    // const activeBtnClass = 'text-primary-700 underline border-none focus:border-none';

    // const unActiveBtnClass = 'border-none focus:border-none ';
    const activeBtnType = 'dark';
    const unActiveBtnType = 'subtle';

    const totalVal = ref(props.total);

    const current = ref(props.modelValue ? props.modelValue : props.defaultCurrent);

    const onPressedPage = (num: number, isDisabled?: boolean) => {
      if (isDisabled) {
        return;
      }
      if (current.value !== num) current.value = num;
      emit('update:modelValue', current.value);
      emit('change', { current: current.value, total: props.total });
    };

    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== current.value) {
          current.value = newVal;
        }
      },
    );

    watch(
      () => props.total,
      (newval) => {
        totalVal.value = newval;
      },
    );

    return {
      activeBtnType,
      unActiveBtnType,
      current,
      onPressedPage,
      totalVal,
    };
  },
});
</script>
