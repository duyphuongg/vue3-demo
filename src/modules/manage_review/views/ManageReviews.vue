<template>
  <main class="relative z-0 h-screen lg:w-[296px] xl:w-[382px] py-12 pl-[40px] pr-4">
    <h3 class="mb-4">{{ $t('manage_reviews.name') }}</h3>
    <div class="product-list-wrap bg-white rounded-[4px] shadow-rgba-01-08 h-[calc(100%-52px)] pb-8">
      <div class="p-5 pb-3 border border-transparent border-b-bright-2">
        <p class="body-large-smbold text-dark mb-5">{{ $t('manage_reviews.product_list') }}</p>
        <div class="flex">
          <Input
            v-model="valueSearch"
            type="text"
            :is-search="true"
            :placeholder="$t('manage_reviews.search_a_product')"
            class="w-full"
          ></Input>
        </div>
        <div class="flex mt-1 justify-end items-center">
          <div class="mr-[8px]"><Icon name="filter" class="text-dark-3" /></div>
          <Select v-model="filterProduct" max-height-list="260px" min-width="150px" :link="true">
            <SelectPanel v-for="(index, i) in optionFilterProduct" :key="i" :value="index.id">
              {{ index.name }}
            </SelectPanel>
          </Select>
        </div>
        <p v-if="!isLoadingListProductsData" class="text-12 mt-[5px]">
          {{ $t('manage_reviews.showing_products', { show: numProductShow, total: listProductsData.total }) }}
        </p>
      </div>
      <div class="product-list overflow-y-auto scrollbar mr-[4px] max-h-[calc(100%-161px)]">
        <template v-if="!isLoadingListProductsData">
          <ul>
            <li
              v-for="(product, index) of arrProducts"
              :key="index"
              class="
                py-[10px]
                pl-[20px]
                pr-[10px]
                cursor-pointer
                border border-transparent border-b-bright-2
                hover:bg-bright-2
              "
              :class="{ 'bg-bright-2': route.params.productId == product.id }"
              @click="handleChoooseProduct(product.id)"
            >
              <div class="flex items-center">
                <img v-if="product.image" :src="product.image" alt="" />
                <img v-else src="../images/product_default.png" alt="" />
                <div class="ml-[8px] xl:max-w-[215px] lg:max-w-[135px]">
                  <p class="mb-[6px] truncate text-14" :title="product.title">
                    {{ product.title }}
                  </p>
                  <div class="flex items-center">
                    <div v-if="product.avg_review" class="text-12 text-primary mr-4 flex items-center">
                      <span class="mr-1">{{ product.avg_review }}</span>
                      <Icon name="star" type="solid" class="text-primary mb-[2px]" />
                    </div>
                    <p class="text-12 text-dark-3">
                      {{ $tc('manage_reviews.review_count', product.count_review, { num: product.count_review }) }}
                    </p>
                  </div>
                </div>
                <span
                  v-if="product.unread_review"
                  class="badge block w-[8px] h-[8px] rounded-full bg-warning-3 ml-auto"
                ></span>
              </div>
            </li>
          </ul>
          <div v-if="listProductsData.current_page < listProductsData.last_page" class="mt-4 flex justify-center mb-6">
            <button-component type="outline" :text-button="$t('manage_reviews.load_more')" @click="handleLoadMore()" />
          </div>
        </template>
        <template v-else>
          <LoadingComponent class="mt-[100px]" />
        </template>
      </div>
    </div>
  </main>
  <aside
    class="
      relative
      overflow-y-auto
      product-detail-wrap
      lg:w-[calc(100%-296px)]
      xl:w-[calc(100%-382px)]
      mt-[100px]
      mb-12
      pr-[40px]
      max-h-[calc(100vh-148px)]
      flex flex-col
    "
  >
    <router-view />
  </aside>
</template>

<script>
import Input from '@/components/ui/InputComponent.vue';
import Select from '@/components/ui/SelectComponent.vue';
import SelectPanel from '@/components/ui/SelectPanel.vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import LoadingComponent from '@/components/ui/LoadingComponent.vue';
import Icon from '@/components/ui/IconComponent.vue';
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ManageReviews',
  components: { Input, Select, SelectPanel, Icon, ButtonComponent, LoadingComponent },
  setup() {
    // declare variables
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const store = useStore();
    const valueSearch = ref('');
    const filterProduct = ref('all');
    const currentPage = ref(1);
    const optionFilterProduct = [
      { id: 'all', name: t('manage_reviews.all_products') },
      { id: 'has_reviews', name: t('manage_reviews.with_reviews') },
      { id: 'without_reviews', name: t('manage_reviews.without_reviews') },
    ];
    // begin computed
    const listProductsData = computed(() => store.state.manageReviews.listProductsData);
    const arrProducts = computed(() => store.state.manageReviews.arrProducts);
    const isLoadingListProductsData = computed(() => store.state.manageReviews.isLoadingListProductsData);
    const numProductShow = computed(() => {
      return arrProducts.value.length;
    });
    const dataFilterProduct = computed(() => {
      let data = {
        store_id: 1,
        page: currentPage.value,
      };
      if (valueSearch.value) {
        data.title = valueSearch.value;
      }
      if (filterProduct.value != 'all') {
        data.sort = filterProduct.value;
      }
      return data;
    });
    // end computed
    // begin watch
    watch(dataFilterProduct, (val) => {
      store.commit('manageReviews/updateIsLoadingListProductsData', true);
      getListProducts(val);
      console.log(val);
    });
    // end watch
    // begin methods
    const handleChoooseProduct = (productId) => {
      router.push({
        name: 'ProductDetail',
        params: { productId: productId },
      });
    };
    const handleLoadMore = () => {
      currentPage.value++;
      console.log(currentPage.value);
    };
    const getListProducts = (data) => store.dispatch('manageReviews/getListProducts', data);
    getListProducts(dataFilterProduct.value);
    // end methods
    return {
      route,
      valueSearch,
      filterProduct,
      optionFilterProduct,
      handleChoooseProduct,
      handleLoadMore,
      listProductsData,
      isLoadingListProductsData,
      arrProducts,
      numProductShow,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>