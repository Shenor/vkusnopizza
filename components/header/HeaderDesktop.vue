<template>
  <b-container class="header justify-content-start menu">
      <NuxtLink class="navbar-brand mr-4" to="/">
        <b-img src="/pizzburg_logo.png" fluid alt="Fluid image"></b-img>
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
        <div class="font-weight-bold">8 (800)-000-00-00</div>
        <small>звонок бесплатный</small>
      </div>
  </b-container>
</template>

<script>
export default {
  name: "HeaderDesktop"
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

  img{
    max-width: 220px;
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

  .sub-title {
    font-size: 9px;
    text-transform: uppercase;
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
