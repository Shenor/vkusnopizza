<template>
    <div class="menu-stickly">
      <div class="container menu-nav justify-content-start pt-3 pb-3 overflow-mobile">
        <!-- Menu navigation stickly -->
        <div class="menu-stickly__wrapper-logo">
          <NuxtLink to="/">
            <b-img class="menu-stickly__logo" src="/pizzburg_short-logo.png" fluid alt="Fluid image"></b-img>
          </NuxtLink>
        </div>

        <!-- This reason warning vue router -->
        <Menu />

        <div class="cart-wrapper ml-auto mr-3 d-none d-md-flex d-xl-flex"  v-b-toggle.cart-sidebar>
          <client-only>
            <b-button class="btn cart-btn rounded-pill d-flex" size="md" variant="secondary">
              Корзина
              <div class="cart-btn__separate" v-if="allItemsCart"></div>
              <div v-if="allItemsCart">{{allItemsCart}}</div>
            </b-button>
          </client-only>
        </div>

        <client-only>
          <div v-if="user">
            <b-dropdown class="d-none d-md-flex d-xl-flex" :text="user.name" variant="outline-primary" toggle-class="rounded-pill">
              <b-dropdown-item to="profile" exact active-class="dropdown-active">Профиль</b-dropdown-item>
              <b-dropdown-item to="/" exact active-class="dropdown-active" @click="logout">Выйти</b-dropdown-item>
            </b-dropdown>
          </div>
          <b-button v-else class="btn-enter rounded-pill d-none d-md-flex d-xl-flex" variant="outline-primary" v-b-modal.modal-code>Войти</b-button>
        </client-only>
      </div>

      <CodeForm />

      <AlertAddItem />

      <client-only>
        <!-- Sidebar Cart -->
        <Sidebar></Sidebar>

        <!-- Mobile Cart -->
        <MobileCart></MobileCart>
      </client-only>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from '@/components/menu/Menu'
import CodeForm from '@/components/forms/Code'
import AlertAddItem from '@/components/elements/alerts'
import Sidebar from '@/components/sidebar/Sidebar'
import MobileCart from '@/components/sidebar/MobileCart'

export default {
  data() {
    return{
      error: '',
      state: null,
      authorization: false
    }
  },
  components:{
    Menu,
    Sidebar,
    CodeForm,
    MobileCart,
    AlertAddItem
  },
  mounted(){
    this.$nextTick(() => {
      document.addEventListener('scroll', this.onScrolling)
    });
  },
  destroyed(){
    document.removeEventListener('scroll', this.onScrolling)
  },
  computed:{
    ...mapGetters({
      user: 'account/user',
      allItemsCart: 'cart/allItemsCart'
    }),
  },
  methods: {
    ...mapActions({
      logout: 'account/logout'
    }),
    onScrolling(){
      if(document.documentElement.scrollTop > 20){
        document.querySelector('.menu-stickly').classList.add('menu-stickly--isActive');
      } else {
        document.querySelector('.menu-stickly').classList.remove('menu-stickly--isActive');
      }
    },
    exit(){
      this.$store.commit('logout')
    },
  }
}
</script>

<style lang="scss" scoped>
  .overflow-mobile{
    @include for-mobile {
      overflow: hidden;
    }
  }

  .menu-stickly{
    width: 100%;
    position: sticky;
    top: 0;
    background: white;
    z-index: 3;

    //@include for-mobile{
    //  overflow: hidden;
    //}

    &__wrapper-logo{
      display: flex;
      align-items: center;
      overflow: hidden;
      font-size: 0px;
      line-height: 0;
      position: relative;
      width: 50px;
      min-width: 50px;
      padding-right: 10px;
      height: 36px;
      z-index: 1;
    }

    &__logo{
      transform: translateX(-55px);
      transition: transform 0.25s ease 0s;
    }
  }

  .menu-stickly--isActive{
    border-bottom: 1px solid #CBCFD4;

    .menu-stickly__logo{
      transform: translateX(0);
    }

    .nav{
      transform: translateX(0);
    }
  }

  .nav{
    transform: translateX(-55px);
    transition: transform 0.25s ease 0s;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  .cart-wrapper{
    position: relative;
  }

  .cart__counter{
    content: '';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    right: 50%;
    transform: translate(50%, -17%);
    width: 15px;
    height: 15px;
    color: white;
    border-radius: 50%;
    font-size: .7rem;
    background-color: #212121;
    pointer-events: none;
  }

  .btn-link-modal{
    cursor: pointer;
    color: $primary-color;
  }

  .cart-btn{
    background: $primary-color;
    border-color: $primary-color;
    font-size: $font-size;
    transition: all .3s;
    padding: 6px 18px;

    &:hover{
      background: darken($primary-color, 5);
    }

    &__separate{
      height: 22px;
      width: 1px;
      margin: 0px 12px;
      background: rgb(255, 255, 255);
      opacity: 0.4;
    }
  }
</style>
