<template>
  <div
    v-if="link"
    ref="selectButtonEl"
    v-scroll-outside="handleScroll"
    class="select-link cursor-pointer"
    :class="disabled ? 'text-bright-4 pointer-events-none' : 'text-dark'"
    @click="showSelectList"
    @scroll="handleScroll"
  >
    <div class="flex items-center">
      <template v-if="selected && !showTitleDefault">
        <template v-if="typeof selectedIcon == 'string'">
          <icon-component
            v-if="selectedIcon"
            class="mr-[8px]"
            :name="selectedIcon"
            :class="disabled ? 'text-bright-4' : 'text-dark'"
          />
        </template>
        <div v-else class="icon-selected mr-[8px]" :class="disabled ? 'text-bright-4' : 'text-dark'">
          <component :is="selectedIcon"></component>
        </div>
        <span class="truncate block underline">{{ selectedValue }}</span>
      </template>
      <template v-else>
        <icon-component
          v-if="selectedIconLabel"
          class="mr-[8px]"
          :name="selectedIconLabel"
          :class="disabled ? 'text-bright-4' : 'text-dark'"
        />
        <span class="block truncate underline">{{ titleDefault }}</span>
      </template>
      <icon-component name="caret-down" class="ml-1" :class="disabled ? 'text-bright-4' : 'text-dark'" />
    </div>
  </div>
  <button
    v-else
    v-bind="$attrs"
    ref="selectButtonEl"
    class="custom-select-component select__button"
    :class="{ 'pointer-events-none': disabled }"
  >
    <div
      class="
        selected
        text-14
        bg-white
        text-dark
        pl-[12px]
        pr-[4px]
        outline-none
        flex
        items-center
        justify-between
        rounded
        border border-bright-3
        py-[4.5px]
      "
      :class="classButton"
      @click="showSelectList"
    >
      <div class="flex items-center custom-select-component__selected">
        <template v-if="selected && !showTitleDefault">
          <template v-if="typeof selectedIcon == 'string'">
            <icon-component
              v-if="selectedIcon"
              class="mr-[8px]"
              :name="selectedIcon"
              :class="disabled ? 'text-bright-4' : 'text-dark'"
            />
          </template>
          <div v-else class="icon-selected mr-[8px]" :class="disabled ? 'text-bright-4' : 'text-dark'">
            <component :is="selectedIcon"></component>
          </div>
          <span class="truncate block">{{ selectedValue }}</span>
        </template>
        <template v-else>
          <icon-component
            v-if="selectedIconLabel"
            class="mr-[8px]"
            :name="selectedIconLabel"
            :class="disabled ? 'text-bright-4' : 'text-dark'"
          />
          <span class="block truncate">{{ titleDefault }}</span>
        </template>
      </div>
      <icon-component name="caret-down" :class="disabled ? 'text-bright-4' : 'text-dark'" />
    </div>
    <span v-if="error && errorText" class="text-14 text-error-3 mt-[4px] block">{{ errorText }}</span>
  </button>
  <teleport to="#select">
    <div
      v-if="open && !disabled"
      ref="selectListEl"
      v-click-outside-teleport="closeOption"
      class="list-items fixed z-[999] rounded shadow-rgba-01-01 bg-white text-14 font-body pb-[8px] pt-[8px]"
      :style="{
        right: selectListRight !== 'auto' ? `${selectListRight}px` : selectListRight,
        left: selectListLeft !== 'auto' ? `${selectListLeft}px` : selectListLeft,
        top: selectListTop !== 'auto' ? `${selectListTop}px` : selectListTop,
        bottom: selectListBottom !== 'auto' ? `${selectListBottom}px` : selectListBottom,
        minWidth: minWidth,
      }"
    >
      <div v-if="showSearch" class="option-search p-[8px] pt-0 flex items-center">
        <Input
          v-model="textSearch"
          class="flex-grow"
          :state="state"
          type="text"
          :is-search="true"
          :placeholder="placeholder"
          @click.stop.prevent="() => true"
        >
          <template #suffix>
            <icon-component
              v-show="textSearch"
              class="cursor-pointer text-dark"
              name="Times"
              @click="textSearch = ''"
            ></icon-component>
          </template>
        </Input>
        <slot name="addon"></slot>
      </div>
      <div
        class="px-[8px] scrollbar--transparent overflow-y-auto"
        :style="{ height: heightList, 'max-height': maxHeightList }"
        @scroll="handleScrollToBottom"
      >
        <template v-if="!searchQuery.length">
          <p class="px-[8px] text-14 text-dark">No data found</p>
        </template>
        <template v-else>
          <ul>
            <li
              v-for="(item, i) in searchQuery"
              :key="i"
              class="cursor-pointer py-[6px] px-[12px] rounded"
              :class="[
                { 'bg-bright-2': selected === item.props.value },
                item.props && item.props.disabled
                  ? 'text-bright-4 bg-transparent cursor-not-allowed'
                  : 'text-dark hover:bg-bright-2',
                styleSelected,
              ]"
              @click.stop.prevent="chooseValue(item)"
            >
              <span class="flex items-center w-full break-words text-14">
                <icon-component
                  v-if="item.props && item.props.icon"
                  class="item-icon mr-[8px]"
                  :name="item.props.icon"
                  :class="item.props.disabled ? 'text-bright-4' : 'text-dark'"
                />
                <div v-if="item.children && item.children.icon" class="mr-[8px] item-icon">
                  <component :is="item.children.icon"></component>
                </div>
                <div class="item-content truncate">
                  <component :is="item"></component>
                </div>
              </span>
              <icon-component
                v-if="selected === item.props.value && styleSelect == 'tick'"
                name="check"
                class="text-dark"
              ></icon-component>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, nextTick } from 'vue';
