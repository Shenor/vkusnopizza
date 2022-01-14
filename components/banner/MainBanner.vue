<template>
  <div class="mb-5">
    <client-only>
      <div class="container">
        <Flicking class="main-slider" :options="options">
          <div
            v-for="item in banners"
            :key="item.id"
            class="panel"
            @click="showDetails(item)"
          >
            <b-img
              class="panel-img"
              :src="getImage(item)"
              fluid
              alt="Fluid image"
              ondragstart="return false"
            >
            </b-img>
          </div>
        </Flicking>
      </div>
      <div slot="placeholder" class="text-center">
        <b-spinner
          class="spinner"
          variant="success"
          label="Spinning"
        ></b-spinner>
      </div>
    </client-only>

    <BannerModal :item="item" />
  </div>
</template>

<script>
import BannerModal from "@/components/modals/bannerModal";

export default {
  name: "MainBanner",
  components: {
    BannerModal,
  },
  data() {
    return {
      item: null,
      banners: [],
      STRAPI_URL: process.env.STRAPI_URL,
      options: {
        align: "prev",
        bound: true,
        horizontal: true,
      },
    };
  },
  async fetch() {
    this.banners = await this.$strapi.$banners.find();
  },
  methods: {
    showDetails(payload) {
      this.item = payload;
      this.$bvModal.show("modal-banners");
    },
    getImage(item) {
      return `${this.STRAPI_URL}${item.image.url}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-slider {
  position: relative;
  outline: none;
  width: 100%;
  overflow: hidden;

  .panel {
    width: 200px;
    height: 250px;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 25px;
    }

    &-img {
      border-radius: 20px;

      @media (max-width: 576px) {
        border-radius: 10px;
      }
    }
  }
}
</style>
