<template>
  <div>
    <b-container class="main-title mb-4 justify-content-start">{{
      title
    }}</b-container>
    <b-container class="main-content flex-wrap mb-4">
      <b-card
        v-for="item in products"
        :key="item.key"
        no-body
        class="text-left"
      >
        <b-card-img-lazy :src="getImageUrl(item)" top></b-card-img-lazy>
        <b-card-body>
          <b-card-title>{{ item.name }}</b-card-title>
          <b-card-text>{{ item.description }}</b-card-text>
          <div
            class="card__footer d-flex justify-content-between align-items-center mt-auto"
          >
            <div class="card__price hide-on-mobile">{{ item.price }} ₽</div>
            <b-button
              href="#"
              variant="outline-primary"
              class="ml-auto hide-on-mobile"
              @click="addind(item)"
              >Выбрать</b-button
            >
            <b-button
              href="#"
              variant="outline-primary"
              class="show-on-mobile"
              @click="addind(item)"
              >{{ item.price }} ₽</b-button
            >
          </div>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { images } from "@/mixins";

export default {
  name: "BaseCategory",
  mixins: [images],
  props: {
    title: {
      type: String,
      default: "",
    },
    products: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      add: "cart/add",
    }),
    addind(item) {
      this.add(item);
      this.$eventHub.$emit("buyEvent");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 50px;
  column-gap: 15px;

  @include for-mobile {
    row-gap: 30px;
  }

  .card {
    border: none;
    height: 100%;

    @include for-mobile {
      flex-direction: unset;
    }

    &-body {
      display: flex;
      flex-direction: column;
      min-height: 230px;

      @include for-mobile {
        padding: 0;
        padding-left: 20px;
        min-height: unset;
      }
    }

    &-img-top {
      max-width: 270px;
      max-height: 250px;
      margin: auto;
      transition: all 0.3s;

      &:hover {
        transform: translate(0, 5px);
      }

      @include for-mobile {
        max-width: 150px;
        max-height: 150px;
      }
    }

    &-title {
      font-weight: 600;
      font-size: $font-size + 0.2;
      border: none;

      @include for-mobile {
        font-size: $font-size + 0.1;
      }
    }

    &-text {
      font-size: $font-size;
      font-weight: 300;
      min-height: 65px;
      overflow: hidden;

      @include for-mobile {
        font-size: $font-size - 0.15;
      }
    }

    &__footer {
      @include for-mobile {
        margin: 0 !important;
      }
    }

    &__price {
      font-size: $font-size + 0.2;
      font-weight: 600;
    }
  }
}
</style>
