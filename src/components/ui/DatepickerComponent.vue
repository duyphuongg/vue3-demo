<template>
  <div ref="root">
    <Datepicker
      ref="datepicker"
      v-model="date"
      :clearable="false"
      hide-offset-dates
      auto-apply
      :month-change-on-scroll="false"
      :enable-time-picker="false"
      placeholder="Select"
      :class="{ 'is-show': isShow }"
      menu-class-name="dp-custom-wrapper"
      :format="format"
      :position="position"
      @open="onOpenDatePicker"
      @closed="oncloseDatePicker"
      @update:modelValue="setDate"
    >
      <template #arrow-left>
        <icon-component class="text-dark-1" name="arrow-left" />
      </template>
      <template #input-icon>
        <icon-component class="text-dark" name="calendar-alt" @click="onClickIcon" />
      </template>
      <template #arrow-right>
        <icon-component class="text-dark-1" name="arrow-right" />
      </template>
    </Datepicker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import moment from 'moment';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
import IconComponent from '@/components/ui/IconComponent.vue';
export default defineComponent({
  components: {
    Datepicker,
    IconComponent,
  },
  props: {
    dateValue: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'left',
    },
  },
  emits: ['onChange'],
  setup(props, { emit }) {
    const root: any = ref(null);
    const datepicker: any = ref(null);
    const date = ref();
    const isShow = ref(false);
    const formatString = 'YYYY/MM/DD';

    onMounted(() => {
      if (props.dateValue) {
        date.value = props.dateValue;
      }
    });

    const format = (date: any) => {
      let dataFormatted = moment(date).format('MMM DD, YYYY');
      return dataFormatted;
    };

    const onClickIcon = () => {
      datepicker.value.openMenu();
    };

    const onOpenDatePicker = () => {
      isShow.value = true;
    };

    const oncloseDatePicker = () => {
      isShow.value = false;
    };

    const setDate = (date: any) => {
      let dataFormatted = moment(date).format(formatString);
      emit('onChange', dataFormatted);
    };

    return {
      root,
      datepicker,
      date,
      isShow,
      format,
      onClickIcon,
      onOpenDatePicker,
      oncloseDatePicker,
      setDate,
    };
  },
});
</script>

<style lang="scss">
</style>