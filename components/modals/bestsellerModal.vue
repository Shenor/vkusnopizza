<template>
  <b-modal id="modal-bestseller" centered size="lg">
    <b-container v-if="item" class="wrapper-modal">
      <b-col lg="6" md="10">
        <b-img :src="getImageUrl(item)" fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col lg="6" md="10" class="text-left align-self-start">
        <p class="title font-weight-semibold">{{ item.name }}</p>
        <b-form-group>
          <b-form-radio-group
            v-model="selectedModifiers"
            class="text-center"
            text-field="name"
            value-field="id"
            :options="modifiers"
            buttons
            button-variant="outline-primary"
            name="radio-btn-outline"
          ></b-form-radio-group>
        </b-form-group>
        <p>{{ item.description }}</p>
      </b-col>
    </b-container>
    <template #modal-footer="">
      <b-button size="md" variant="outline-primary" @click="add(item)">
        Добавить в корзину - <b>{{ priceSelectedModifiers }} ₽</b>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapMutations } from "vuex";
import data from "@/store/data.json";
import { images } from "@/mixins";
export default {
  name: "BestsellerModal",
  mixins: [images],
  props: ["item"],
  data() {
    return {
      groupModifiers: null,
      selectedModifiers: "",
      price: 0,
    };
  },
  methods: {
    ...mapMutations({
      add: "cart/add",
    }),
  },
  computed: {
    modifiers() {
      const modifiers = this.item.groupModifiers[0].childModifiers.map(
        (item) => {
          return data.nomenclature.products.find((product) => {
            return product.id === item.modifierId;
          });
        }
      );
      this.selectedModifiers = modifiers[0].id;
      this.groupModifiers = modifiers;
      return modifiers;
    },
    priceSelectedModifiers() {
      const { price } = this.groupModifiers.find((item) => {
        return item.id === this.selectedModifiers;
      });
      return price;
    },
  },
};
</script>

<style lang="scss" scoped>
#modal-bestseller {
  .wrapper-modal {
    @media (max-width: 991px) {
      align-items: center;
      flex-direction: column;
      padding: 0;
    }
  }

  .modal-body {
    padding: 0;
  }

  .title {
    font-size: 1.2rem;
  }
}
</style>
