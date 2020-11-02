<template>
  <div class="item mb-2" v-if="visible">
    <b-img class="item-img mr-3" :src="imageUrl(item)" fluid></b-img>
    <div class="item-body">
      <div class="item-body__title d-flex align-items-center mb-2">{{item.name}}</div>
      <div class="item-body__content">
        <div class="counter text-center">
          <span class="counter-minus" @click="deleteProduct">-</span>
          <input type="number" class="counter-quantity" contenteditable="true" :value="item.count" @blur="onBlur">
          <span class="counter-plus" @click="addProduct">+</span>
        </div>
        <span>{{totalSum}} ₽</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      visible: true
    }
  },
  props: ['item'],
  computed:{
    totalSum(){
      return this.item.count * this.item.price;
    }
  },
  methods: {
    onBlur(e){
      e.target.value > 0 && e.target.value <= 99
      ? this.$store.commit('updateCartItem', {id: this.item.id, count: e.target.value})
      : e.target.value = this.item.count
    },
    addProduct(){
      this.$store.commit('addToCart', {id: this.item.id})
    },
    deleteProduct(){
      this.$store.commit('deleteFromCart', {id: this.item.id})
    },
    imageUrl(item){
      return item.images[item.images.length - 1] ? item.images[item.images.length - 1].imageUrl : '/default.png'
    }
  }
}
</script>

<style lang="scss" scoped>
  .item{
    display: flex;
    justify-content: center;
    padding: 15px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);

    &-img{
      max-width: 25%;
      max-height: 60px;
    }

    &-body{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      &__content{
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .counter{
    display: flex;
    align-items: stretch;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    min-width: 65px;

    @media (max-width: 576px) {
      min-width: 85px;
      font-size: 1.1rem;
    }

    &-quantity{
      max-width: 30px;
      border: none;
      text-align: center;
      outline: none;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
      }
    }

    &-minus,
    &-quantity,
    &-plus{
      flex: 1;
      padding: 0 5px;
    }

    &-minus,
    &-plus{
      cursor: pointer;
    }
  }
</style>

