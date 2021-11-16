<template>
  <div class="banner d-none d-md-flex d-xl-flex mb-5">
    <b-container class="flex-column text-white align-items-center">
      <div class="banner__title mb-3">Бесплатная доставка <span>от 600 руб.</span></div>
      <div class="banner__text">сделай заказ и получи подарок</div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "DeliveryBanner"
}
</script>

<style lang="scss" scoped>
.banner{
  background-color: $secondary-color;
  height: 200px;

  .container{
    height: 100%;
  }

  &__title{
    font-size: 1.6rem;
    text-transform: uppercase;
    font-weight: 600;

    span{
      font-weight: 300;
    }
  }

  &__text{
    font-size: 1.3rem;
    font-weight: 300;
  }
}
</style>
