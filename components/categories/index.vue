<template>
  <div>
    <BaseCategory
      id="pizza"
      title="Пицца маленькая"
      :products="pizzaSmall"
      @select-item="showModal"
    />
    <BaseCategory
      id="pizza_medium"
      title="Пицца средняя"
      :products="pizzaMedium"
      @select-item="showModal"
    />
    <BaseCategory
      id="pizza_large"
      title="Пицца большая"
      :products="pizzaLarge"
      @select-item="showModal"
    />
    <BaseCategory
      id="snacks"
      title="Закуски"
      :products="snacks"
      @select-item="showModal"
    />
    <BaseCategory
      id="salad"
      title="Салаты"
      :products="salad"
      @select-item="showModal"
    />
    <BaseCategory
      id="burgers"
      title="Бургеры"
      :products="burgers"
      @select-item="showModal"
    />
    <BaseCategory
      id="hotter"
      title="Горячее"
      :products="hotter"
      @select-item="showModal"
    />
    <BaseCategory
      id="pasta"
      title="Паста"
      :products="pasta"
      @select-item="showModal"
    />
    <BaseCategory
      id="soups"
      title="Супы"
      :products="soups"
      @select-item="showModal"
    />
    <BaseCategory
      id="mussels"
      title="Мидии"
      :products="mussels"
      @select-item="showModal"
    />
    <BaseCategory
      id="desserts"
      title="Десерты"
      :products="desserts"
      @select-item="showModal"
    />
    <BaseCategory
      id="sets"
      title="Сеты"
      :products="sets"
      @select-item="showModal"
    />
    <BaseCategory
      id="rolls"
      title="Роллы"
      :products="rolls"
      @select-item="showModal"
    />
    <BaseCategory
      id="children"
      title="Детское"
      :products="children"
      @select-item="showModal"
    />
    <BaseCategory
      id="drinks"
      title="Напитки"
      :products="drinks"
      @select-item="showModal"
    />
    <ProductModal :item="activeProduct" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ProductModal from "@/components/modals/productModal";
import BaseCategory from "@/components/categories/baseCategory";

export default {
  name: "Index",
  components: { BaseCategory, ProductModal },
  data() {
    return {
      activeProduct: null,
      nomenclature: {},
    };
  },
  async fetch() {
    try {
      this.nomenclature = await this.getNomenclature();
    } catch (e) {
      console.error(e);
    }
  },
  fetchOnServer: true,
  computed: {
    pizzaSmall() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "584d0451-8a2f-40d5-a6db-9fb44b004b79"
      );
    },
    pizzaMedium() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "c7860b62-9c67-4334-8357-c48114b86d49"
      );
    },
    pizzaLarge() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "6d6361e5-e64c-46a9-8664-147a707432a6"
      );
    },
    salad() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "8fe8a68a-8695-40b7-9ee4-ea26850979e1"
      );
    },
    snacks() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "3e345d1c-b443-488d-b305-ef5311519c92"
      );
    },
    pasta() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "de5a534d-8689-4a9f-b135-f440db7cda18"
      );
    },
    soups() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "6d7ba109-b0c5-4079-8809-50e081d8edf0"
      );
    },
    mussels() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "3a16a7df-7a75-4211-9112-da4aeebbe8e7"
      );
    },
    burgers() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "b8bd47cf-acad-4a68-9d08-22c1c01658be"
      );
    },
    hotter() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "1bf43d87-2cd4-4caf-8cf5-6acf2662f371"
      );
    },
    desserts() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "2c967b0b-80a7-4d0c-bc08-ee374f6f19bc"
      );
    },
    sets() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "4bbe40c5-5171-4681-a56e-c1cf66cb332b"
      );
    },
    rolls() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "ee7bb50d-a0e3-4eb2-a411-81665702c1af"
      );
    },
    drinks() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "3987319a-bc83-4f07-8764-af55990c656d"
      );
    },
    children() {
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(
        (item) => item.parentGroup === "b9737194-2a9a-472a-b7a3-82372ef86a37"
      );
    },
  },
  methods: {
    ...mapActions({
      getNomenclature: "iiko/getNomenclature",
    }),
    showModal(payload) {
      return false;
      // this.activeProduct = payload
      // this.$bvModal.show('modal-product')
    },
  },
};
</script>

<style lang="scss" scoped></style>
