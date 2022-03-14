<template>
  <div class="text-left">
    <label v-if="label" for="type" class="block text-sm font-semibold mb-1">{{ label }}</label>
    <div class="group-tag mb-12p">
      <button
        v-click-outside="closeOption"
        class="dropdown-search-component relative inline-block text-left focus:outline-none"
      >
        <!-- Template about UI button -->
        <div :class="{ disabled: disabled }">
          <!-- Normal Dropdown -->
          <template v-if="type == 'normal'">
            <div
              :class="open ? 'border-primary' : ''"
              class="
                group-focus:border-primary
                hover:border-primary hover:shadow-3px-primary-light-1
                label
                bg-white
                h-8
                text-neutrals-900
                pl-12p
                pr-4p
                outline-none
                flex
                items-center
                justify-between
                rounded
                border border-neutrals-200
                transition
              "
              @click="open = !open"
            >
              <div class="flex items-center ml-2 text-drak text-sm">
                <icon-component v-if="hasIcon" class="mr-1" name="arrow-circle-down" />
                {{ valueSelect?.label ? valueSelect.label : 'Select' }}
              </div>
              <icon-component name="angle-down" class="mr-3" />
            </div>
          </template>
          <!-- Dropdown typee button -->
          <template v-else>
            <ButtonComponent type="primary" size="large" :disabled="disabled" :icon="false" @click="open = !open" />
          </template>
        </div>
        <!-- Template about List show item -->
        <div
          v-if="!disabled"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          class="absolute content-dropdown z-20"
        >
          <div
            v-if="open"
            class="
              list
              p-8p
              dropdown-list
              w-full
              origin-top-right
              rounded-md
              shadow-lg
              bg-white
              ring-1 ring-black ring-opacity-5
              focus:outline-none
            "
            role="none"
          >
            <div v-if="showSearch" class="option-search m-2 sticky top-2">
              <Input
                v-model="textSearch"
                :state="'default'"
                type="text"
                :is-search="true"
                :placeholder="'Enter keyword'"
                @keyup="handleSearch"
              />
            </div>
            <div class="option-item">
              <template v-if="typePanel != 'sub-menu'">
                <a
                  v-for="(option, i) of options"
                  :key="i"
                  :href="option.link"
                  class="
                    flex
                    items-center
                    outline-none
                    item
                    pl-5
                    h-8
                    text-14
                    hover:bg-bright-1
                    active:bg-primary-light-1
                  "
                  role="menuitem"
                  @click="handleGetValue(option)"
                >
                  <icon-component v-if="typePanel" :name="typePanel" class="mr-2" />
                  {{ option.label }}
                </a>
              </template>

              <template v-else>
                <a
                  v-for="(option, i) of options"
                  :key="i"
                  :href="option.link"
                  class="
                    flex
                    items-center
                    outline-none
                    item
                    pl-5
                    h-8
                    text-14
                    hover:bg-bright-1
                    active:bg-primary-light-1
                    last-of-type:mb-2
                  "
                  role="menuitem"
                >
                  <SubMenu ref="subItem" position="right" show-by-click class-custom="w-full">
                    <div class="flex justify-between w-full">
                      <p class="mb-0">
                        {{ option.label }}
                      </p>
                      <icon-component name="chevron-right" class="mr-4 mt-[5px]" />
                    </div>
                    <template #content>
                      <div
                        v-if="option.children"
                        class="
                          list
                          p-8p
                          dropdown-list
                          origin-top-right
                          w-[160px]
                          rounded
                          border-2
                          boxShadow-inner-2px-bright-2
                          bg-white
                          focus:outline-none
                          overflow-y-auto
                          z-50
                        "
                      >
                        <a
                          v-for="(optChild, idx) of option.children"
                          :key="(i = idx)"
                          :href="optChild.link"
                          class="
                            flex
                            items-center
                            outline-none
                            item
                            pl-5
                            h-8
                            text-14
                            hover:bg-bright-1
                            active:bg-primary-light-1
                            first-of-type:mt-2
                            last-of-type:mb-2
                          "
                          role="menuitem"
                          @click="hanldeGetValueChild(optChild)"
                        >{{ optChild.label }}</a>
                      </div>
                    </template>
                  </SubMenu>
                </a>
              </template>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from './IconComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
import Input from './InputComponent.vue';
import SubMenu from './SubMenuComponent.vue';
export default defineComponent({
  components: { IconComponent, ButtonComponent, Input, SubMenu },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'normal',
    },
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    typePanel: {
      type: String,
      default: 'checkbox',
    },
  },
  emits: ['change', 'search'],
  setup() {},
  data() {
    return {
      open: false,
      valueSelect: {},
      textSearch: '',
      selectedID: 1,
    };
  },
  computed: {
    searchQuery() {
      return false;
    },
  },
  methods: {
    closeOption() {
      this.open = false;
    },

    // value - selected option.
    handleGetValue(option: any) {
      this.valueSelect = option;
      this.open = false;
      this.$emit('change', this.valueSelect);
    },
    handleSearch() {
      this.$emit('search', this.textSearch.toUpperCase());
    },
    hanldeGetValueChild(option: any) {
      this.valueSelect = option;
      this.open = false;
      this.$emit('change', this.valueSelect);
    },
  },
});
</script>
<style lang="scss">
.dropdown-search-component {
  min-width: 180px;
  width: 100%;
  max-width: 200px;
  .disabled {
    .label {
      border-color: #e9e9ec;
      background-color: #f6f6f8;
      color: #9b9ba8;
      cursor: not-allowed;
      &:hover {
        box-shadow: none;
      }
    }
  }
  .content-dropdown {
    width: 100%;
    top: 45px;
  }
  .dropdown-list {
    overflow: hidden;
  }
  .option-item {
    max-height: 160px;
    overflow-y: auto;
    scrollbar-color: #e9e9ec #f6f6f8;
    &::-webkit-scrollbar {
      width: 16px;
    }

    &::-webkit-scrollbar-track {
      background: #f6f6f8;
      padding: 0 30px;
      width: 16px;
    }

    &::-webkit-scrollbar-thumb {
      background: #e9e9ec;
      border-radius: 8px;
      border: 4px solid #f6f6f8;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #b4b4be;
    }
  }
}
</style>
