<template>
  <div>
    <b-container class="main-title mb-4 justify-content-start">{{ title }}</b-container>
<!--    <client-only>-->
      <b-container class="main-content flex-wrap mb-4">
        <b-card
          v-for="item in products"
          :key="item.key"
          :title="item.name"
          :img-src="getImageUrl(item)"
          @click="$emit('select-item', item)"
          align="left"
          img-top
        >
          <b-card-text>
            {{ item.description || `Some quick example text to build on the card title and make up the bulk of the card's content.`}}
          </b-card-text>

          <div class="card__footer d-flex justify-content-between align-items-center mt-auto">
              <div class="card__price hide-on-mobile">{{ item.price }} ₽</div>
              <b-button href="#" variant="outline-primary" class="ml-auto hide-on-mobile">Выбрать</b-button>
              <b-button href="#" variant="outline-primary" class="show-on-mobile">{{ item.price }} ₽</b-button>
          </div>
        </b-card>
      </b-container>
<!--     s-->
<!--    </client-only>-->
  </div>
</template>

<script>
import { images } from '@/mixins';

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
    cursor: pointer;
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

    @media (max-width: 767.98px) {
      //margin-right: 0;
      //width: 24rem;
      //height: auto;
    }
    @media (min-width: 768px) and (max-width: 1199.98px) {
      //margin-right: 5.5%;
    }

    @media (min-width: 1199.98px) {
      //&:not(:nth-child(3n)){
      //  margin-right: 10.5%;
      //}
    }

    &-img-top{
      max-width: 270px;
      max-height: 240px;
      margin: auto;
      transition: all .3s;
      cursor: pointer;

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
