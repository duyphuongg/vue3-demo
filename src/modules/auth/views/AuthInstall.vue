<template>
  <div class="md:flex welcome-page">
    <!-- Left-->
    <div
      class="hidden md:flex justify-center items-center bg-dark md:w-[420px] lg:w-[500px] h-screen relative group-right"
    >
      <img class="absolute top-0 right-0" src="@/modules/auth/images/circle-top.svg" />
      <div>
        <div class="relative flex justify-center items-center">
          <img class="absolute top-[-80px]" src="@/modules/auth/images/logo.svg" alt="" />
        </div>
        <div class="card-item w-[400px] h-[200px] z-[999]">
          <swiper :modules="modules" :slides-per-view="1" :autoplay="true" :pagination="{ clickable: true }">
            <swiper-slide v-for="(item, idx) in state.arrContent" :key="idx" class="px-5 pt-6">
              <p class="text-white font-heading font-semibold text-2xl mb-[10px]">{{ item.title }}</p>
              <p class="text-white font-sans text-[17px] leading-[27px]">
                {{ item.des }}
              </p>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <img class="absolute bottom-0 left-0" src="@/modules/auth/images/circle-bot.svg" />
    </div>
    <!-- Right -->
    <div
      class="
        bg-white
        md:w-[calc(100%-420px)]
        lg:w-[calc(100%-500px)]
        h-screen
        flex
        justify-center
        items-center
        group-left
      "
    >
      <div class="cover-form">
        <div class="flex justify-center items-center">
          <img class="md:hidden mb-[50px]" src="@/modules/auth/images/logo.svg" alt="" />
        </div>
        <!-- md:shadow-inner-2px-bright-2 -->
        <div class="w-[350px] lg:w-[500px] h-[350px] rounded-lg bg-white md:px-3 lg:px-16 text-center">
          <p class="font-semibold text-dark text-3xl leading-6 mb-2 font-heading">WELCOME</p>
          <p class="mb-0 text-dark-1 text-16 leading-6">Please enter your Shopify URL</p>
          <!-- Form Login -->
          <form class="mt-10" @submit.prevent="handleLogin">
            <div class="relative">
              <input
                v-model="state.email"
                class="
                  pr-[140px]
                  pl-[15px]
                  h-[48px]
                  py-[5px]
                  block
                  w-full
                  rounded
                  border
                  text-sm
                  focus-visible:outline-none
                "
                maxlength="200"
                placeholder="Store Name"
                :class="
                  state.isError
                    ? 'border-danger-3 shadow-3px-danger-1'
                    : ' border-bright-3 focus-within:border-bright-5 hover:border-bright-5 hover:shadow-3px-bright-2'
                "
              />
              <div class="absolute right-[15px] top-1/2 -translate-y-1/2">.myshopify.com</div>
            </div>
            <div v-if="state.isError" class="flex text-left text-danger-3 text-12 mt-1">
              <IconComponent name="exclamation-circle-border" class="mt-1 mr-1.5" />
              <span>Please fill out this field</span>
            </div>
            <button
              type="submit"
              class="
                w-full
                h-10
                mt-[14px]
                flex
                justify-center
                items-center
                transition
                rounded
                bg-primary
                hover:bg-primary-dark-1
                active:bg-primary active:shadow-inner-2px-primary-light-2
              "
            >
              <span class="text-white">Log In</span>
            </button>
          </form>
          <!-- Footer -->
          <div class="flex justify-center text-[13px] lg:text-sm text-center mt-6">
            Don’t have a <img class="mx-0.5" src="@/modules/auth/images/shopify.svg" alt="logo" />
            <span class="font-semibold text-grey-10">Shopify store&nbsp; </span>
            yet?&nbsp;
            <a
              class="text-blue-600"
              target="_blank"
              href="https://www.shopify.com/free-trial?ref=fireapps&utm_campaign=alireviews"
            >Create your store</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

import { useAuth } from '../composable/useAuth';
import IconComponent from '@/components/ui/IconComponent.vue';
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    IconComponent,
  },

  setup() {
    const { login } = useAuth();
    const state = reactive({
      email: '',
      isError: false,
      arrContent: [
        {
          title: 'GROW THE WAY YOU WANT',
          des: 'Seeking a solution for collecting customer reviews, customizing review widget, and getting end-to-end support service? We’ve got you covered!',
        },
        {
          title: 'MORE THAN YOUR REVIEW APP',
          des: 'We offer dedicated support to provide the remarkable experience based on your own requirements. Building your trustworthy store has never been easier.',
        },
      ],
    });
    watch(
      () => state.email,
      (email) => {
        if (email == '') {
          state.isError = true;
        } else {
          state.isError = false;
        }
      },
      // { immediate: true },
    );
    const handleLogin = async () => {
      if (state.email == '') {
        state.isError = true;
        return;
      }
      state.isError = false;
      console.log('handleLogin', state.email);
      await login({ domain: state.email });
    };
    return { state, handleLogin, modules: [Pagination, Autoplay] };
  },
});
</script>
<style lang="scss" >
.welcome-page {
  .group-right {
    .card-item {
      background-image: url(../images/bg-content.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      .swiper {
        position: unset;
        .swiper-pagination-bullet {
          @apply bg-primary-light-1 w-3 h-2 rounded;
          &-active {
            @apply bg-white w-7;
          }
        }
        .swiper-pagination-horizontal {
          position: absolute;
          bottom: -25px !important;
        }
      }
    }
  }
}
</style>
