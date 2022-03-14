<template>
  <div class="sidebar flex flex-col fixed z-[1] inset-y-0 w-[64px] min993:w-[240px] bg-dark-5">
    <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200">
      <div class="absolute inset-y-0 h-[96px] py-[30px] px-[15px] min993:px-[20px] w-[100%]">
        <router-link to="/"> <p class="text-white">LOGO</p> </router-link>
      </div>
      <div class="sidebar__list-menu flex-1 flex flex-col mt-[96px]">
        <collapse-component
          v-for="(menu, index) in dataMenu"
          :key="index"
          :active="isActive(index)"
          selector-body=".body-menu"
          class="mb-[8px] relative"
          @onActive="onActive(index)"
        >
          <template #header>
            <tooltip-component
              position="right"
              type="dark"
              :content="menu.name"
              :class-custom="isMin993px ? 'tooltip-menu' : ''"
            >
              <div :class="classLi(index)">
                <router-link :to="menu.path || ''" class="flex items-center h-[36px] max992:luniq-center">
                  <icon-component :class="classIcon(index)" :name="menu.icon" :type="isActive(index) ? 'solid' : ''" />
                  <span :class="className(index)">{{ menu.name }}</span>
                  <icon-component
                    v-if="menu.children && menu.children.length"
                    name="caret-down"
                    class="text-white ml-auto mr-[16px] max992:hidden"
                  />
                </router-link>
              </div>
            </tooltip-component>
          </template>
          <template v-if="menu.children && menu.children.length > 0" #body>
            <div class="body-menu" :class="classChildren(index)">
              <router-link
                v-for="children in menu.children"
                :key="children"
                :to="children.path"
                :class="classLiChildren(children)"
              >
                <span :class="classNameChildren(children)">{{ children.name }}</span>
              </router-link>
            </div>
          </template>
        </collapse-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import CollapseComponent from '@/components/ui/CollapseComponent.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import IconComponent from '@/components/ui/IconComponent.vue';
import { dataMenu } from '@/constants/menu';
export default defineComponent({
  components: {
    CollapseComponent,
    TooltipComponent,
    IconComponent,
  },
  setup() {
    // declare variables
    const state = reactive({
      indexActive: 0,
      indexFirst: 0,
    });
    const route = useRoute();
    const router = useRouter();

    // begin mounted
    onBeforeMount(() => {
      checkMenuActive();
    });
    // end mounted

    // begin watch
    watch(
      () => route.path,
      () => {
        checkMenuActive();
      },
    );
    // end watch

    // begin computed
    const isMin993px = computed(() => {
      return window.innerWidth >= 993;
    });
    // end computed

    // begin methods
    const isActive = (index: any) => {
      return index == state.indexActive || index == state.indexFirst;
    };
    const onActive = (index: any) => {
      state.indexActive = index;
      let children = dataMenu[index].children || null;
      if (children && children.length > 0) {
        router.push(children[0].path);
      }
    };
    const checkMenuActive = () => {
      let rsIndex = 0;
      if (route.path != '/') {
        dataMenu.forEach((menu: any, index) => {
          if (menu.path && menu.path.indexOf(route.path) != -1) {
            rsIndex = index;
          }
          if (menu.children && menu.children.length > 0) {
            menu.children.forEach((children) => {
              if (children.path && children.path.indexOf(route.path) != -1) {
                rsIndex = index;
              }
            });
          }
        });
      }

      state.indexActive = rsIndex;
      state.indexFirst = rsIndex;
    };
    const classLi = (index: any) => {
      let menu = dataMenu[index];
      let type = 'default';

      if (isActive(index)) {
        type = 'active';
        if (menu.children && menu.children.length > 0) {
          type = 'active-has-children';
        }
      }

      return {
        'pl-[20px] text-bright-1 hover:bg-dark-4 active:shadow-inner-left-6px-primary max992:hover:bg-dark-4 max992:active:shadow-none max992:pl-[0px]':
          type === 'default',
        'pl-[20px] text-bright-1 bg-dark-4 shadow-inner-left-6px-primary max992:hover:bg-dark-4 max992:shadow-none max992:pl-[0px]':
          type === 'active',
        'pl-[20px] text-bright-1 shadow-inner-left-6px-primary max992:bg-dark-4 max992:shadow-none max992:pl-[0px]':
          type === 'active-has-children',
      };
    };
    const classIcon = (index: Number) => {
      let type = 'default';
      if (isActive(index)) {
        type = 'active';
      }
      return {
        'luniq-center w-[21px] h-[21px] active:text-primary': type === 'default',
        'luniq-center w-[21px] h-[21px] active:text-primary text-primary': type === 'active',
      };
    };
    const className = (index: Number) => {
      let type = 'default';
      if (isActive(index)) {
        type = 'active';
      }
      return {
        'body-base ml-[8px] block max992:hidden': type === 'default',
        'body-base-smbold ml-[8px] block max992:hidden': type === 'active',
      };
    };
    const classChildren = (index: Number) => {
      let type = 'default';
      if (isActive(index)) {
        type = 'default';
      }

      let obj = {};
      let style = `
        ml-[27px] pl-[14px] pr-[19px] mt-[6px] shadow-inner-left-1px-dark-2
        max992:bg-dark-4
      `;

      obj[style] = type === 'default';

      return obj;
    };
    const classLiChildren = (children: any) => {
      let type = 'default';

      if (children && route.path != '/' && children.path.indexOf(route.path) != -1) {
        type = 'active';
      }

      return {
        'text-white flex items-center mb-[6px] px-[8px] h-[36px] hover:bg-dark-4 active:bg-dark-4 rounded-[4px] max992:hover:bg-dark-3':
          type === 'default',
        'text-white flex items-center mb-[6px] px-[8px] h-[36px] bg-dark-4 rounded-[4px] max992:bg-dark-3':
          type === 'active',
      };
    };
    const classNameChildren = (children: any) => {
      let type = 'default';
      if (children && route.path != '/' && children.path.indexOf(route.path) != -1) {
        type = 'active';
      }

      return {
        'body-base': type === 'default',
        'body-base-smbold max992:body-base': type === 'active',
      };
    };
    // end methods

    return {
      dataMenu,
      state,
      isMin993px,
      isActive,
      onActive,
      classLi,
      classIcon,
      className,
      classChildren,
      classLiChildren,
      classNameChildren,
    };
  },
});
</script>

<style>
</style>