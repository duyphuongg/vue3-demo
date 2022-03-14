<template>
  <div class="product-detail-wrap p-5 bg-white rounded-[4px] shadow-rgba-01-08 mb-[10px]">
    <p class="body-large-smbold text-dark">{{ $t('manage_reviews.product_details') }}</p>
    <div class="flex w-full flex-row justify-between items-center mt-4">
      <ReviewSummary />
      <SummaryRating :reviews="reviews" />
    </div>
  </div>
  <div class="customer-review-wrap flex-1 p-5 bg-white rounded-[4px] shadow-rgba-01-08">
    <p class="body-large-smbold text-dark mb-[10px]">{{ $t('manage_reviews.customer_reviews.title') }}</p>
    <ul class="flex">
      <li
        class="px-[24px] py-[4px] border border-bright-3 font-semibold rounded-l cursor-pointer hover:text-dark"
        :class="classStatusReview('all')"
        @click="handleStatusReviewFilter('all')"
      >
        {{ $t('manage_reviews.customer_reviews.all', { num: 0 }) }}
      </li>
      <li
        class="px-[24px] py-[4px] border border-bright-3 font-semibold cursor-pointer hover:text-dark"
        :class="classStatusReview(1)"
        @click="handleStatusReviewFilter(1)"
      >
        {{ $t('manage_reviews.customer_reviews.publish', { num: 0 }) }}
      </li>
      <li
        class="px-[24px] py-[4px] border border-bright-3 font-semibold rounded-r cursor-pointer hover:text-dark"
        :class="classStatusReview(0)"
        @click="handleStatusReviewFilter(0)"
      >
        {{ $t('manage_reviews.customer_reviews.unpublish', { num: 0 }) }}
      </li>
    </ul>

    <template v-if="!isLoadingListReviews">
      <div class="mt-[23px] mb-[15px] flex items-center">
        <Checkbox
          v-model="checkedAllReviewThisPage"
          :label="textCheckedAllThisPage"
          @update:modelValue="handleCheckedAllReviewThisPage($event)"
        />
        <a
          v-if="checkedProducts.length > 0 && !selectAllReview"
          class="text-info-3 hover:underline body-base ml-[14px]"
          @click="handleSelectAll"
        >
          Select all {{ totalReviews }} reviews of this product
        </a>
        <a v-if="selectAllReview" class="text-info-3 hover:underline body-base ml-[14px]" @click="handleClearAll">
          Clear all
        </a>
        <div class="w-[180px] ml-[18px]">
          <Select
            v-model="actionBulkReview"
            class="select-bulk-action-review"
            title-default="More actions"
            max-height-list="260px"
            min-width="150px"
          >
            <SelectPanel v-for="(index, i) in optionActionBulkReview" :key="i" :value="index.id">
              <template #icon>
                <icon-component
                  class="arrow"
                  :name="index.icon"
                  :class="[index.id == 'delete' ? 'text-danger-3' : 'text-dark']"
                />
              </template>
              <p :class="[index.id == 'delete' ? 'text-danger-3' : 'text-dark']">{{ index.name }}</p>
            </SelectPanel>
          </Select>
        </div>
      </div>
      <div v-for="review of listReviews.list" :key="review" class="list-reviews">
        <div class="review-item py-[16px] border border-transparent border-t-bright-3">
          <div class="review-name flex justify-between">
            <div class="flex">
              <Checkbox
                v-model="checkedProducts"
                :value="review.id"
                :id-ckb="review.id"
                class="mb-auto mr-[8px]"
                @update:modelValue="handleCheckedProduct($event, review.id)"
              />
              <div>
                <div class="flex items-center mb-[6px]">
                  <p class="name body-small-smbold">{{ review.author }}</p>
                  <Flag :code="review.country" show-tooltip class="ml-[8px] inline-flex" />
                </div>
                <p v-if="review.email" class="mail body-small text-dark-1 mb-[14px]">{{ review.email }}</p>
                <div class="flex items-center">
                  <RatingStar :rating="review.star" />
                  <span class="body-small text-dark-1 ml-[16px] mt-[2px] block">{{ review.created_at }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center mb-auto">
              <tooltip-component position="top" content="Delete">
                <button-component
                  type="subtle"
                  icon="trash-alt"
                  :only-icon="true"
                  @click="handleDeletePerReview(review.id)"
                />
              </tooltip-component>
              <tooltip-component position="top" :content="review.status ? 'Unpublish review' : 'Publish review'">
                <Toggle
                  v-model="review.status"
                  size="medium"
                  class="ml-[12px]"
                  @click="handleStatusPerReview(review.id, review.status)"
                />
              </tooltip-component>
            </div>
          </div>
          <div class="review-content flex items-end mt-[8px] pl-[30px]">
            <div class="content flex-1">
              <p v-if="review.title" class="body-base-smbold">{{ review.title }}</p>
              <p class="body-base max-h-[42px] overflow-hidden review-content-truncate">
                <input
                  type="hidden"
                  name="value-review-content"
                  class="review-content-block-hidden"
                  :value="review.content"
                />
                {{ review.content }}
              </p>
            </div>
            <div v-if="review.img" class="images flex ml-[36px] flex-shrink-0">
              <ImageLightBox :arr-images="review.img" :is-show-max="3" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center align-middle mt-[40px] mb-12">
        <Pagination v-model="pagValLink" type="link" :total="listReviews?.total" />
      </div>
    </template>
    <LoadingComponent v-else class="mt-[100px]" />
  </div>

  <ModalComfirmComponent
    v-model="isShowConfirmDeleteReview"
    title="Delete Review Permanently?"
    content="This will permanently delete selected review(s) both in<br> app and on storefront. Are you sure to proceed?"
    icon-name="exclamation-circle"
    icon-class="text-danger-3"
    button-primary-text="Delete"
    button-primary-type="destructive"
    @onConfirm="onConfirmDeleteReview($event)"
  >
  </ModalComfirmComponent>
  <ModalComfirmComponent
    v-model="isShowConfirmPublishReview"
    title="Publish Reviews"
    content="You are about to publish the selected review(s) on your<br> storefront. Do you want to proceed this?"
    button-primary-text="Publish"
    @onConfirm="onConfirmPublishReview($event)"
  >
  </ModalComfirmComponent>
  <ModalComfirmComponent
    v-model="isShowConfirmUnpublishReview"
    title="Unpublish Review"
    content="This will temporarily hide the selected review(s) on your storefront. Are you sure to unpublish? "
    button-primary-text="Unpublish"
    @onConfirm="onConfirmUpublishReview($event)"
  >
  </ModalComfirmComponent>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import Checkbox from '@/components/ui/CheckboxComponent.vue';
import RatingStar from '@/components/ui/RatingStarComponent.vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import Select from '@/components/ui/SelectComponent.vue';
import SelectPanel from '@/components/ui/SelectPanel.vue';
import Toggle from '@/components/ui/ToggleComponent.vue';
import SummaryRating from '../components/SummaryRating.vue';
import ReviewSummary from '../components/ReviewSummary.vue';
import Flag from '@/components/ui/FlagComponent.vue';
import ImageLightBox from '@/components/ui/ImageLightBoxComponent.vue';
import ModalComfirmComponent from '@/components/ui/ModalComfirmComponent.vue';
import IconComponent from '@/components/ui/IconComponent.vue';
import Pagination from '@/components/ui/PaginationComponent.vue';
import LoadingComponent from '@/components/ui/LoadingComponent.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { services } from './../services/index';
import { useToast } from '@/composables/useToast';
import { handleAddShowMoreContent } from '@/composables/truncate';

export default defineComponent({
  name: 'ProductDetail',
  components: {
    Checkbox,
    RatingStar,
    ButtonComponent,
    Toggle,
    SummaryRating,
    ReviewSummary,
    Flag,
    TooltipComponent,
    Select,
    SelectPanel,
    ImageLightBox,
    ModalComfirmComponent,
    IconComponent,
    Pagination,
    LoadingComponent,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { addToast } = useToast();
    // declare variables
    const checkedAllReviewThisPage = ref(false);
    const selectAllReview = ref(false);
    const pagValLink = ref(1);
    const isShowConfirmDeleteReview = ref(false);
    const isShowConfirmPublishReview = ref(false);
    const isShowConfirmUnpublishReview = ref(false);
    const actionBulkReview = ref('');
    const checkedProducts = ref([]);
    const unCheckedProducts = ref([]);
    const productDeleteId = ref('');
    const optionActionBulkReview = [
      { id: 'publish', name: 'Publish reviews', icon: 'eye' },
      { id: 'unpublish', name: 'Unpublish reviews', icon: 'eye-slash' },
      { id: 'delete', name: 'Delete', icon: 'trash-alt' },
    ];
    const productId = ref(route.params.productId);
    const statusReview = ref('all');
    const starReview = ref(0);
    // declare variables
    // begin computed
    const listReviews = computed(() => store.state.manageReviews.listReviews);
    const totalReviewThisPage = computed(() => (listReviews.value?.list ? listReviews.value?.list.length : 0));
    const totalReviews = computed(() => (listReviews.value?.total ? listReviews.value?.total : 0));
    const isLoadingListReviews = computed(() => store.state.manageReviews.isLoadingListReviews);

    const numReviewSelect = computed(() => {
      let num = 0;
      if (totalReviewThisPage.value == checkedProducts.value.length && !selectAllReview.value) {
        num = totalReviewThisPage.value;
      } else if (totalReviewThisPage.value > checkedProducts.value.length && !selectAllReview.value) {
        num = checkedProducts.value.length;
      } else if (selectAllReview.value) {
        num = totalReviews.value - unCheckedProducts.value.length;
      }
      return num;
    });
    const textCheckedAllThisPage = computed(() => {
      if (!checkedAllReviewThisPage.value && checkedProducts.value.length == 0) {
        return `Select ${totalReviewThisPage.value} reviews on this page`;
      } else {
        return `${numReviewSelect.value} selected`;
      }
    });

    const dataFilterReview = computed(() => {
      let data = {};
      if (productId.value) {
        data.product_ids = [productId.value];
      }
      if (statusReview.value != 'all') {
        data.status = statusReview.value;
      }
      if (starReview.value != 0) {
        data.star = starReview.value;
      }
      return data;
    });

    const dataFilterBulkAction = computed(() => {
      let data = {
        ids: checkedProducts.value,
        isAllReviews: selectAllReview.value,
      };
      if (statusReview.value != 'all') {
        data.status = statusReview.value;
      }
      if (starReview.value != 0) {
        data.star = starReview.value;
      }
      if (selectAllReview.value) {
        data.exclude_ids = unCheckedProducts.value;
      }
      if (['publish', 'unpublish'].includes(actionBulkReview.value)) {
        data.type = 'status';
        data.review_status = actionBulkReview.value == 'publish' ? 1 : 0;
      }
      return data;
    });

    // end computed

    // begin methods
    const getReviews = (data) => store.dispatch('manageReviews/getReviews', data);
    getReviews(dataFilterReview.value);

    watch(isLoadingListReviews, async (val) => {
      if (!val) {
        await nextTick();
        handleAddShowMoreContent('review-content-truncate', 'value-review-content', 'ali-show-full-content');
      }
    });

    const classStatusReview = (type) => {
      return statusReview.value == type ? 'bg-bright-2 text-dark' : 'text-dark-1 bg-white';
    };
    const handleStatusReviewFilter = (data) => {
      statusReview.value = data;
    };

    const handleStatusPerReview = async (id, status) => {
      console.log(id, status);
      let data = {
        type: 'status',
        review_status: status,
      };
      let res = await services.handleStatusPerReview(id, data);
      if (res.status === 200 && res?.data?.status) {
        if (status) {
          addToast({
            title: 'Review(s) successfully published',
            icon: 'check-circle',
            iconColor: 'text-success-3',
            type: 'success',
            timeout: 3000,
          });
        } else {
          addToast({
            title: 'Review(s) successfully unpublished',
            icon: 'check-circle',
            iconColor: 'text-success-3',
            type: 'success',
            timeout: 3000,
          });
        }
      }
    };

    const handleSelectAll = () => {
      selectAllReview.value = true;
    };

    const handleClearAll = () => {
      selectAllReview.value = false;
    };

    const handleDeletePerReview = (id) => {
      productDeleteId.value = id;
      isShowConfirmDeleteReview.value = true;
    };

    const onConfirmDeleteReview = async (status) => {
      if (status) {
        //delete one product
        if (productDeleteId.value) {
          let res = await services.handleDeletePerReview(productDeleteId.value);
          if (res.status === 200 && res?.data?.status) {
            addToast({
              title: 'Review(s) successfully deleted',
              icon: 'check-circle',
              iconColor: 'text-success-3',
              type: 'success',
              timeout: 3000,
            });
            getReviews(dataFilterReview.value);
          }
        }
        //bulk delete
        if (actionBulkReview.value == 'delete') {
          let res = await services.handleBulkDeleteReview(dataFilterBulkAction.value);
          if (res.status === 200 && res?.data?.status) {
            addToast({
              title: 'Review(s) successfully deleted',
              icon: 'check-circle',
              iconColor: 'text-success-3',
              type: 'success',
              timeout: 3000,
            });
            getReviews(dataFilterReview.value);
            actionBulkReview.value = '';
            selectAllReview.value = false;
            checkedProducts.value = [];
          }
        }
      }
      productDeleteId.value = '';
      isShowConfirmDeleteReview.value = false;
    };
    const onConfirmPublishReview = async (status) => {
      if (status) {
        if (actionBulkReview.value == 'publish') {
          let res = await services.handleBulkStatusReview(dataFilterBulkAction.value);
          if (res.status === 200 && res?.data?.status) {
            addToast({
              title: 'Review(s) successfully published',
              icon: 'check-circle',
              iconColor: 'text-success-3',
              type: 'success',
              timeout: 3000,
            });
            getReviews(dataFilterReview.value);
            actionBulkReview.value = '';
            selectAllReview.value = false;
            checkedProducts.value = [];
          }
        }
      }
      isShowConfirmPublishReview.value = false;
    };
    const onConfirmUpublishReview = async (status) => {
      if (status) {
        if (actionBulkReview.value == 'unpublish') {
          let res = await services.handleBulkStatusReview(dataFilterBulkAction.value);
          if (res.status === 200 && res?.data?.status) {
            addToast({
              title: 'Review(s) successfully unpublished',
              icon: 'check-circle',
              iconColor: 'text-success-3',
              type: 'success',
              timeout: 3000,
            });
            getReviews(dataFilterReview.value);
            actionBulkReview.value = '';
            selectAllReview.value = false;
            checkedProducts.value = [];
          }
        }
      }
      isShowConfirmUnpublishReview.value = false;
    };
    const handleBulkActions = (action) => {
      if (action === 'delete') {
        isShowConfirmDeleteReview.value = true;
      }
      if (action === 'publish') {
        isShowConfirmPublishReview.value = true;
      }
      if (action === 'unpublish') {
        isShowConfirmUnpublishReview.value = true;
      }
    };
    const handleCheckedAllReviewThisPage = (status) => {
      console.log(status);
      if (!status) {
        checkedProducts.value = [];
      }
    };
    const handleCheckedProduct = (val, id) => {
      if (selectAllReview.value) {
        //uncheck
        if (!val.includes(id)) {
          unCheckedProducts.value.push(id);
        } else {
          let indexId = unCheckedProducts.value.findIndex((item) => item == id);
          if (indexId >= 0) {
            unCheckedProducts.value.splice(indexId, 1);
          }
        }
      }
    };
    // end methods
    // begin watch
    watch(dataFilterReview, (val) => {
      store.commit('manageReviews/updateIsLoadingListReviews', true);
      getReviews(val);
    });
    watch(checkedAllReviewThisPage, (val) => {
      if (val === true) {
        checkedProducts.value = [];
        listReviews.value.list.forEach((review) => {
          checkedProducts.value.push(review.id);
        });
      }
    });
    watch(selectAllReview, (val) => {
      unCheckedProducts.value = [];
      if (val === true) {
        checkedProducts.value = [];
        listReviews.value.list.forEach((review) => {
          checkedProducts.value.push(review.id);
        });
      } else {
        checkedProducts.value = [];
      }
    });
    watch(checkedProducts, (val) => {
      if (val.length == totalReviewThisPage.value) {
        checkedAllReviewThisPage.value = true;
      } else if (val.length < totalReviewThisPage.value) {
        checkedAllReviewThisPage.value = false;
      }
    });
    watch(actionBulkReview, (val) => {
      handleBulkActions(val);
    });
    // end watch
    // hard code reviews
    const reviews = ref([
      {
        id: 1,
        star: 1,
      },
      {
        id: 1,
        star: 2,
      },
      {
        id: 1,
        star: 3,
      },
      {
        id: 1,
        star: 4,
      },
      {
        id: 1,
        star: 5,
      },
    ]);
    return {
      listReviews,
      totalReviewThisPage,
      totalReviews,
      isLoadingListReviews,
      classStatusReview,
      handleStatusReviewFilter,
      checkedAllReviewThisPage,
      selectAllReview,
      reviews,
      actionBulkReview,
      checkedProducts,
      optionActionBulkReview,
      isShowConfirmDeleteReview,
      isShowConfirmPublishReview,
      isShowConfirmUnpublishReview,
      onConfirmDeleteReview,
      onConfirmPublishReview,
      onConfirmUpublishReview,
      handleStatusPerReview,
      handleDeletePerReview,
      handleSelectAll,
      handleClearAll,
      pagValLink,
      textCheckedAllThisPage,
      handleCheckedAllReviewThisPage,
      handleCheckedProduct,
    };
  },
});
</script>

<style lang="scss">
.select-bulk-action-review {
  .icon-selected {
    svg path {
      fill: #121212;
    }
  }
}
</style>

