<template>
  <div ref="root">
    <Datepicker
      ref="datepicker"
      v-model="date"
      range
      two-calendars
      :clearable="false"
      :position="position"
      hide-offset-dates
      :month-change-on-scroll="false"
      :enable-time-picker="false"
      placeholder="Select"
      :class="{ 'is-show': isShow }"
      menu-class-name="dp-custom-wrapper daterangepicker"
      :format="format"
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
      <template #action-select>
        <div class="custom-select flex gap-[10px] mb-[16px] mr-[16px] justify-end">
          <button-component text-button="Cancel" @click="$refs.datepicker.closeMenu()" />
          <button-component text-button="Apply" type="primary" @click="$refs.datepicker.selectDate()" />
        </div>
      </template>
    </Datepicker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import moment from 'moment';
import Datepicker from 'vue3-date-time-picker';
import IconComponent from '@/components/ui/IconComponent.vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import 'vue3-date-time-picker/dist/main.css';

export default defineComponent({
  components: {
    Datepicker,
    IconComponent,
    ButtonComponent,
  },
  props: {
    dateValue: {
      type: Object,
      default: null,
    },
    position: {
      type: String,
      default: 'left',
    },
  },
  emits: ['onChange'],
  setup(props, { emit }) {
    const root: any = ref(null);
    const date = ref();
    const datepicker: any = ref(null);
    const isShow = ref(false);
    const formatString = 'YYYY/MM/DD';

    onMounted(() => {
      if (props.dateValue) {
        date.value = [props.dateValue.startDate, props.dateValue.endDate];
      }
    });

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
      let startDate = moment(date[0]).format(formatString);
      let endDate = moment(date[1]).format(formatString);
      emit('onChange', { startDate, endDate });
    };

    const format = (date: any) => {
      let startDate = moment(date[0]).format('MMM DD, YYYY');
      let endDate = moment(date[1]).format('MMM DD, YYYY');
      return startDate + ' - ' + endDate;
    };

    return {
      root,
      datepicker,
      date,
      isShow,
      onClickIcon,
      onOpenDatePicker,
      oncloseDatePicker,
      setDate,
      format,
    };
  },
});
</script>

<style>
</style>