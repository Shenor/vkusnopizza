<template>
  <div>
    <b-container id="combo" class="main-title mb-4 justify-content-start">{{ title }}</b-container>
    <b-container class="main-content flex-wrap mb-4">
      <b-card
        v-for="item in products"
        :key="item.key"
        :title="item.name"
        :img-src="getImageUrl(item)"
        class="mb-5"
        align="left"
        img-top
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <div class="text-right">
          <b-button href="#" variant="outline-primary" class="ml-auto">Выбрать</b-button>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { images } from '@/mixins';
export default {
  name: "baseCategory",
  mixins: [images],
  data(){
    return{

    }
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
  justify-content: start;

  @media (max-width: 1199.98px) {
    justify-content: center;
  }

  .card{
    width: 18rem;
    height: 22rem;
    border: none;
    box-shadow: 0px 4px 7px 1px rgba(0, 0, 0, 0.2);

    @media (max-width: 767.98px) {
      margin-right: 0;
      width: 24rem;
      height: auto;
    }
    @media (min-width: 768px) and (max-width: 1199.98px) {
      margin-right: 5.5%;
    }

    @media (min-width: 1199.98px) {
      &:not(:nth-child(3n)){
        margin-right: 10.5%;
      }
    }

    &-img-top{
      max-width: 150px;
      margin: auto;
      transition: all .3s;
      cursor: pointer;

      &:hover{
        transform: translate(0, 5px);
      }
    }

    &-title{
      font-weight: 600;
      font-size: 1.1rem;
    }

    &-text{
      font-size: .9rem;
      font-weight: 300;
      min-height: 65px;
      overflow: hidden
    }
  }
}
</style>
