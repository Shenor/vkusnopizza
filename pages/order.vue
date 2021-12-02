<template>
  <div class="container order mb-5">
    <div class="row">
      <div class="col col-12">
        <h2 class="order__title text-left">Оформление заказа</h2>
        <div class="row order__content-wrapper col col-12" v-if="!succesPaymnet">
          <div class="order__body-wrapper d-flex flex-column text-left col col-lg-8 col-md-7 col-sm-12">
            <div class="order__body">
              <b-form-group>
                <b-form-radio-group
                  id="btn-radios-2"
                  v-model="selected"
                  :options="options"
                  buttons
                  button-variant="outline-primary"
                  name="radio-btn-outline"
                ></b-form-radio-group>
              </b-form-group>

              <div class="order__body__list-adress" v-show="selected == 'delivery'">
                <div class="font-weight-semibold mb-2">Адреса доставки</div>
                <b-form-group>
                  <client-only>
                    <div v-if="$store.getters.isAuthorization">
                      <b-form-radio
                        v-model="activeAdress"
                        name="some-radios"
                        value="A"
                        v-for="item in listAdress"
                        :key="item.message">{{fullAdress(item)}}</b-form-radio>
                    </div>
                  </client-only>
                  <b-form-radio class="pt-2" v-model="activeAdress" name="some-radios" value="С">Новый адрес</b-form-radio>
                </b-form-group>
              </div>

              <div v-show="selected == 'delivery'">
                <div class="order__body__adress mb-4" v-show="activeAdress == 'С'">
                  <b-form-group
                    :state='streetState'
                    label-for="street"
                    invalid-feedback="Данная улица не найдена">
                    <b-form-input class="pt-3 pb-3 mb-2" id="street" :class="{'is-invalid': $v.adress.street.$error }" v-model.trim="$v.adress.street.$model" placeholder="Введите улицу" autocomplete="off"></b-form-input>
                  </b-form-group>
                  <div class="d-flex">
                    <b-form-input class="pt-3 pb-3 mr-2" :class="{'is-invalid': $v.adress.home.$error }" v-model.trim="$v.adress.home.$model" placeholder="Дом"></b-form-input>
                    <b-form-input class="pt-3 pb-3 mr-2" placeholder="Подъезд"></b-form-input>
                    <b-form-input class="pt-3 pb-3"  placeholder="Квартира"  v-model.trim="adress.apartment"></b-form-input>
                  </div>
                </div>
              </div>

              <div class="font-weight-semibold mb-2">Способ оплаты</div>
              <b-form-group>
                <b-form-radio v-model="paymentType" name="payment-radios" value="CASH">Наличными</b-form-radio>
                <b-form-radio v-model="paymentType" name="payment-radios" value="CARD">Картой онлайн</b-form-radio>
                <b-form-radio v-model="paymentType" name="payment-radios" value="CARD1">Картой при получении</b-form-radio>
              </b-form-group>
            </div>

            <div class="order__footer">
              <div class="mb-1">Доставка: {{delivery}} ₽</div>
              <div class="mb-3">Итого: {{totalSumCart}} ₽</div>
              <b-alert
                show
                class="error-alert"
                v-if="error"
                variant="danger"><small>{{error}}</small></b-alert>
              <div class="order__footer__btn-action d-flex px-3 py-2 mb-2" :class="[loading ? 'justify-content-center':'justify-content-between']" @click="createOrder">
                <b-spinner v-if="loading" style="width: 1.3rem; height: 1.3rem;" variant="light" label="Spinning"></b-spinner>
                <span v-if="!loading">Заказать</span>
                <span v-if="!loading">{{totalSumCart}} ₽</span>
              </div>
              <div class="text-muted">*Нажимая кнопку 'Заказать' вы соглашаетесь с политикой
              конфиденциальности и  публичной офертой</div>
            </div>
          </div>

          <div class="order__cart d-none d-md-block d-xl-block text-left col col-lg-4  col-md-5">
            <div class="order__cart-title text-right mb-3">Корзина</div>
            <div class="order__cart-list">
              <item-cart-sidebar
                class="order__cart-list__item"
                v-for="item in this.$store.state.cart"
                :key="item.key"
                :item="item">
              </item-cart-sidebar>
            </div>
          </div>
        </div>
        <div class="row order__content-wrapper col col-12 d-block" v-if="succesPaymnet">
          <h3 class="restore-order__form-success-title"> Спасибо за заказ </h3>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 80 80" class="pt-5 pb-5" style="max-width: 150px;">
              <path fill="#bae0bd" d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z" />
              <path fill="#5e9c76"
                  d="M40,3c20.4,0,37,16.6,37,37S60.4,77,40,77S3,60.4,3,40S19.6,3,40,3 M40,2C19,2,2,19,2,40s17,38,38,38 s38-17,38-38S61,2,40,2L40,2z" />
              <path fill="#fff" d="M34 56L20.2 42.2 24.5 38 34 47.6 58.2 23.4 62.5 27.6z" />
          </svg>
          <div class="" style="max-width: 70%; margin: 0 auto;">
            <div>Ваш заказ принят в обработку</div>
            <div class="mt-3 mb-3">
                Номер заказа: {{succesPaymnet.number}} <br>
                Время заказа: {{succesPaymnet.createdTime}}
            </div>
            <div>В ближайшее время с вами свяжутся для уточнения деталей и подтвержения заказа</div>
            <div>
                Если после оплаты заказа у Вас вознили технические проблемы или Вы обнаружили ошибку (ФИО/адрес/номер и д.р),
                обратитесь по номеру + 7 (918) 627-55-37
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCartSidebar from '@/components/sidebar/ItemCartSidebar'
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      user: null,
      error: null,
      succesPaymnet: false,
      loading: false,
      listAdress: [
        {street: 'Краснодар, Восточно-Кругликовская', home: '53', apartments: '1'},
        {street: 'Краснодар, Caдовая', home: '112', apartments: '23'},
      ],
      adress: {
        city: 'Армавир',
        street:'',
        home: '',
        entrance: '',
        apartment: ''
      },
      activeAdress: 'С',
      delivery: 0,
      nomenclature: null,
      streetState: true,
      paymentType: 'CASH',
      selected: 'delivery',
      options: [
          { text: 'Доставка', value: 'delivery' },
          { text: 'Самовывоз', value: 'selfService' }
      ]
    }
  },
  validations: {
    adress: {
      home: {
        required
      },
      street: {
        required
      }
    }
  },
  components: {
    ItemCartSidebar
  },
  async mounted(){

    if(this.$store.getters.isAuthorization){
      this.$http.setToken(this.$store.getters.getToken)
      const {user} = await this.$http.$get(`users`)
      this.user = user;
    }
    this.$nextTick(function () {
      //this.dataApi();
      $('#street').fias({
        type: $.fias.type.street,
        parentType: $.fias.type.city,
        parentId: 2300000100000,
        spinner: false,
        verify: true,
        select: function () {
          $('#street').val('');
        },
        check: (city) => {
          if(!city) return this.streetState = false
          this.adress.street = city.name
          this.streetState = true
        },
        change: (city) => {
          this.adress.street = city.name
        }
      })
    });
  },
  computed: {
    totalSumCartWithDelivery(){
      return this.$store.getters["cart/totalSumCart"] + this.delivery
    },
    totalSumCart(){
      return this.$store.getters["cart/totalSumCart"]
    }
  },
  methods: {
    isValidForm(){
      return (!this.$v.adress.home.$error && this.$v.adress.home.$model != '')
      && (!this.$v.adress.street.$error && this.$v.adress.street.$model != '')
    },
    fullAdress(adress){
      return `${adress.street}, д. ${adress.home}, кв. ${adress.apartments}`
    },
    async createOrder({env}){
      // if(!this.$store.getters.isAuthorization) return this.$bvModal.show('modal-enter')
      // if(!this.isValidForm()) return this.error = 'Некорректно заполнена форма'
      // this.error = null
      this.loading = true;

      // const transformCart = () => {
      //   let cart = this.$store.getters.getCart.filter(({type}) => {return type != 'modifier'})
      //   const modifier = new Map();
      //   this.$store.getters.getCart
      //     .filter(({type}) => {return type == 'modifier'})
      //     .forEach(item => {
      //       modifier.set(item.id, {
      //         id: item.id,
      //         name: item.name,
      //         amount: item.count,
      //         groupId: item.groupId,
      //         groupName: 'Групповой модификатор'
      //       });
      //   });
      //   const candidateCart = this.nomenclature.products.filter(item => {
      //     return item.type == 'dish' && item.groupModifiers[0]
      //   });
      //   candidateCart
      //     .filter((item) => {
      //       item.groupModifiers[0].childModifiers.forEach((mod) => {
      //         if(modifier.get(mod.modifierId)){
      //           item.modifiers.push(modifier.get(mod.modifierId))
      //         }
      //       })
      //       return item
      //     })
      //     .filter(({modifiers}) => {return modifiers.length != 0})
      //     .forEach(item => cart.push({...item, count: 1}));
      //   console.log(cart)
      //   return cart
      // };

      if(this.paymentType == "CARD"){}

      await new Promise(resolve => setTimeout(resolve, 3000))
      this.succesPaymnet = {
        number: Math.floor(Math.random() * Math.floor(5000)),
        createdTime: new Date().toLocaleString()
      }
      this.loading = false;
    },
    async dataApi(){
      this.$http.setHeader('Organization')
      const nomenclature = await this.$http.$get()
      this.nomenclature = nomenclature;
    }
  }
}
</script>

