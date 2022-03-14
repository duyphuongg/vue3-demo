<template>
  <div class="ds-badge p-12p">
    <label class="block text-24 font-bold text-gray-700 mb-5 text-center">Notifications</label>
    <div class="grid grid-flow-col grid-cols-3 mb-16p">
      <div class="primary border-r-2 p-5">
        <label for="type" class="block text-14 font-bold text-gray-700 mb-5 text-center">Primary</label>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">from 1 to 9</label>
          <badge-notification :count="9" />
        </div>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">from 10 to 99</label>
          <badge-notification :count="99" />
        </div>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">over 99</label>
          <badge-notification :count="100" />
        </div>
      </div>
      <div class="secondary border-r-2 p-5">
        <label for="type" class="block text-14 font-bold text-gray-700 mb-5 text-center">Secondary</label>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">from 1 to 9</label>
          <badge-notification type="secondary" :count="9" />
        </div>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">from 10 to 99</label>
          <badge-notification type="secondary" :count="99" />
        </div>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">over 99</label>
          <badge-notification type="secondary" :count="100" />
        </div>
      </div>
      <div class="tertiary border-r-2 p-5">
        <label for="type" class="block text-14 font-bold text-gray-700 mb-5 text-center">Tertiary</label>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">from 1 to 9</label>
          <badge-notification type="tertiary" :count="9" />
        </div>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">from 10 to 99</label>
          <badge-notification type="tertiary" :count="99" />
        </div>
        <div class="grid grid-flow-col grid-cols-2 mb-16p">
          <label class="ml-32p">over 99</label>
          <badge-notification type="tertiary" :count="100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BadgeNotification from '@/components/ui/BadgeNotificationComponent.vue';

export default defineComponent({
  name: 'DSBadgeComponent',
  components: {
    BadgeNotification,
  },
});
</script>
