<template>
  <div class="block max-h-screen h-auto overflow-y-auto">
    <div class="flex mb-5">
      <select v-model="type">
        <option value="default">Default</option>
        <option value="disable">Disabled</option>
      </select>
    </div>
    <div class="grid grid-flow-col grid-cols-3 h-[200vh]">
      <div class="border-r-2 p-12p text-center">
        <label class="block text-md font-semibold text-gray-700 mb-4p">No Icon {{ valueSelect }}</label>
        <Select
          v-model="valueSelect"
          :error="type == 'error'"
          :disabled="type == 'disable'"
          :show-search="true"
          max-height-list="260px"
          :error-text="type == 'error' ? 'This is error message' : ''"
        >
          <SelectPanel v-for="(index, i) in optionSelect" :key="i" :value="index.id">
            {{ index.name }}
          </SelectPanel>
        </Select>
      </div>
      <div class="border-r-2 p-12p text-center">
        <label class="block text-md font-semibold text-gray-700 mb-4p">Icon</label>
        <Select
          v-model="valueSelectIcon"
          :error="type == 'error'"
          :disabled="type == 'disable'"
          show-search
          selected-icon-label="globe"
          :error-text="type == 'error' ? 'This is error message' : ''"
        >
          <SelectPanel v-for="(index, i) in optionSelectIcon" :key="i" :value="index.value" :disabled="index.disabled">
            <template #icon>
              <icon-component
                class="arrow"
                :color="index.disabled ? 'neutrals-300' : 'neutrals-900'"
                :name="index.icon"
              />
            </template>
            {{ index.label }}
          </SelectPanel>
        </Select>
      </div>
      <div>
        <label class="block text-md font-semibold text-gray-700 mb-4p">Link</label>
        <Select
          v-model="valueSelect"
          :error="type == 'error'"
          :disabled="type == 'disable'"
          :show-search="true"
          max-height-list="260px"
          :link="true"
          :error-text="type == 'error' ? 'This is error message' : ''"
        >
          <SelectPanel v-for="(index, i) in optionSelect" :key="i" :value="index.id">
            {{ index.name }}
          </SelectPanel>
        </Select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import Select from '@/components/ui/SelectComponent.vue';
import SelectPanel from '@/components/ui/SelectPanel.vue';
import IconComponent from '@/components/ui/IconComponent.vue';

export default defineComponent({
  name: 'DSSelect',
  components: {
    Select,
    SelectPanel,
    IconComponent,
  },
  setup() {
    const valueSelectTest = ref<any>('12');
    const optionSelect1 = reactive<any>([
      { label: 'Hintonburg', value: '12' },
      { label: 'Westboro', value: '22' },
      { label: 'Downtown', value: '32' },
      { label: 'Richmond Hill', value: '123' },
    ]);

    const selectedValue = computed(() => {
      if (valueSelectTest.value) {
        const value = optionSelect1.filter((value: any) => {
          return value.value == valueSelectTest.value;
        });
        return value[0].label;
      } else return '';
    });

    return {
      selectedValue,
      optionSelect1,
      valueSelectTest,
    };
  },
  data() {
    return {
      valueSelect: '',
      valueSelectIcon: '',
      // valueSelectTest: '12',
      valueSelectMultiple: ['12', '22'],
      optionSelect: [
        { name: 'Hintonburg', id: '1' },
        { name: 'Westboro', id: '2' },
        { name: 'Downtown', id: '3' },
        { name: 'Richmond Hill', id: '4' },
        { name: 'Hintonburg', id: '5' },
        { name: 'Westboro', id: '6' },
        { name: 'Downtown', id: '7' },
        { name: 'Richmond Hill', id: '8' },
        { name: 'Richmond Hill', id: '9' },
        { name: 'Richmond Hill', id: '10' },
      ],
      optionSelectIcon: [
        { label: 'Hintonburg', value: '12', icon: 'Star', disabled: true },
        { label: 'Westboro', value: '22', icon: 'Plus', disabled: false },
        { label: 'Downtown', value: '32', icon: 'Star' },
      ],
      type: 'default',
      isError: false,
      imageAssign: '',
    };
  },
  methods: {},
});
</script>

<style scoped lang="scss">
select {
  margin: 0 auto;
}
.custom-select-component,
.custom-select-multiple-component {
  max-width: 200px;
}
</style>