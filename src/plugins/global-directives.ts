export interface Event {
  target: string;
}

export default function registerGlobalDirectives(app: any) {
  app.directive('click-outside', {
    beforeMount(el: any, binding: any) {
      // eslint-disable-next-line
      el.clickOutsideEvent = function (event: Event) {
        // here I check that click was outside the el and his children
        if (!(el === event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          binding.value(event, el);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: any) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    },
  });

  app.directive('scroll-outside', {
    beforeMount(el: any, binding: any) {
      // eslint-disable-next-line
      el.clickOutsideEvent = function (event: Event) {
        // here I check that click was outside the el and his children
        if (!(el === event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          binding.value(event, el);
        }
      };
      document.body.addEventListener('scroll', el.clickOutsideEvent);
    },
    unmounted(el: any) {
      document.body.removeEventListener('scroll', el.clickOutsideEvent);
    },
  });

  app.directive('click-outside-teleport', {
    beforeMount(el: any, binding: any) {
      let flag = 0;
      // eslint-disable-next-line
      el.clickOutsideEvent = function (event: Event) {
        const selectEl = document.getElementById('select');
        if (!(el === event.target || el.contains(event.target))) {
          if (selectEl?.hasChildNodes() && flag !== 0) {
            binding.value(event, el);
          }
          !flag && flag++;
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: any) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    },
  });

  app.directive('click-outside-teleport-tooltip', {
    beforeMount(el: any, binding: any) {
      let flag = 0;
      // eslint-disable-next-line
      el.clickOutsideEvent = function (event: Event) {
        const tooltipEl = document.getElementById('tooltip');
        if (!(el === event.target || el.contains(event.target))) {
          if (tooltipEl?.hasChildNodes() && flag == 0) {
            binding.value(event, el);
          }
          !flag && flag++;
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: any) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    },
  });
}
