<template>
  <div ref="root">
    <Datepicker
      ref="datepicker"
      v-model="date"
      range
      two-calendars
      menu-class-name="dp-custom-wrapper daterangepicker multi-select"
      :position="position"
      hide-offset-dates
      :month-change-on-scroll="false"
      :class="{ 'is-show': isShow }"
      :clearable="false"
      :enable-time-picker="false"
      :format="format"
      @open="onOpenDatePicker"
      @closed="oncloseDatePicker"
    >
      <template #input-icon>
        <icon-component class="text-dark" name="calendar-alt" @click="onClickIcon" />
      </template>
      <template #arrow-left>
        <icon-component class="text-dark-1" name="arrow-left" />
      </template>
      <template #arrow-right>
        <icon-component class="text-dark-1" name="arrow-right" />
      </template>
      <template #action-select>
        <div class="custom-select flex gap-[10px] mb-[16px] mr-[16px] justify-end">
          <button-component text-button="Cancel" @click="onClickBtnCancel" />
          <button-component text-button="Apply" type="primary" @click="onClickBtnSelect" />
        </div>
      </template>
      <template #day="{ day }">
        <span v-if="day" @click="onClickDay">{{ day }}</span>
      </template>
    </Datepicker>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import IconComponent from '@/components/ui/IconComponent.vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import moment from 'moment';