import IconComponent from '@/components/ui/IconComponent.vue';
import Input from '@/components/ui/InputComponent.vue';
import debounce from 'lodash/debounce.js';

export default defineComponent({
  name: 'SelectComponent',
  components: {
    IconComponent,
    Input,
  },
  props: {
    modelValue: null,
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectedIconLabel: {
      type: String,
      default: '',
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    styleSelect: {
      type: String,
      default: '',
    },
    maxHeightList: {
      type: String,
      default: 'unset',
    },
    heightList: {
      type: String,
      default: 'auto',
    },
    titleDefault: {
      type: String,
      default: 'Select',
    },
    placeholder: {
      type: String,
      default: 'Enter text',
    },
    loadMore: {
      type: Boolean,
      default: false,
    },
    showTitleDefault: {
      type: Boolean,
      default: false,
    },
    showTooltipSelectName: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      type: String,
      default: 'initial',
    },
    selectedLabel: {
      type: String,
      default: 'name',
    },
    link: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'isShow', 'update:modelValue', 'callData'],
  setup(props, { emit, slots }) {
    const open = ref<boolean>(false);
    // const selected = ref<any>(props.modelValue ? props.modelValue : null);
    const selected = computed({
      get(): any {
        return props.modelValue;
      },
      set(value: any) {
        emit('update:modelValue', value);
      },
    });
    const textSearch = ref('');
    const state = ref('default');
    const selectButtonEl = ref<HTMLElement>();
    const selectListEl = ref<HTMLElement>();
    const selectListRight = ref<number | string>('auto');
    const selectListLeft = ref<number | string>('auto');
    const selectListTop = ref<number | string>('auto');
    const selectListBottom = ref<number | string>('auto');
    const removeSelected = ref<boolean>(false);
    const selectedLabel = ref<string>('');

    /*  methos  */

    const closeOption = () => {
      open.value = false;
    };

    const classButton = computed(() => {
      return {
        'border-bright-5': open.value === true,
        'border-bright-3 bg-bright-1 text-bright-3  cursor-not-allowed': props.disabled === true,
        'hover:shadow-3px-bright-2 hover:border-bright-5': props.disabled === false,
      };
    });

    const isAccordionTab = (child: any) => {
      return child.type.name === 'SelectPanel';
    };

    const checkTypeSelect = (val: any) => {
      if (val.avatar().length > 0) {
        return true;
      } else return false;
    };

    const list = computed(() => {
      const list: object[] = [];
      (slots as any).default().forEach((child: any) => {
        if (isAccordionTab(child)) {
          list.push(child);
        } else if (child.children.length > 0) {
          child.children.forEach((nestedChild: any) => {
            if (isAccordionTab(nestedChild)) {
              list.push(nestedChild);
            }
          });
        }
      });
      return list;
    });

    const styleSelected = computed(() => {
      switch (props.styleSelect) {
        case 'tick':
          return 'flex items-center justify-center';
        default:
          return '';
      }
    });

    const selectedIcon = computed(() => {
      if (selected.value && props.selectedIconLabel) {
        const iconItem = (list as any).value.filter((value: any) => {
          if (typeof selected.value == 'string') {
            return value.props.value == selected.value;
          } else {
            return value.props.value == selected.value()[0].children;
          }
        });
        return iconItem[0].props && iconItem[0].props.icon ? iconItem[0].props.icon : iconItem[0].children.icon;
      } else {
        return '';
      }
    });

    const selectedValue: any = computed(() => {
      if (selected.value) {
        const value = (list as any).value.filter((value: any) => {
          return value.props.value == selected.value;
        });
        if (value.length < 1) return selectedLabel.value;
        // if (selected.value === ''){
        //     console.log(value[0]);
        //     return null;
        //     // return value[0].props ? value[0].children.default()[0].children : '';
        // } else {
        return value[0].props && value[0].props.value ? value[0].children.default()[0].children : '';
        // }
      } else return '';
    });

    const chooseValue = (val: any) => {
      if (
        val.props != null &&
        Object.prototype.hasOwnProperty.call(val.props, 'disabled') &&
        val.props.disabled === true
      ) {
        if (selected.value == null) selected.value = null;
      } else {
        selected.value = val.props.value;
        selectedLabel.value = val.props.selectedLabel;
        open.value = false;
        emit('change', val.children.default());
      }
    };

    const searchQuery = computed(() => {
      return (list as any).value.filter((item: any) => {
        if (props.loadMore) return true;
        const search = item.children.default()[0].children;
        const res = search.toLowerCase().includes(textSearch.value.toLowerCase());
        return res;
      });
    });

    const isMaxHeight = computed(() => {
      if (selectListEl.value) {
        const height = (selectListEl as any).value.clientHeight;
        if (height > props.maxHeightList) return true;
        else return false;
      } else return false;
    });

    const rangeBottomToScreenUpdate = computed(() => {
      if (selectButtonEl.value) {
        return selectButtonEl.value.getBoundingClientRect().bottom;
      }
      return 0;
    });

    const setPositionDropdown = () => {
      if (selectListEl.value && selectButtonEl.value) {
        const rangeBottomToScreen = window.innerHeight - selectButtonEl.value.getBoundingClientRect().bottom;
        selectListLeft.value = selectButtonEl.value.getBoundingClientRect().left;
        if (rangeBottomToScreen < selectListEl.value.getBoundingClientRect().height) {
          selectListTop.value = 'auto';
          selectListBottom.value = selectButtonEl.value.getBoundingClientRect().top;
        } else {
          selectListTop.value = selectButtonEl.value.getBoundingClientRect().bottom + 4;
          selectListBottom.value = 'auto';
        }
        selectListEl.value.style.width = `${selectButtonEl.value.getBoundingClientRect().width}px`;
      }
    };
    const showSelectList = async () => {
      open.value = !open.value;
      await nextTick();
      setPositionDropdown();
    };

    const removeValueSelect = () => {
      removeSelected.value = false;
      open.value = false;
      emit('update:modelValue', '');
    };

    const handleScrollToBottom = async (target: any) => {
      if (!props.loadMore) return;
      if (target.target.scrollTop + target.target.clientHeight >= target.target.scrollHeight) {
        emit('callData', { text: textSearch.value, push: true });
      }
    };

    const handleScroll = async () => {
      // await nextTick();
      console.log('scroll');
      // setPositionDropdown();
    };

    watch(
      () => open.value,
      (newVal: any) => {
        setTimeout(async () => {
          await nextTick();
          emit('isShow', newVal);
          textSearch.value = '';
        }, 0);
      },
    );

    watch(
      () => selectButtonEl.value,
      (newVal: any) => {
        console.log(44444444444444, newVal);
      },
    );

    watch(
      () => rangeBottomToScreenUpdate.value,
      (newVal: any, old) => {
        console.log(2222222222222, newVal, old);
      },
    );

    watch(
      textSearch,
      debounce((newVal: any) => {
        emit('callData', { text: newVal, push: false });
      }, 2000),
    );

    watch(
      () => selectedValue.value,
      (newVal: any) => {
        if (newVal) removeSelected.value = true;
      },
    );

    return {
      handleScroll,
      open,
      closeOption,
      classButton,
      list,
      selected,
      chooseValue,
      textSearch,
      searchQuery,
      checkTypeSelect,
      state,
      selectListEl,
      selectButtonEl,
      isMaxHeight,
      selectedIcon,
      styleSelected,
      selectedValue,
      selectListRight,
      selectListLeft,
      selectListTop,
      selectListBottom,
      showSelectList,
      removeValueSelect,
      removeSelected,
      handleScrollToBottom,
    };
  },
});
</script>

<style lang="scss">
.select__button {
  max-width: unset;
}
.custom-select-component {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;

  .list-items {
    .item {
      cursor: pointer;
      user-select: none;
      outline: none;

      > span {
        word-break: break-word;
        width: 100%;
      }
    }
    .checkbox-item {
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
