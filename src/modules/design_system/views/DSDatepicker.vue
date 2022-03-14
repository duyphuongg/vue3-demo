<template>
  <div class="ds-datepicker pb-5">
    <div class="flex mt-[5px]">
      <div class="text-center flex border-[1px] border-gray-300 rounded-[4px] p-[8px]">
        <div v-for="item in listTypeCalendar" :key="item" class="mx-4 text-center select-type">
          <label for="Icon" class="block text-sm font-semibold text-gray-700 mb-[4px]">{{ item.name }}</label>
          <input v-model="typeCalendar" class="mt-[11px]" type="radio" :value="item.id" />
        </div>
      </div>
      <div class="text-center flex border-[1px] border-gray-300 rounded-[4px] p-[8px] ml-[30px]">
        <div v-for="item in listPosition" :key="item" class="mx-4 text-center select-type">
          <label for="Icon" class="block text-sm font-semibold text-gray-700 mb-[4px]">{{ item.name }}</label>
          <input v-model="currentPosition" class="mt-[11px]" type="radio" :value="item.id" />
        </div>
      </div>
    </div>
    <div :key="currentPosition" class="preview-component my-[20px] min-h-[50px] flex items-center">
      <datepicker-component v-if="typeCalendar === 'single'" :position="currentPosition" @onChange="onChangeDate" />
      <daterangepicker-component v-if="typeCalendar === 'range'" :position="currentPosition" @onChange="onChangeDate" />
      <daterange-multi-component
        v-if="typeCalendar === 'range-multi'"
        :position="currentPosition"
        @onChange="onChangeDate"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div class="document-component" v-html="htmlComponent" />
    <!--eslint-enable-->
    <div class="import-compoment mt-4">
      <h3>Import</h3>
      <p v-if="typeCalendar === 'single'">import DatepickerComponent from '@/components/ui/DatepickerComponent.vue';</p>
      <p v-if="typeCalendar === 'range'">
        import DaterangepickerComponent from '@/components/ui/DaterangepickerComponent.vue';
      </p>
      <p v-if="typeCalendar === 'range-multi'">
        import DaterangeMultiComponent from '@/components/ui/DaterangeMultiComponent.vue';
      </p>
    </div>
    <div class="props-compoment mt-4">
      <h3>Props</h3>
      <p class="my-[10px]">position:String -------- left | center | right</p>
      <template v-if="typeCalendar === 'single'">
        <p>date-value:String -- Format:"YYYY/MM/DD"</p>
        <p>ex: date-value="2021/12/12"</p>
      </template>
      <template v-if="typeCalendar === 'range'">
        <p>date-value:Object</p>
        <p>{ startDate: "2021/12/12", endDate: "2021/12/12" }</p>
      </template>
      <template v-if="typeCalendar === 'range-multi'">
        <p>date-value:Object</p>
        <pre>
  { 
    allTime: 0, 
    exclude7days: 0, 
    startDate: "", 
    endDate: "" 
  }
        </pre>
      </template>
    </div>
    <div class="methods-compoment mt-4">
      <h3>Event</h3>
      <p>@onChange</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import DatepickerComponent from '@/components/ui/DatepickerComponent.vue';
import DaterangepickerComponent from '@/components/ui/DaterangepickerComponent.vue';
import DaterangeMultiComponent from '@/components/ui/DaterangeMultiComponent.vue';
export default defineComponent({
  components: {
    DatepickerComponent,
    DaterangepickerComponent,
    DaterangeMultiComponent,
  },
  setup: () => {
    const typeCalendar = ref('range-multi');
    const currentPosition = ref('center');
    const htmlComponent = computed(() => {
      let tag = `<div class="tag">&#60;datepicker-component /></div>`;
      if (typeCalendar.value === 'range') {
        tag = `<div class="tag">&#60;daterangepicker-component /></div>`;
      }
      if (typeCalendar.value === 'range-multi') {
        tag = `<div class="tag">&#60;daterange-multi-component /></div>`;
      }

      return `<div class="preview-code">
                ${tag}
              </div>`;
    });

    const onChangeDate = (data: any) => {
      console.log(3333, data);
    };

    const listTypeCalendar = ref([
      { id: 'single', name: 'Single' },
      { id: 'range', name: 'Range' },
      { id: 'range-multi', name: 'Multi Range' },
    ]);

    const listPosition = ref([
      { id: 'left', name: 'Left' },
      { id: 'center', name: 'Center' },
      { id: 'right', name: 'Right' },
    ]);

    return {
      typeCalendar,
      currentPosition,
      htmlComponent,
      listTypeCalendar,
      listPosition,
      onChangeDate,
    };
  },
});
</script>

<style lang="scss">
.ds-datepicker {
  .preview-code {
    width: max-content;
    background-color: #ddd;
    border-radius: 4px;
    padding: 10px 20px;
    min-width: 315px;
    ul {
      li {
        padding: 0px 30px;
      }
    }
  }

  select {
    border-radius: 4px;
    padding: 5px 3px;
    outline: none;
  }

  .select-type {
    input {
      cursor: pointer;
    }
  }
}
</style>