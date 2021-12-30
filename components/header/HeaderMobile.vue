<template>
  <div>
    <menu-burger :isInternalMenu="false"></menu-burger>
    <b-sidebar id="sidebar-right" class="internal-menu d-block d-sm-block d-md-none ml-auto" title="Sidebar" width="100%"  bg-variant="dark-custom" no-header right shadow>
      <div class="text-white">
        <b-container class="header justify-content-start menu mb-4">
          <a class="navbar-brand" href="/">
            <b-img class="internal-menu__logo" src="/pizzburg_short-logo.png" fluid alt="Fluid image"></b-img>
          </a>
          <div class="logo-text text-left">
            <div class="title">PIZZBURG</div>
            <div class="sub-title">лучшая пицца - по лучшей цене</div>
          </div>

          <menu-burger :isInternalMenu="true"></menu-burger>
        </b-container>
        <b-container class=" justify-content-between">
          <div class="d-flex justify-content-center align-items-center"><b-img left src="/Ellipse.png" alt="Ellipse"></b-img> <span>Войти</span></div>
          <div id="tooltip-target-2">
            <div class="internal-menu__map d-flex align-items-center"><b-img src="/map.svg" fluid alt="Fluid image"></b-img><span>Краснодар</span></div>
            <small>доставим за 25 минут!</small>
          </div>
          <b-tooltip
            custom-class="tooltip"
            target="tooltip-target-2"
            triggers="hover">
              Мы доставляем бесплатно по мкр. «Панорама». Доставку в остальные районы
              вы можете заказать через Яндекс.Еда, Delivery, Broniboy, Антей Сервис
          </b-tooltip>
        </b-container>
        <div class="internal-menu__content pt-4 pb-4">
          <b-container class=" internal-menu__navigation">
            <li class="internal-menu__navigation__item"><NuxtLink class="text-white" to='/stocks'>Акции</NuxtLink></li>
            <li class="internal-menu__navigation__item"><NuxtLink class="text-white" to='/contacts'>Контакты</NuxtLink></li>
            <li class="internal-menu__navigation__item"><NuxtLink class="text-white" to='/about'>О нас</NuxtLink></li>
            <li class="internal-menu__navigation__item"><NuxtLink class="text-white" to='#'>Личный кабинет</NuxtLink></li>
          </b-container>
        </div>
        <b-container class="internal-menu__phone-wrapper justify-content-start">
          <div class="text-left">
            <div class="d-flex align-items-center position-relative">
              <b-img src="/phone.svg" fluid alt="Fluid image" class="position-absolute"></b-img>
              <b-link href="tel:123" class="internal-menu__phone pl-4">{{ $config.CALL_CENTER }}</b-link>
            </div>
            <small class="pl-4">звонок бесплатный!</small>
          </div>
        </b-container>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import MenuBurger from '@/components/elements/burger-menu/index'

export default {
  name: "HeaderMobile",
  components: { MenuBurger },
  methods: {
    q() {
      console.log('asdasd')
    }
  }
}
</script>

<style lang="scss" scoped>
#sidebar-right{
  background-color: $bg-color !important;
}
.toggle-menu,
.hamburger{
  outline: none;
}
.menu{
  padding: 10px 15px;
}
.internal-menu{
  &__phone-wrapper{
    padding: 30px 15px;
  }
  &__phone{
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-decoration: none;
    color: white;
  }

  &__logo{
    max-width: 50px;
  }

  &__map{
    span{
      font-weight: 600;
      margin: 0 5px;
      font-size: 16px;
      color: $primary-color;
      text-transform: uppercase;
    }
  }

  &__content{
    border-top: 0.5px solid rgba(255, 255, 255, 0.3);
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
  }
  &__navigation{
    padding: 0;
    padding-left: 80px;
    list-style: none;
    text-align: left;
    align-items: flex-start;
    flex-direction: column;

    &__item{
      margin: 10px 0;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}
</style>