<style lang='scss' scoped>
  .order{
    display: block;
    padding: 25px;
    background-color: #F9F9F9;
    border-radius: 10px;
    min-height: 80vh;

    &__title{
      font-weight: 600;
      font-size: 2.1rem;
      margin-top: 10px;
      margin-bottom: 40px;
    }

    &__content-wrapper{
      min-height: 65vh;
      margin: auto;
      background-color: #fff;
      border-radius: 20px;
      padding: 20px;
      overflow: hidden;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.13);
    }

    &__body{
      flex-grow: 1;

      &__adress{
        max-width: 350px;
        min-width: 200px;

        input{
          height: auto;
          border-radius: 10px;

          &::placeholder{
            opacity: .3;
          }
        }
      }
    }

    &__footer{
      flex-grow: 0;

      .text-muted{
        font-size: .6rem;
        line-height: 1.5;
      }

      &__btn-action{
        color: white;
        background: $secondary-color;
        border-radius: 5px;
        cursor: pointer;
        max-width: 350px;
        min-width: 200px;

          @media (max-width: 576px) {
            font-size: 1rem;
            padding: .8rem 1rem !important;
          }

        &:hover{
          text-decoration: none;
        }

        &:active{
          background: darken($secondary-color, 10);
        }
      }

      .error-alert{
        max-width: 350px;
        min-width: 200px;
      }
    }

    &__cart{
      position: relative;
      border-left: 1.5px solid #e2e2e2;

      &-title{
        opacity: .7;
        font-size: 1.1rem;
        letter-spacing: 0.03em;
      }

      &-list{
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0 10px;
        height: 100%;

        &__item{
          margin-left: auto;
        }
      }
    }
  }
</style>
