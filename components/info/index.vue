<template>
  <div class="info">
    <b-container class="main-title mb-4 justify-content-start">Доставка и оплата</b-container>
    <b-container
      @click="isVisible = true"
      :class="{'info--isActive': isVisible }"
      class="text-left flex-column justify-content-start align-items-start info__description mb-5">
      <p>
        На сегодняшний день бесплатная доставка осуществляется нами в Краснодаре по мкр. Панорама (Смотрите на карте).
        <br>
        Доставку в другие районы вы можете заказать у наших партнеров: «Бронибой», «Яндекс Еда», «Деливери» и «Антей Сервис»
      </p>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Info",
  data(){
    return{
      isVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  &__description{
    font-size: .75rem;
    font-weight: 300;
    //height: 250px;
    position: relative;
    overflow: hidden;
    top: 0;

    //&::before{
    //  content: '';
    //  position: absolute;
    //  bottom: 0;
    //  width: 100%;
    //  height: 100px;
    //  background-image: linear-gradient(rgba(255, 255, 255, 0) 0%, #fff 100%);
    //}
  }

  &--isActive{
    height: auto;
    overflow: visible;

    &::before{
      display: none;
    }
  }
}
</style>
