<template>
  <div class="banner mb-5">
    <b-container class="flex-column text-white align-items-center">
      <div class="banner__title mb-3">Мы доставляем бесплатно по мкр. «Панорама»</div>
      <div class="banner__text">
        Доставку в остальные районы вы можете заказать
        через Яндекс.Еда, Delivery, Broniboy, Антей Сервис.
      </div>
      <div class="banner__text">Приносим свои извинения за доставленные неудобства</div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "NoticeBanner"
}
</script>

<style lang="scss" scoped>
.banner{
  background-color: $secondary-color;
  height: 200px;

  @include for-mobile{
    padding: 25px 0;
    height: auto;
  }

  .container{
    height: 100%;
  }

  &__title{
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 600;

    span{
      font-weight: 300;
    }
  }

  &__text{
    font-size: 1rem;
    font-weight: 300;
  }
}
</style>
