<template>
  <div>
    <b-container class="main-title mb-4 justify-content-start">{{ title }}</b-container>
      <b-container class="main-content flex-wrap mb-4">
        <b-card
          v-for="item in products"
          :key="item.key"
          :title="item.name"
          :img-src="getImageUrl(item)"
          align="left"
          img-top
        >
          <b-card-text>
            {{ item.description || `Some quick example text to build on the card title and make up the bulk of the card's content.`}}
          </b-card-text>

          <div class="card__footer d-flex justify-content-between align-items-center mt-auto">
              <div class="card__price hide-on-mobile">{{ item.price }} ₽</div>
              <b-button href="#" variant="outline-primary" class="ml-auto hide-on-mobile" @click="addind(item)">Выбрать</b-button>
              <b-button href="#" variant="outline-primary" class="show-on-mobile" @click="addind(item)">{{ item.price }} ₽</b-button>
          </div>
        </b-card>
      </b-container>
<!-- @click="$emit('select-item', item)"-->
  </div>
</template>

<script>
import { images } from '@/mixins';
import {mapMutations} from "vuex";

export default {
  name: "baseCategory",
  mixins: [images],
  data(){
    return{}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: []
    }
  },
  methods: {
    ...mapMutations({
      add: 'cart/add'
    }),
    addind(item){
      this.add(item)
      this.$eventHub.$emit('buyEvent');
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 50px;
  column-gap: 15px;

  @include for-mobile {
    row-gap: 30px;
  }

  .card{
    border: none;
    height: 100%;

    @include for-mobile {
      flex-direction: unset;
    }

    &-body{
      display: flex;
      flex-direction: column;
      min-height: 230px;

      @include for-mobile {
        padding: 0;
        padding-left: 20px;
        min-height: unset;
      }
    }

    &-img-top{
      max-width: 270px;
      max-height: 250px;
      margin: auto;
      transition: all .3s;

      &:hover{
        transform: translate(0, 5px);
      }

      @include for-mobile {
        max-width: 150px;
        max-height: 150px;
      }
    }

    &-title{
      font-weight: 600;
      font-size: $font-size + 0.2;

      @include for-mobile {
        font-size: $font-size + 0.1;
      }
    }

    &-text{
      font-size: $font-size;
      font-weight: 300;
      min-height: 65px;
      overflow: hidden;

      @include for-mobile {
        font-size: $font-size - 0.15;
      }
    }

    &__footer{
      @include for-mobile{
        margin: 0 !important;
      }
    }

    &__price{
      font-size: $font-size + .2;
      font-weight: 600;
    }
  }
}
</style>
