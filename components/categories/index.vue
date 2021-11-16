<template>
  <div>
    <BaseCategory title="Комбо" :products="combo"/>
    <BaseCategory title="Пицца" :products="pizza"/>
    <BaseCategory title="Напитки" :products="drink"/>
  </div>
</template>

<script>
import data from '@/store/data.json';
import BaseCategory from "@/components/categories/baseCategory";
export default {
  name: "index",
  components: { BaseCategory },
  data() {
    return {
      combo: [
        {id: 7, name: 'Комбо 3 в 1', price: '599', images: [{imageUrl: "/combo.png"}]},
        {id: 8, name: 'Комбо на двоих', price: '599', images: [{imageUrl: "/combo.png"}]},
        {id: 9, name: 'Комбо на компанию', price: '599', images: [{imageUrl: "/combo.png"}]},
        {id: 10, name: 'Комбо максимум', price: '599', images: [{imageUrl: "/combo.png"}]},
        {id: 11, name: 'Комбо медиум', price: '599', images: [{imageUrl: "/combo.png"}]},
        {id: 12, name: 'Комбо лоу', price: '599', images: [{imageUrl: "/combo.png"}]},
        {id: 13, name: 'Комбо экспресс', price: '599', images: [{imageUrl: "/combo.png"}]},
        {id: 14, name: 'Комбо экспресс', price: '599', images: [{imageUrl: "/combo.png"}]}
      ],
      pizza: [
        {id: 1, name: 'Пицца 4 сезона', price: '350', images: [{imageUrl: "/combo.png"}]},
        {id: 2, name: 'Пицца 4 сыра', price: '250', images: [{imageUrl: "/combo.png"}]},
        {id: 3, name: 'Пицца Аспромонте', price: '550', images: [{imageUrl: "/combo.png"}]},
        {id: 4, name: 'Пицца Болоньезе', price: '650', images: [{imageUrl: "/combo.png"}]},
        {id: 5, name: 'Пицца Вегетарианская', price: '250', images: [{imageUrl: "/combo.png"}]},
        {id: 6, name: 'Пицца Фирменная', price: '450', images: [{imageUrl: "/combo.png"}]},
      ],
      drink: data.nomenclature.products.filter(i => i.productCategoryId == 'f07bedd4-fbfa-4203-0174-be6eb197baf5')
    }
  },

}
</script>

<style lang="scss" scoped>

</style>
