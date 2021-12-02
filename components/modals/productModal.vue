<template>
  <b-modal id="modal-product" centered size="lg">
    <b-container class='wrapper-modal' v-if="item">
      <div>
        <b-img :src="getImageUrl(item)" fluid alt="Responsive image"></b-img>
      </div>
      <div class="text-left align-self-start">
        <p class="title font-weight-semibold d-flex justify-content-between align-items-center">
          {{item.name}}
          <b-icon id="tooltip-product" icon="exclamation-circle"></b-icon></p>
        <p>{{item.description}}</p>
      </div>
      <b-tooltip
        offset="-70"
        placement="bottom"
        target="tooltip-product"
        triggers="click">
        I am tooltip <b>component</b> content!
      </b-tooltip>
    </b-container>
    <template v-slot:modal-footer="">
      <b-button size="md" variant="outline-primary" @click="adding">
        Добавить в корзину - <b> {{ item.price }} ₽</b>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapMutations } from 'vuex';
import { images } from '@/mixins';
export default {
  name: "productModal",
  mixins: [images],
  props: ['item'],
  methods: {
    ...mapMutations({
      add: 'cart/add'
    }),
    adding(){
      this.add(this.item)
      this.$bvModal.hide('modal-product')
      this.$eventHub.$emit('buyEvent');
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
  #modal-product{
    .modal-content{
      border-radius: 20px;
    }

    .wrapper-modal{
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .title{
      font-size: $font-size + .4;
    }
  }
}
</style>
