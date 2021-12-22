<template>
  <b-container class="header justify-content-start menu">
      <NuxtLink class="navbar-brand mr-4" to="/">
        <b-img class="mb-2" src="/pizzburg_logo.png" fluid alt="Fluid image"></b-img>
        <div class="sub-title text-right">Готовим вкусное настроение</div>
      </NuxtLink>
      <div class="delivery d-none d-md-block d-xl-block">
        <div class="text-left">
          Доставка пиццы
          <span class="delivery__city">Краснодар</span>
        </div>
        <div id="tooltip-target-1" class="delivery__info text-left ">всего за 25 минут!</div>
        <b-tooltip
          :delay="300"
          custom-class="delivery__tooltip"
          target="tooltip-target-1"
          triggers="hover click">
          Если не успеем доставить ваш заказ за 25 минут, <br>
          <b>вы получите сертификат на любую пиццу из меню в подарок!</b>
        </b-tooltip>
      </div>
      <div class="d-none d-md-block d-xl-block">
        <div class="font-weight-bold">{{ $config.CALL_CENTER }}</div>
        <small>звонок бесплатный</small>
      </div>
  </b-container>
</template>

<script>
export default {
  name: "HeaderDesktop",
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
a{
  color: inherit;
  text-decoration: none;
}

.navbar-brand{
  @include for-mobile{
    margin: 0 !important;
  }

  .sub-title {
    font-size: 9px;
    text-transform: uppercase;
  }

  img{
    max-width: 240px;
  }
}

.menu {
  padding: 10px 15px;

  @include for-mobile{
    padding: 5px 0px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.07em;
  }
}

.delivery{
  margin-right: 45px;

  @include for-desktop-down{
    margin-right: 20px;
  }
  &__city{
    font-weight: 600;
    color: #EB5757;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  &__info{
    font-weight: 600;
  }

  &__tooltip::v-deep{
    .tooltip-inner{
      border-radius: 10px;
      padding: .5rem .75rem;
    }
  }
}
</style>
