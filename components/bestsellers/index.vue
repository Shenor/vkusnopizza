<template>
  <div class="news d-flex flex-column">
    <div class="container main-title mb-4 mt-4 pl-4 justify-content-start">
      Хиты продаж
    </div>
    <div v-if="getNewsItem" class="slider-wrapper mb-1 pt-2 pb-2">
      <i
        class="slider-shadow slider-shadow-right d-none d-md-flex d-xl-flex"
      ></i>
      <i
        class="slider-shadow slider-shadow-left d-none d-md-flex d-xl-flex"
      ></i>
      <div class="container">
        <client-only>
          <flicking
            class="slider-news grabbing"
            :options="options"
            :tag="'div'"
            :viewport-tag="'div'"
          >
            <div v-for="item in getNewsItem" :key="item.key" class="panel">
              <b-card
                :img-src="getImageUrl(item)"
                img-alt="Card image"
                img-left
                fluid
                class="slider-news__card mb-3 p-2"
                @click="showProductCard(item)"
              >
                <b-card-text class="d-flex flex-column">
                  <div style="min-height: 45px">
                    {{ item.name }}
                  </div>
                  <b-button class="mt-2" variant="outline-primary"
                    >Выбрать</b-button
                  >
                </b-card-text>
              </b-card>
            </div>
          </flicking>

          <div slot="placeholder" class="text-center">
            <b-spinner
              class="spinner"
              variant="success"
              label="Spinning"
            ></b-spinner>
          </div>
        </client-only>
      </div>
    </div>

    <BestsellerModal :item="activeItem" />
  </div>
</template>

<script>
import data from "@/store/data.json";
import { images } from "@/mixins";
import BestsellerModal from "@/components/modals/bestsellerModal";

export default {
  name: "Bestsellers",
  components: { BestsellerModal },
  mixins: [images],
  data() {
    return {
      activeItem: null,
      options: {
        align: "prev",
      },
    };
  },
  computed: {
    getNewsItem() {
      return data.nomenclature.products.filter(
        (i) =>
          i.productCategoryId === "7ba3f2a8-fa96-c6ad-0174-b5ba1356019a" &&
          i.type === "dish"
      );
    },
  },
  methods: {
    showProductCard(payload) {
      this.activeItem = payload;
      this.$bvModal.show("modal-bestseller");
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
  overflow: hidden;

  .slider-shadow {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 20%;
    z-index: 2;
    padding: 9px 53.3333px 20px;
    pointer-events: none;
  }

  .slider-shadow-right {
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgb(255, 255, 255) 100%
    );
    right: 0;
  }

  .slider-shadow-left {
    background-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgb(255, 255, 255) 100%
    );
    left: 0;
  }
}

.slider-news {
  position: relative;
  outline: none;
  width: 100%;
  overflow: visible;

  &__card {
    img {
      max-width: 40%;
    }
  }

  .panel {
    width: 330px;

    &:not(:last-child) {
      margin-right: 20px;
    }

    @media (max-width: 768px) {
      width: 320px;
    }
  }

  &__card {
    cursor: pointer;
    align-items: center;
    min-width: 265px;
    border: none;
    box-shadow: 0px 4px 7px 1px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0px 4px 6px -2px rgba(6, 5, 50, 0.15);
    }

    img {
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    }
  }
}
</style>
