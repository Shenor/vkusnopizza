<template>
    <div class="item mb-2" v-if="visible">
      <b-img class="item-img mr-3" :src="getImageUrl(item)" fluid></b-img>
      <div class="item-body">
        <div class="d-flex justify-content-end">
          <b-icon class="item-body__icon" @click="del({id: item.id})" font-scale="1.1" icon="trash-fill"></b-icon>
        </div>
        <div class="item-body__title d-flex align-items-center mb-3">{{item.name}}</div>
        <div class="item-body__content">
          <div class="counter text-center">
            <span class="counter-minus" @click="sub({id: item.id})">-</span>
            <div class="counter-quantity">{{item.count}}</div>
            <span class="counter-plus" @click="add({id: item.id})">+</span>
          </div>
          <span>{{totalSum}} ₽</span>
        </div>
      </div>
    </div>
</template>

<script>
import { images } from '@/mixins'
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      visible: true
    }
  },
  mixins: [images],
  props: ['item'],
  computed:{
    totalSum(){
      return this.item.count * this.item.price;
    }
  },
  methods: {
    ...mapMutations({
      add: 'cart/add',
      sub: 'cart/sub',
      del: 'cart/del',
      clear: 'cart/clear',
      update: 'cart/updateItem',
    }),
    onBlur(e){
      e.target.value > 0 && e.target.value <= 99
      ? this.$store.commit('updateCartItem', {id: this.item.id, count: e.target.value})
      : e.target.value = this.item.count
    },
  }
}
</script>

<style lang="scss" scoped>
  .item{
    display: flex;
    justify-content: center;
    align-items: center;
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

      &__icon{
        cursor: pointer;
      }

      &__title{
        word-break: break-all;
      }

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

