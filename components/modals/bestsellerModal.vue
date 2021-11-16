<template>
  <b-modal id="modal-product" centered size="lg">
    <b-container class='wrapper-modal' v-if="item">
      <b-col lg="6" md="10">
        <b-img :src="getImageUrl(item)" fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col lg="6" md="10" class="text-left align-self-start">
        <p class="title font-weight-semibold">{{item.name}}</p>
        <b-form-group>
          <b-form-radio-group
            class="text-center"
            v-model="selectedModifiers"
            text-field="name"
            value-field="id"
            :options="modifiers"
            buttons
            button-variant="outline-primary"
            name="radio-btn-outline"
          ></b-form-radio-group>
        </b-form-group>
        <p>{{item.description}}</p>
      </b-col>
    </b-container>
    <template v-slot:modal-footer="">
      <b-button size="md" variant="outline-primary" @click="add(null)">
        Добавить в корзину - <b>{{priceSelectedModifiers}} ₽</b>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import data from '@/store/data.json';
import { images } from '@/mixins';
export default {
  name: "bestsellerModal",
  props: ['item'],
  mixins: [images],
  data(){
    return {
      groupModifiers: null,
      selectedModifiers: '',
      price: 0
    }
  },
  computed: {
    modifiers(){
      const modifiers = this.item.groupModifiers[0].childModifiers.map(item => {
        return data.nomenclature.products.find(product => {
          return product.id == item.modifierId
        })
      });
      this.selectedModifiers = modifiers[0].id
      this.groupModifiers = modifiers
      console.log(modifiers)
      return modifiers
    },
    priceSelectedModifiers(){
      const {price} = this.groupModifiers.find(item => {
        return item.id == this.selectedModifiers
      })
      return price
    }
  }
}
</script>

<style lang="scss" scoped>
#modal-product{
  .wrapper-modal{
    @media (max-width: 991px) {
      align-items: center;
      flex-direction: column;
      padding: 0;
    }
  }

  .modal-body{
    padding: 0;
  }

  .title{
    font-size: 1.2rem;
  }
}
</style>