import helper from '@/utils/helper';
export default defineComponent({
  components: {
    Datepicker,
    IconComponent,
    ButtonComponent,
  },
  props: {
    dateValue: {
      type: Object,
      default: () => {
        return {
          allTime: 1,
          exclude7days: 0,
          startDate: '',
          endDate: '',
        };
      },
    },
    position: {
      type: String,
      default: 'left',
    },
  },
  emits: ['onChange'],
  setup(props, { emit }) {
    //ref
    const root: any = ref(null);
    const date = ref();
    const dateCurrent = ref();
    const dateOld = ref();
    const datepicker: any = ref(null);
    const isShow = ref(false);
    const typeRange = ref('');
    const typeRangeOld = ref('');
    const isClickSelectDate = ref();

    //data
    const listRange = [
      { id: 'all-time', name: 'All time' },
      { id: 'exclude-7-days', name: 'Exclude last 7 days' },
      { id: 'last-30-days', name: 'Last 30 days' },
      { id: 'last-90-days', name: 'Last 90 days' },
    ];
    const formatDisplay = 'MMM DD, YYYY';
    const formatDate = 'YYYY/MM/DD';

    onMounted(() => {
      dateOld.value = props.dateValue;
      checkRangeActive(props.dateValue);
      setValueDisplay(props.dateValue);
    });

    const onClickIcon = () => {
      datepicker.value.openMenu();
    };

    const format = (date: any) => {
      let startDate = moment(date[0]).format(formatDisplay);
      let endDate = moment(date[1]).format(formatDisplay);
      return startDate + ' - ' + endDate;
    };

    const onOpenDatePicker = () => {
      isShow.value = true;
      initRangeSelect();
    };

    const oncloseDatePicker = () => {
      isShow.value = false;
      if (!isClickSelectDate.value) {
        resetDate();
      }
      isClickSelectDate.value = false;
    };

    const checkRangeActive = (dateDate: any) => {
      let type = '';
      let { allTime, exclude7days, startDate, endDate } = dateDate;

      if (allTime || exclude7days) {
        type = allTime ? 'all-time' : 'exclude-7-days';
      } else {
        let start = moment(startDate, formatDate);
        let end = moment(endDate, formatDate);
        switch (helper.rangeBetweenDays(start, end)) {
          case 30:
            type = 'last-30-days';
            break;
          case 90:
            type = 'last-90-days';
            break;
          default:
            break;
        }
      }
      typeRange.value = type;
      typeRangeOld.value = type;
    };

    const setValueDisplay = (dataDate: any) => {
      let { allTime, exclude7days, startDate, endDate } = dataDate;
      if (allTime == 1 || exclude7days == 1) {
        date.value = [];
        const eleInputSpan: any = root.value.querySelector('.dp__input_wrap .text-daterangepicker');
        const eleInput: any = root.value.querySelector('.dp__input_wrap');
        if (eleInputSpan) eleInputSpan.remove();
        let textInput = getNameRange(typeRange.value);
        eleInput.insertAdjacentHTML('afterbegin', `<span class="text-daterangepicker">${textInput}</span>`);
        let elTextInput: any = root.value.querySelector('.dp__input_wrap .text-daterangepicker');

        if (elTextInput) {
          elTextInput.addEventListener('click', () => {
            onClickIcon();
          });
        }
      } else {
        const eleInputSpan: any = root.value.querySelector('.dp__input_wrap .text-daterangepicker');
        if (eleInputSpan) eleInputSpan.remove();
        date.value = [startDate, endDate];
      }

      dateCurrent.value = dataDate;
    };

    const initRangeSelect = () => {
      setTimeout(() => {
        let eleDP: any = document.querySelector('.dp-custom-wrapper .dp__calendar_wrapper');
        let htmlLi = '';
        listRange.forEach((item) => {
          let classActive = item.id === typeRange.value ? 'class="active"' : '';
          htmlLi += `<li data-range="${item.id}" ${classActive}>${item.name}</li>`;
        });
        eleDP.insertAdjacentHTML('afterbegin', `<div class="ranges"><ul>${htmlLi}</ul></div>`);

        let eleRangeSelect = Array.from(
          document.querySelectorAll('.dp-custom-wrapper .dp__calendar_wrapper .ranges ul li'),
        );

        eleRangeSelect.forEach((item) => {
          item.addEventListener('click', (event: any) => {
            const target = event.target;
            if (target) {
              removeClassSiblings(eleRangeSelect);
              target.setAttribute('class', 'active');
              const range = target.getAttribute('data-range');
              onClickRangeSelect(range);
            }
          });
        });
      });
    };

    const removeClassSiblings = (element: any) => {
      element.forEach((item: any) => {
        item.classList.remove('active');
      });
    };

    const onClickRangeSelect = (range: any) => {
      let startDate: any = '';
      let endDate: any = '';
      switch (range) {
        case 'all-time':
        case 'exclude-7-days':
          break;
        case 'last-30-days': {
          startDate = moment().subtract(29, 'days').format(formatDate);
          endDate = moment().format(formatDate);
          break;
        }

        case 'last-90-days': {
          startDate = moment().subtract(89, 'days').format(formatDate);
          endDate = moment().format(formatDate);
          break;
        }

        default:
          break;
      }

      typeRange.value = range;
      let data = {
        allTime: range === 'all-time' ? 1 : 0,
        exclude7days: range === 'exclude-7-days' ? 1 : 0,
        startDate,
        endDate,
      };

      setValueDisplay(data);
    };

    const getNameRange = (id: any) => {
      let index = listRange.findIndex((range) => range.id == id);
      return listRange[index].name;
    };

    const onClickBtnCancel = () => {
      resetDate();
      datepicker.value.closeMenu();
    };

    const onClickBtnSelect = () => {
      isClickSelectDate.value = true;
      if (typeRange.value != '') {
        dateOld.value = dateCurrent.value;
        typeRangeOld.value = typeRange.value;
      } else {
        setDateNotSelectRange();
      }

      emit('onChange', dateCurrent.value);
      datepicker.value.closeMenu();
    };

    const resetDate = () => {
      typeRange.value = typeRangeOld.value;
      setValueDisplay(dateOld.value);
    };

    const onClickDay = () => {
      typeRange.value = '';
      let eleRangeActive: any = document.querySelector('.dp-custom-wrapper .dp__calendar_wrapper .ranges ul li.active');
      if (eleRangeActive) eleRangeActive.classList.remove('active');
    };

    const setDateNotSelectRange = () => {
      const eleInputSpan: any = root.value.querySelector('.dp__input_wrap .text-daterangepicker');
      if (eleInputSpan) eleInputSpan.remove();
      datepicker.value.selectDate();
      let data: any = {
        allTime: 0,
        exclude7days: 0,
        startDate: moment(date.value[0]).format(formatDate),
        endDate: moment(date.value[1]).format(formatDate),
      };

      dateCurrent.value = data;
      dateOld.value = data;
      typeRangeOld.value = typeRange.value;
    };

    return {
      //refs
      root,
      date,
      dateCurrent,
      dateOld,
      datepicker,
      isShow,
      listRange,

      //methods
      onClickIcon,
      format,
      onOpenDatePicker,
      oncloseDatePicker,
      onClickBtnCancel,
      onClickBtnSelect,
      onClickDay,
    };
  },
});
</script>

<style>
</style>