<template>
  <div>
      <BaseCategory id="pizza" title="Пицца маленькая" :products="pizzaSmall" @select-item="showModal"/>
      <BaseCategory id="pizza_medium" title="Пицца средняя" :products="pizzaMedium" @select-item="showModal"/>
      <BaseCategory id="pizza_large" title="Пицца большая" :products="pizzaLarge" @select-item="showModal"/>
      <BaseCategory id="snacks" title="Закуски" :products="snacks" @select-item="showModal"/>
      <BaseCategory id="salad" title="Салаты" :products="salad" @select-item="showModal"/>
      <BaseCategory id="burgers" title="Бургеры" :products="burgers" @select-item="showModal"/>
      <BaseCategory id="hotter" title="Горячее" :products="hotter" @select-item="showModal"/>
      <BaseCategory id="pasta" title="Паста" :products="pasta" @select-item="showModal"/>
      <BaseCategory id="desserts" title="Десерты" :products="desserts" @select-item="showModal"/>
      <ProductModal :item="activeProduct" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ProductModal from '@/components/modals/productModal'
import BaseCategory from "@/components/categories/baseCategory";

export default {
  name: "index",
  components: { BaseCategory, ProductModal },
  data() {
    return {
      activeProduct: null,
      nomenclature: {},
    }
  },
  async fetch(){
    try {
      this.nomenclature = await this.getNomenclature();
    } catch (e){
      console.error(e)
    }
  },
  fetchOnServer: true,
  methods: {
    ...mapActions({
      getNomenclature: 'iiko/getNomenclature',
    }),
    showModal(payload){
      this.activeProduct = payload
      this.$bvModal.show('modal-product')
    }
  },
  computed: {
    pizzaSmall(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === '584d0451-8a2f-40d5-a6db-9fb44b004b79')
    },
    pizzaMedium(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === 'c7860b62-9c67-4334-8357-c48114b86d49')
    },
    pizzaLarge(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === '6d6361e5-e64c-46a9-8664-147a707432a6')
    },
    salad(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === '8fe8a68a-8695-40b7-9ee4-ea26850979e1')
    },
    snacks(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === '3e345d1c-b443-488d-b305-ef5311519c92')
    },
    pasta(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === 'de5a534d-8689-4a9f-b135-f440db7cda18')
    },
    burgers(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === 'b8bd47cf-acad-4a68-9d08-22c1c01658be')
    },
    hotter(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === '1bf43d87-2cd4-4caf-8cf5-6acf2662f371')
    },
    desserts(){
      if (!Object.keys(this.nomenclature).length) return [];
      return this.nomenclature.products.filter(item => item.parentGroup === '2c967b0b-80a7-4d0c-bc08-ee374f6f19bc')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
