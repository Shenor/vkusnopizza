<template>
  <b-sidebar id="cart-sidebar" :header-class="'cart-sidebar__title'" :bg-variant="'white'" title="Корзина" right shadow>
    <template v-slot:footer="{}">

      <div class="text-light px-3 py-2">
        <NuxtLink to="order" class="btn-order-wrapper d-flex justify-content-between px-3 py-2">
          <span>Заказать</span>
          <span>{{totalSumCart}} ₽</span>
        </NuxtLink>
      </div>
      </template>
    <div class="px-3 py-4">
      <item-cart-sidebar
       v-for="item in this.$store.getters['cart/cart']"
       :key="item.key"
       :item="item">
      </item-cart-sidebar>
    </div>
  </b-sidebar>
</template>

<script>
import ItemCartSidebar from '@/components/CartSidebar/ItemCartSidebar'
export default {
  components:{
    ItemCartSidebar
  },
  computed: {
    totalSumCart(){
      return this.$store.getters["cart/totalSumCart"];
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
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
