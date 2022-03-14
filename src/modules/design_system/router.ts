export default [
  {
    path: '/design-system',
    component: () => import(/* webpackChunkName: "DesignSystem" */ '@/layouts/LayoutDS.vue'),
    meta: { layout: 'DSLayout' },
    children: [
      {
        path: 'i18n',
        name: 'i18n',
        component: () => import(/* webpackChunkName: "DesignSystem" */ '@/modules/design_system/views/DemoI18n.vue'),
      },
      {
        path: 'button',
        name: 'Button',
        component: () => import(/* webpackChunkName: "DesignSystem" */ '@/modules/design_system/views/DSButton.vue'),
      },
      {
        path: 'toast',
        name: 'Toast',
        component: () => import(/* webpackChunkName: "toast" */ '@/modules/design_system/views/DSToast.vue'),
      },
      {
        path: 'tooltip',
        name: 'Tooltip',
        component: () => import(/* webpackChunkName: "tooltip" */ '@/modules/design_system/views/DSTooltip.vue'),
      },
      {
        path: 'input',
        name: 'Input',
        component: () => import(/* webpackChunkName: "input" */ '@/modules/design_system/views/DSInput.vue'),
      },
      {
        path: 'datepicker',
        name: 'Datepicker',
        component: () => import(/* webpackChunkName: "toast" */ '@/modules/design_system/views/DSDatepicker.vue'),
      },
      {
        path: 'checkbox',
        name: 'Checkbox',
        component: () => import(/* webpackChunkName: "checkbox" */ '@/modules/design_system/views/DSCheckbox.vue'),
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: () => import(/* webpackChunkName: "tab" */ '@/modules/design_system/views/DSTab.vue'),
      },
      {
        path: 'radio',
        name: 'Radio',
        component: () => import(/* webpackChunkName: "radio" */ '@/modules/design_system/views/DSRadio.vue'),
      },
      {
        path: 'textarea',
        name: 'Textarea',
        component: () => import(/* webpackChunkName: "checkbox" */ '@/modules/design_system/views/DSTextarea.vue'),
      },
      {
        path: 'toggle',
        name: 'Toggle',
        component: () => import(/* webpackChunkName: "Toggle" */ '@/modules/design_system/views/DSToggle.vue'),
      },
      {
        path: 'dropdown-search',
        name: 'DropdownSearch',
        component: () =>
          import(/* webpackChunkName: "DropdownSearch" */ '@/modules/design_system/views/DSDropdownSearch.vue'),
      },
      {
        path: 'alert',
        name: 'Alert',
        component: () => import(/* webpackChunkName: "alert" */ '@/modules/design_system/views/DSAlert.vue'),
      },
      {
        path: 'color-picker',
        name: 'ColorPicker',
        component: () =>
          import(/* webpackChunkName: "ColorPicker" */ '@/modules/design_system/views/DSColorPicker.vue'),
      },
      {
        path: 'star-rating',
        name: 'StarRating',
        component: () => import(/* webpackChunkName: "StarRating" */ '@/modules/design_system/views/DSRatingStar.vue'),
      },
      {
        path: 'modal',
        name: 'Modal',
        component: () => import(/* webpackChunkName: "modal" */ '@/modules/design_system/views/DSModal.vue'),
      },
      {
        path: 'pagination',
        name: 'Pagination',
        component: () => import(/* webpackChunkName: "pagination" */ '@/modules/design_system/views/DSPagination.vue'),
      },
      {
        path: 'select',
        name: 'Select',
        component: () => import(/* webpackChunkName: "Select" */ '@/modules/design_system/views/DSSelect.vue'),
      },
      {
        path: 'badge',
        name: 'badge',
        component: () => import(/* webpackChunkName: "Select" */ '@/modules/design_system/views/DSBadge.vue'),
      },
      {
        path: 'select-multi',
        name: 'SelectMulti',
        component: () =>
          import(/* webpackChunkName: "SelectMulti" */ '@/modules/design_system/views/DSMultiSelect.vue'),
      },
      {
        path: 'flag',
        name: 'flag',
        component: () => import(/* webpackChunkName: "SelectMulti" */ '@/modules/design_system/views/DSFlag.vue'),
      },
      {
        path: 'image-lightbox',
        name: 'ImageLightBox',
        component: () =>
          import(/* webpackChunkName: "ImageLightBox" */ '@/modules/design_system/views/DSImageLightBox.vue'),
      },
    ],
  },
  {
    path: '/:notFound(.*)',
    component: () => import(/* webpackChunkName: "DesignSystem" */ '@/layouts/LayoutDS.vue'),
  },
];
