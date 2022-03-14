<template>
  <div>
    <!-- Static sidebar for desktop -->
    <div class="md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <h1 class="text-2xl font-semibold text-gray-900">
              {{ $t('design_system.title') }}
            </h1>
          </div>
          <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
            <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
            <router-link
              v-for="item in compList"
              :key="item.path"
              :to="`/design-system/${item.path}`"
              :class="item.name === route.name ? sidebarItemClass.active : sidebarItemClass.inactive"
            >
              <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
              <!-- Heroicon name: outline/home -->
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
              <div class="border-4 border-dashed border-gray-200 rounded-lg min-h-full px-5 py-5">
                <router-view />
              </div>
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DSLayouts',
  setup() {
    const route = useRoute();
    const compList = ref([
      {
        name: 'i18n',
        path: 'i18n',
      },
      {
        name: 'Button',
        path: 'button',
      },
      {
        name: 'Toast',
        path: 'toast',
      },
      {
        name: 'Tooltip',
        path: 'tooltip',
      },
      {
        name: 'Input',
        path: 'input',
      },
      {
        name: 'Datepicker',
        path: 'datepicker',
      },
      {
        name: 'Checkbox',
        path: 'checkbox',
      },
      {
        name: 'Tabs',
        path: 'tabs',
      },
      {
        name: 'Radio',
        path: 'radio',
      },
      {
        name: 'Textarea',
        path: 'textarea',
      },
      {
        name: 'Toggle',
        path: 'toggle',
      },
      {
        name: 'Dropdown ',
        path: 'dropdown-search',
      },
      {
        name: 'Alert',
        path: 'alert',
      },
      {
        name: 'ColorPicker',
        path: 'color-picker',
      },
      {
        name: 'StarRating',
        path: 'star-rating',
      },
      {
        name: 'Modal',
        path: 'modal',
      },
      {
        name: 'Pagination',
        path: 'pagination',
      },
      {
        name: 'Select',
        path: 'select',
      },
      {
        name: 'Badge',
        path: 'badge',
      },
      {
        name: 'Select Multi',
        path: 'select-multi',
      },
      {
        name: 'flag',
        path: 'flag',
      },
      {
        name: 'ImageLightBox',
        path: 'image-lightbox',
      },
    ]);
    const sidebarItemClass = ref({
      active: 'bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md',
      inactive:
        'text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md',
    });
    compList.value.sort(function (a, b) {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return {
      compList,
      route,
      sidebarItemClass,
    };
  },
});
</script>