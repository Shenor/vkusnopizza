<template>
    <div class="menu-stickly">
      <div class="container menu-nav justify-content-start pt-3 pb-3">

        <!-- Menu navigation stickly -->
        <div class="menu-stickly__wrapper-logo">
          <NuxtLink to="/">
            <b-img class="menu-stickly__logo" src="/dark-logo-vkusnopizza.svg" fluid alt="Fluid image"></b-img>
          </NuxtLink>
        </div>
          <!-- This reason warning vue router -->
         <b-nav>
          <b-nav-item to="/#pizza">Пицца</b-nav-item>
          <b-nav-item to="/#combo">Комбо</b-nav-item>
          <b-nav-item to="/#drinks">Напитки</b-nav-item>
          <b-nav-item to="/stocks" class="d-none d-md-flex d-xl-flex">Акции</b-nav-item>
          <b-nav-item to="/contacts" class="d-none d-md-flex d-xl-flex">Контакты</b-nav-item>
          <b-nav-item to="/about" class="d-none d-md-flex d-xl-flex">О нас</b-nav-item>
        </b-nav>

        <div class="cart-wrapper ml-auto mr-3 d-none d-md-flex d-xl-flex"  v-b-toggle.cart-sidebar>
          <b-button class="btn cart-btn rounded-pill d-flex" size="md" variant="secondary" @click="enter">
            Корзина
            <div class="cart-btn__separate" v-if="getItemCountAllCart"></div>
            <div v-if="getItemCountAllCart">{{getItemCountAllCart}}</div>
          </b-button>
        </div>
        <b-alert
          class="info-buy"
          :show="dismissCountDown"
          variant="light"
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
        >
          <span>Товар добавлен в корзину</span>
        </b-alert>
        <template>
          <client-only>
            <div v-if="$store.getters.isAuthorization">
              <b-dropdown :text="$store.getters.getUser" variant="outline-primary" toggle-class="rounded-pill">
                <b-dropdown-item to="lk" exact active-class="dropdown-active">Профиль</b-dropdown-item>
                <b-dropdown-item to="/" exact active-class="dropdown-active" @click="exit">Выйти</b-dropdown-item>
              </b-dropdown>
            </div>
            <b-button v-else class="btn-enter rounded-pill d-none d-md-flex d-xl-flex" variant="outline-primary" v-b-modal.modal-enter>Войти</b-button>
          </client-only>
          <b-modal id="modal-enter" title="Личный кабинет">
                <template v-slot:default>
                  <div class="d-flex container mb-4">
                    <a href="/" class="mr-2">
                      <b-img src="/dark-logo-vkusnopizza.svg" fluid alt="Fluid image"></b-img>
                    </a>
                    <div class="logo-text text-left">
                      <div class="title">VKUSNOPIZZA</div>
                      <div class="sub-title">лучшая пицца - по лучшей цене</div>
                    </div>
                  </div>
                  <b-container class="text-left">
                    <form ref="form" @submit.stop.prevent="enter">
                      <b-alert
                        show
                        v-if="errorLogin"
                        variant="danger"><small>{{errorLogin}}</small></b-alert>
                      <b-form-group
                        label="Телефон"
                        label-for="phone-input">

                        <the-mask
                          class="form-control"
                          id="phone-input"
                          :mask="['+7 (###) ###-##-##']"
                          :masked="true"
                          :class="{'is-invalid': $v.login.phone.$error }"
                          v-model.trim="$v.login.phone.$model"
                          required />
                          <div v-if="$v.login.phone.$error">
                            <div v-if="!$v.login.phone.required" class="small text-danger px-2">Поле является обязательным</div>
                            <div v-if="!$v.login.phone.minLength" class="small text-danger px-2">Неполный номер</div>
                          </div>
                      </b-form-group>
                      <b-form-group
                        label="Пароль"
                        label-for="password-input">

                        <b-form-input
                          id="password-input"
                          :type="'password'"
                          :class="{'is-invalid': $v.login.password.$error }"
                          v-model.trim="$v.login.password.$model"
                          autocomplete="on"
                          required
                        ></b-form-input>
                         <div v-if="$v.login.password.$error">
                          <div v-if="!$v.login.password.required" class="small text-danger px-2">Поле является обязательным</div>
                         </div>
                      </b-form-group>
                    </form>
                  </b-container>
                  <div class="sub-title text-center mt-3">У вас ещё нет аккаунта? <span class="btn-link-modal" @click="$bvModal.hide('modal-enter'),$bvModal.show('modal-registration')">Зарегистрироваться</span></div>
                </template>
                <template v-slot:modal-footer>
                  <b-button size="md" variant="secondary" @click="enter">Войти</b-button>
                </template>
          </b-modal>
           <b-modal id="modal-registration" title="Регистрация">
                <template v-slot:default>
                  <div class="d-flex container mb-4">
                    <a href="/" class="mr-2">
                      <b-img src="/dark-logo-vkusnopizza.svg" fluid alt="Fluid image"></b-img>
                    </a>
                    <div class="logo-text text-left">
                      <div class="title">VKUSNOPIZZA</div>
                      <div class="sub-title">лучшая пицца - по лучшей цене</div>
                    </div>
                  </div>
                  <b-container class="text-left">
                    <form style="max-width: 236px;" ref="form" @submit.stop.prevent="enter">
                      <b-alert
                      show
                      v-if="error"
                      variant="danger"><small>{{error}}</small></b-alert>

                      <b-form-group
                        label-for="phone-input">

                        <the-mask
                          class="form-control"
                          id="phone-input"
                          :mask="['+7 (###) ###-##-##']"
                          :masked="true"
                          :class="{'is-invalid': $v.registr.phone.$error }"
                          v-model.trim="$v.registr.phone.$model"
                          placeholder="Телефон"
                          required />
                          <div v-if="$v.registr.phone.$error">
                            <div v-if="!$v.registr.phone.required" class="small text-danger px-2">Поле является обязательным</div>
                            <div v-if="!$v.registr.phone.minLength" class="small text-danger px-2">Неполный номер</div>
                          </div>
                      </b-form-group>
                      <b-form-group
                        label-for="name-input">

                        <b-form-input
                          id="name-input"
                          :type="'text'"
                          v-model.trim="$v.registr.name.$model"
                          :class="{'is-invalid': $v.registr.name.$error }"
                          placeholder="Имя"
                          autocomplete="new-login"
                          required
                        ></b-form-input>
                        <div v-if="$v.registr.name.$error">
                          <div v-if="!$v.registr.name.required" class="small text-danger px-2">Поле является обязательным</div>
                          <div v-if="!$v.registr.name.minLength" class="small text-danger px-2">Минимум {{$v.registr.name.$params.minLength.min}} симвовла</div>
                        </div>
                      </b-form-group>
                      <b-form-group
                        label-for="password-input">

                        <b-form-input
                          id="password-input"
                          :class="{'is-invalid': $v.registr.password.$error }"
                          :type="'password'"
                          v-model.trim="$v.registr.password.$model"
                          autocomplete="new-password"
                          placeholder="Пароль"
                          required
                        ></b-form-input>
                          <div v-if="$v.registr.password.$error">
                            <div v-if="!$v.registr.password.required" class="small text-danger px-2">Поле является обязательным</div>
                          </div>
                      </b-form-group>
                      <b-form-group
                        label-for="email-input">

                        <b-form-input
                          id="email-input"
                          :class="{'is-invalid': $v.registr.email.$error }"
                          :type="'email'"
                          v-model.trim="$v.registr.email.$model"
                          autocomplete="new-password"
                          placeholder="E-mail"
                          required
                        ></b-form-input>
                          <div v-if="$v.registr.email.$error">
                            <div v-if="!$v.registr.email.minLength" class="small text-danger px-2">Минимум {{$v.registr.email.$params.minLength.min}} симвовла</div>
                          </div>
                      </b-form-group>
                      <b-form-group
                        label-for="phone-input">
                        <the-mask
                          class="form-control"
                          :class="{'is-invalid': $v.registr.date.$error }"
                          id="date-input"
                          :mask="['##/##/####']"
                          :masked="true"
                          v-model.trim="$v.registr.date.$model"
                          placeholder="Дата рождения"/>
                        <div v-if="$v.registr.date.$error">
                          <div v-if="!$v.registr.date.minLength" class="small text-danger px-2">Неполная дата</div>
                        </div>
                      </b-form-group>
                    </form>
                  </b-container>
                  <div class="sub-title text-center mt-3">Уже есть аккаунт? <span class="btn-link-modal" @click="$bvModal.hide('modal-registration'),$bvModal.show('modal-enter')">Войти</span></div>
                </template>
                <template v-slot:modal-footer>
                  <b-button variant="secondary" @click="registration">Зарегистрироваться</b-button>
                </template>
          </b-modal>
        </template>
      </div>

      <!-- Sidebar Cart -->
      <Sidebar></Sidebar>

      <!-- Mobile Cart -->
      <MobileCart></MobileCart>
    </div>
