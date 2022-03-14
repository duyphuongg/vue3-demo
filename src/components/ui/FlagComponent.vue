<template>
  <tooltip-component v-if="showTooltip" position="top" :content="countryName">
    <span :class="['iti__flag inline-block', `iti__${code.toLowerCase()}`]"></span>
  </tooltip-component>
  <span v-else :class="['iti__flag inline-block', `iti__${code}`]"></span>
</template>

<script>
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import allCountries from '@/constants/countries';
import { computed } from 'vue';

export default {
  name: 'CountryFlag',
  components: { TooltipComponent },
  props: {
    code: {
      type: String,
      default: '',
    },
    showTooltip: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const country = computed(() => {
      return allCountries.filter((item) => {
        return item.iso2 == props.code.toLowerCase();
      });
    });

    const countryName = computed(() => {
      return country.value[0]?.name ?? '';
    });

    return { countryName };
  },
};
</script>