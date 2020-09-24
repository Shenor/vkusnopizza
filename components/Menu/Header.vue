<template>
    <b-container class="header justify-content-start menu">
      <nuxt-link class="navbar-brand" to="/">
        <b-img src="/dark-logo-vkusnopizza.svg" fluid alt="Fluid image"></b-img>
      </nuxt-link>
        <div class="logo-text text-left">
          <div class="title"><nuxt-link to="/">VKUSNOPIZZA</nuxt-link></div>
          <div class="sub-title"><nuxt-link to="/">лучшая пицца - по лучшей цене</nuxt-link></div>
        </div>
       <div class="info d-none d-md-block d-xl-block">
         <div class="">Доставка пиццы</div>
         <div class="city">Армавир</div>
       </div>

      <!-- Mobile menu -->
      <menu-burger :isInternalMenu="false"></menu-burger>
        <b-sidebar id="sidebar-right" class="internal-menu d-block d-sm-block d-md-none ml-auto" title="Sidebar" width="100%"  bg-variant="dark-custom" no-header right shadow>
          <div class="text-white">
            <b-container class="header justify-content-start menu">
              <a class="navbar-brand" href="/">
                <b-img src="/dark-logo-vkusnopizza.svg" fluid alt="Fluid image"></b-img>
              </a>
              <div class="logo-text text-left">
                <div class="title">VKUSNOPIZZA</div>
                <div class="sub-title">лучшая пицца - по лучшей цене</div>
              </div>

              <menu-burger :isInternalMenu="true"></menu-burger>
            </b-container>
             <b-container class=" justify-content-between">
               <div class="d-flex justify-content-center align-items-center"><b-img left src="/Ellipse.png" alt="Ellipse"></b-img> <span>Войти</span></div>
               <div class="internal-menu__map d-flex align-items-center"><b-img src="/map.svg" fluid alt="Fluid image"></b-img><span>Армавир</span></div>
             </b-container>
             <div class="internal-menu__content pt-5 pb-5">
               <b-container class=" internal-menu__navigation">
                 <li class="internal-menu__navigation__item"><nuxt-link class="text-white" to='/stocks'>Акции</nuxt-link></li>
                 <li class="internal-menu__navigation__item"><nuxt-link class="text-white" to='/contacts'>Контакты</nuxt-link></li>
                 <li class="internal-menu__navigation__item"><nuxt-link class="text-white" to='/about'>О нас</nuxt-link></li>
                 <li class="internal-menu__navigation__item"><nuxt-link class="text-white" to='#'>Личный кабинет</nuxt-link></li>
               </b-container>
             </div>
             <b-container class="internal-menu__phone justify-content-start">
                 <b-img src="/phone.svg" fluid alt="Fluid image"></b-img>
                 <span>8 918 627-55-37</span>
             </b-container>
          </div>
        </b-sidebar>
    </b-container>
</template>

<script>
import MenuBurger from '@/components/Menu/MenuBurger'
export default {
  components:{
    MenuBurger
  }
}
</script>

<style lang='scss' scoped>
  a{
    color: inherit;
    text-decoration: none;
  }
 .menu{
    padding: 10px 15px;

    .logo-text{
      margin-right: 45px;

      @media (max-width: 768px) {
        margin-right: 0;
      }
    }

    .title{
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.07em;
    }
    .sub-title{
      font-size: 9px;
      text-transform: uppercase;
    }

    .user-info{
      display: flex;

      .cart{
        display: inline-block;
        margin-top: -4px;
      }
    }

    .btn-enter{
      padding: 4px 16px;
      color: $black-color;
      border: 1px solid$black-color;
      font-size: 12px;
      max-height: 30px;

      &:hover,
      &:not(:disabled):not(.disabled):active,
      &:not(:disabled):not(.disabled):active:focus {
        border-color: $primary-color;
        box-shadow: none;
        color: $primary-color;
        background-color: transparent;
      }

      &:focus,
      &:active{
        box-shadow: none;
      }
    }
  }

  .info{
    .city{
      font-weight: 600;
      color: #EB5757;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
  }

  .toggle-menu,
  .hamburger{
    outline: none;
  }
  #sidebar-right{
    background-color: $bg-color !important;
  }
  .internal-menu{
    &__phone{
      padding: 30px 15px;

      span{
        font-size: 1.5rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-left: 15px;
      }
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