</template>

<script>
import Cart from '@/components/Cart'
import Sidebar from '@/components/CartSidebar/Sidebar'
import MobileCart from '@/components/CartSidebar/MobileCart'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return{
      error: '',
      errorLogin: '',
      login: {
        phone: '',
        password: ''
      },
      registr: {
        name: '',
        date: '',
        phone: '',
        email: '',
        password: ''
      },
      state: null,
      dismissCountDown: 0,
      authorization: false
    }
  },
  async fetch() {},
  validations: {
    registr: {
      name: {
        required,
        minLength: minLength(3)
      },
      phone: {
        required,
        minLength: minLength(18)
      },
      password: {
        required
      },
      date: {
        minLength: minLength(8)
      },
      email: {
        minLength: minLength(3)
      }
    },
    login: {
      phone: {
        required,
        minLength: minLength(18)
      },
      password: {
        required
      }
    }
  },
  components:{
    Sidebar,
    MobileCart
  },
  mounted(){
    this.$nextTick(() => {
      document.addEventListener('scroll', this.onScrolling)
    });
  },
  created(){
    this.$eventHub.$on('viewBuyMsg', this.countDownChanged)
  },
  destroyed(){
    document.removeEventListener('scroll', this.onScrolling)
    this.$eventHub.$off('viewBuyMsg')
  },
  computed:{
    getItemCountAllCart(){
     return this.$store.getters["cart/allItemsCart"];
    }
  },
  methods: {
    isValidRegistrForm(){
      return (!this.$v.registr.name.$error && this.$v.registr.name.$model != '')
      && (!this.$v.registr.phone.$error && this.$v.registr.phone.$model != '')
      && (!this.$v.registr.password.$error && this.$v.registr.password.$model != '')
      && (!this.$v.registr.email.$error)
      && (!this.$v.registr.date.$error);
    },
    isValidLoginForm(){
      return (!this.$v.login.phone.$error && this.$v.login.phone.$model != '')
      && (!this.$v.login.password.$error && this.$v.login.password.$model != '')
    },
    countDownChanged() {
      this.dismissCountDown = 2
    },
    onScrolling(){
      if(document.documentElement.scrollTop > 20){
        document.querySelector('.menu-stickly').classList.add('menu-stickly--isActive');
      } else {
        document.querySelector('.menu-stickly').classList.remove('menu-stickly--isActive');
      }
    },
    async enter(){
      if(!this.isValidLoginForm()) return this.errorLogin = 'Заполните корректно форму'
      this.errorLogin = ''
      try {
        const res = await this.$http.post('login', {
          phone: this.$v.login.phone.$model.split(' ').join(''),
          password: this.$v.login.password.$model
        })
        const data = await res.json();
        this.username = data.user;
        this.$store.commit('login', data);
        this.$bvModal.hide('modal-enter')
      } catch (err) {
        this.errorLogin = 'Неверный телефон/пароль'
      }
    },
    async registration(){
     if(!this.isValidRegistrForm()) return this.error = 'Заполните корректно форму'
     this.error = ''
     try {
      const res = await this.$http.post('users', {
        name: this.$v.registr.name.$model,
        date: this.$v.registr.date.$model,
        email: this.$v.registr.email.$model,
        phone: this.$v.registr.phone.$model.split(' ').join(''),
        password: this.$v.registr.password.$model
      })
      const data = await res.json();
      // this.$store.commit('login', data.token);
      this.$bvModal.hide('modal-registration')
      this.$bvModal.show('modal-enter')
     } catch (error) {
      console.error(error);
     }
    },
    exit(){
      this.$store.commit('logout')
    },
  }
}
</script>

<style lang="scss" scoped>
  .menu-stickly{
    width: 100%;
    position: sticky;
    top: 0;
    background: white;
    z-index: 3;

    &__wrapper-logo{
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      font-size: 0px;
      line-height: 0;
      position: relative;
      width: 52px;
      padding-right: 16px;
      height: 36px;
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

  .nav-link{
    line-height: 17px;
    color: #212121;

    &:hover,
    &.active{
      color: $primary-color;
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

  .btn-link-modal{
    cursor: pointer;
    color: $primary-color;
  }

  .info-buy{
    position: absolute;
    bottom: -65px;
    right: 15%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    color: white;
    border: none;
    box-shadow: 0px 4px 7px 1px rgba(0, 0, 0, 0.2);

     @media (max-width: 768px) {
      width: 240px;
      right: 50%;
      transform: translate(50%, 0)
     }
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
