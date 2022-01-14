<template>
  <b-modal id="modal-product" centered size="lg">
    <template #modal-header="{ close }">
      <div class="w-100 d-flex justify-content-end">
        <b-icon
          variant="white"
          class="modal-close"
          icon="x"
          role="button"
          @click="close()"
        ></b-icon>
      </div>
    </template>
    <b-container v-if="item" class="wrapper-modal">
      <div>
        <b-img
          class="product-img"
          :src="getImageUrl(item)"
          fluid
          alt="Responsive image"
        ></b-img>
      </div>
      <div class="text-left align-self-start">
        <p
          class="title font-weight-semibold d-flex justify-content-between align-items-center"
        >
          {{ item.name }}
          <b-icon
            id="tooltip-product"
            icon="exclamation-circle"
            role="button"
          ></b-icon>
        </p>
        <h4 class="mb-2">Вес: {{ item.weight * 1000 }} г</h4>
        <p>
          {{
            item.description ||
            `Some quick example text to build on the card title and make up the bulk of the card's content.`
          }}
        </p>
      </div>
      <b-tooltip
        offset="-70"
        placement="bottom"
        target="tooltip-product"
        triggers="click"
      >
        <p class="small">Пищевая ценности на 100 г</p>
        <div class="small d-flex justify-content-between">
          <span>Эрнерг. ценность</span>
          <span>{{ item.energyAmount || 0 }}</span>
        </div>
        <div class="small d-flex justify-content-between">
          <span>Белки</span> <span>{{ item.fiberAmount || 0 }}</span>
        </div>
        <div class="small d-flex justify-content-between">
          <span>Жиры</span> <span>{{ item.fatAmount || 0 }}</span>
        </div>
        <div class="small d-flex justify-content-between">
          <span>Углеводы</span> <span>{{ item.carbohydrateAmount || 0 }}</span>
        </div>
      </b-tooltip>
    </b-container>
    <template #modal-footer="">
      <b-button size="md" variant="outline-primary" @click="adding">
        Добавить в корзину - <b> {{ item.price }} ₽</b>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapMutations } from "vuex";
import { images } from "@/mixins";
export default {
  name: "ProductModal",
  mixins: [images],
  props: ["item"],
  methods: {
    ...mapMutations({
      add: "cart/add",
    }),
    adding() {
      this.add(this.item);
      this.$bvModal.hide("modal-product");
      this.$eventHub.$emit("buyEvent");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  #modal-product {
    .modal-header {
      .modal-close {
        position: absolute;
        top: -5px;
        right: -55px;
        width: 50px;
        height: 50px;

        @include for-mobile {
          position: unset;
          width: 25px;
          height: 25px;
          color: #212121 !important;
        }
      }
    }

    .modal-content {
      border-radius: 20px;
    }

    .wrapper-modal {
      display: grid;
      grid-template-columns: 1fr 1fr;

      @include for-mobile {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        row-gap: 36px;
      }
    }

    .title {
      font-size: $font-size + 0.4;
    }

    .product-img {
      max-width: 90%;
      border-radius: 10px;
    }
  }
}
</style>
