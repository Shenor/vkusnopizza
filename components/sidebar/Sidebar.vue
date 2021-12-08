<template>
  <b-sidebar
      id="cart-sidebar"
      :header-class="'cart-sidebar__title'"
      backdrop-variant="dark"
      :bg-variant="'white'"
      title="Корзина"
      backdrop
      right
      shadow
  >
    <client-only>
      <div class="px-3 py-4">
        <h5>{{allItem}} {{formatCount}} на {{totalSum}} ₽</h5>
        <item-cart-sidebar
          v-for="item in this.$store.getters['cart/cart']"
          :key="item.id"
          :item="item">
        </item-cart-sidebar>
      </div>
    </client-only>

    <template v-slot:footer="{}">
      <div class="text-light px-3 py-2">
        <NuxtLink to="order" class="btn-order-wrapper d-flex justify-content-between px-3 py-2">
          <span>Заказать</span>
          <span>{{totalSum}} ₽</span>
        </NuxtLink>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
import ItemCartSidebar from '@/components/sidebar/ItemCartSidebar'
export default {
  components:{
    ItemCartSidebar
  },
  computed: {
    ...mapGetters({
      totalSum: 'cart/totalSumCart',
      allItem: 'cart/allItemsCart',
    }),
    formatCount(){
      return this.allItem === 1 ? 'товар'
        : this.allItem >= 5
          ? 'товаров' : 'товара'
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep{
  #cart-sidebar{
    width: 430px;
  }
}

.bg-light{
  background-color: #fff !important;
}

.btn-order-wrapper{
  color: white;
  background: $secondary-color;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 576px) {
    font-size: 1rem;
    margin-bottom: 50px;
    padding: .8rem 1rem !important;
  }

  &:hover{
    text-decoration: none;
  }

  &:active{
    background: darken($secondary-color, 10);
  }
}

</style>
