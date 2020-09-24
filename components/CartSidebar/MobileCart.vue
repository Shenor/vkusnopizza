<template>
  <div class="mobile-btn-cart d-flex d-sm-flex d-md-none">
    <cart :fill="'fff'"></cart>
    <span class="mobile-btn-cart__counter">{{getItemCountAllCart}}</span>
  </div>
</template>

<script>
import Cart from '@/components/Cart'
export default {
  data(){
    return {

    }
  },
  computed: {
    getItemCountAllCart(){
     return this.$store.getters.getItemCountAllCart;
    }
  },
  components: {
    Cart
  }
}
</script>

<style lang="scss" scoped>
.mobile-btn-cart{
  content: '';
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  bottom: 5%;
  right: 3%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: $primary-color;

  &__counter{
    content: '';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    color: white;
    border-radius: 50%;
    background-color: $secondary-color;
  }
}
</style>
