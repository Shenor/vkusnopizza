<template>
  <div class="main container d-block pt-3">
    <client-only>
      <b-card no-body>
        <b-tabs pills card vertical end class="text-left">

          <!-- Личные данные (1 раздел) -->
          <b-tab title="Личные данные"><b-card-text>
            <h3 class="mb-3">Личный кабинет</h3>
            <div class="privat-data" v-if="user">
              <client-only>
                <div class="mb-3">
                  <div class="privat-data__title font-weight-semibold">Имя: </div>
                  <b-input-group
                    v-click-outside="hideName">
                    <template #append>
                      <b-input-group-text v-if="!name.isEdit" @click="name.isEdit = true">Изменить</b-input-group-text>
                      <b-input-group-text class="btn" v-if="name.isEdit" @click="updateName">Сохранить</b-input-group-text>
                    </template>
                    <b-form-input ref="name" class="privat-data__input" :value="user.name" :disabled="!name.isEdit"></b-form-input>
                  </b-input-group>
                </div>
                <div class="mb-3">
                  <div class="privat-data__title font-weight-semibold">Номер телефона: </div>
                  <b-input-group>
                    <b-form-input class="privat-data__input" :value="user.phone" disabled></b-form-input>
                  </b-input-group>
                </div>
                <div class="mb-5">
                  <div class="privat-data__title font-weight-semibold">Email: </div>
                  <b-input-group v-click-outside="hideEmail">
                    <template #append>
                      <b-input-group-text v-if="!email.isEdit" @click="email.isEdit = true">Изменить</b-input-group-text>
                      <b-input-group-text class="btn" v-if="email.isEdit" @click="updateEmail">Сохранить</b-input-group-text>
                    </template>
                    <b-form-input ref="email" class="privat-data__input" :value="user.email" :disabled="!email.isEdit"></b-form-input>
                  </b-input-group>
                </div>
              </client-only>
              <div>
                <b-button variant="outline-danger" @click="exitProfile">Выйти из профиля</b-button>
              </div>
            </div>
          </b-card-text></b-tab>

          <!-- Адреса доставки (2 раздел) -->
<!--          <b-tab title="Адреса доставки"><b-card-text>-->
<!--            <h3>Адреса доставки</h3>-->
              <!-- <b-input-group>
                <b-form-input type="text"></b-form-input>

                <b-input-group-append>
                  <b-input-group-text>
                    <img src="https://img.icons8.com/windows/22/000000/edit.png"/>
                  </b-input-group-text>
                  <b-input-group-text>
                    <img src="https://img.icons8.com/windows/22/000000/delete-forever.png"/>
                  </b-input-group-text>
                </b-input-group-append>
              </b-input-group> -->
<!--          </b-card-text></b-tab>-->

          <!-- Мои заказы (3 раздел) -->
          <b-tab title="Мои заказы"><b-card-text>
            <h3 class="mb-3">Мои заказы</h3>
            <div class="history-order-wrapper" v-for="order in ordersReverse" :key="order.id">
              <div class="history-order-item">
                <b-badge v-if="isStatusPayment(order, 'succeeded')" variant="success">Заказ принят</b-badge>
<!--                <b-badge v-else-if="isStatusPayment(order, 'pending')" variant="warning">Ожидание</b-badge>-->
                <b-badge v-else-if="isStatusPayment(order, 'canceled')" variant="danger">Заказ отменён</b-badge>
<!--                <b-badge v-else variant="success">Выполнен</b-badge>-->
                <div class="order-info">
                  <div>
                    <div class="order-info__date">№ {{order.number}}</div>
                    <div class="order-info__date">{{ formatDateTime(order.date) }}</div>
                    <span class="order-info__method">{{ order.isSelfService ? 'самовывоз' : 'доставка'}}</span>
                  </div>
                  <div class="order-totalSum">{{ totalSum(order.cart) }} ₽</div>
                </div>
                <div class="order-list text-center">
                  <div class="order-list__item" v-for="item in order.cart" :key="item.message">
                    <b-img class="order-list__item-img" :src='getImageUrl(item)'></b-img>
                    <div class="order-list__item-text">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </client-only>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { images } from '@/mixins'
import {mapActions, mapGetters} from "vuex";

export default {
  data(){
    return{
      orders: [],
      name: {
        isEdit: false
      },
      email: {
        isEdit: false
      },
      items: [
        {id: 1, title: 'Пицца 4 сезона', price: '350'},
        {id: 2, title: 'Пицца 4 сыра', price: '250'},
        {id: 3, title: 'Пицца Аспромонте', price: '550'},
        {id: 4, title: 'Пицца Болоньезе', price: '650'},
        {id: 5, title: 'Пицца Вегетарианская', price: '250'},
        {id: 6, title: 'Пицца Фирменная', price: '450'},
      ]
    }
  },
  mixins: [images],
  middleware: 'auth',
  methods: {
    ...mapActions({
      logout: 'account/logout',
      setName: 'account/setName',
      setEmail: 'account/setEmail',
    }),
    exitProfile(){
      this.logout();
      this.$router.push('/');
    },
    isStatusPayment(order, status){
      if(order.paymentType === 'CASH') return true;
      return order.yandexPayment
        && order.yandexPayment.status === status;
    },
    totalSum(cart){
      return cart.reduce((sum, item) => {
        return sum + item.amount * item.sum;
      }, 0);
    },
    formatDateTime(time){
      return new DateTime.fromSQL(time, {locale: 'ru'}).toFormat('dd MMMM yyyy HH:mm')
    },
    updateName(){
      this.setName(this.$refs.name.$el.value)
      this.hideName();
    },
    updateEmail(){
      this.setEmail(this.$refs.email.$el.value)
      this.hideEmail();
    },
    hideName(){
      this.name.isEdit = false
    },
    hideEmail(){
      this.email.isEdit = false
    }
  },
  computed: {
    ...mapGetters({
      user: 'account/user'
    }),
    ordersReverse() {
      return this.orders.reverse()
    }
  },
  async mounted(){
    this.orders = await this.$strapi.$orders.find({phone: this.user.phone});
  },
}
</script>

<style lang='scss' scoped>
  .main{
    min-height: 100vh;
  }
  .privat-data{

    &__title{
      min-width: 150px;
    }

    &__input{
      max-width: 250px;
    }
  }
  .history-order-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .history-order-item{
    position: relative;
    width: 95%;
    min-height: 100px;
    box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-bottom: 35px;
  }
  .order-info{
    display: flex;
    color: rgba(0, 0, 0, 0.7);
    padding: 35px 15px 15px 15px;
    justify-content: space-between;
    background-color: whitesmoke;

    &__method{
      font-weight: 700;
      letter-spacing: 0.03em;
    }
  }
  .order-list{
    position: relative;
    display: flex;
    overflow: hidden;
    max-width: 100%;
    padding: 10px 15px;

    @media (max-width: 576px) {
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

    &::after{
      content: '';
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: 0;
      width: 10%;
      z-index: 2;
      padding: 9px 53.3333px 20px;
      pointer-events: none;
      background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);

      @media (max-width: 576px) {
        display: none;
      }
    }

    &__item{
      min-width: 90px;
      width: 130px;
      margin-right: 5px;

      @media (max-width: 576px) {
       margin-right: 0;
      }

      &-img{
        max-width: 90%;
      }
      &-text{
        font-weight: 300;
      }
    }
  }
  .order-totalSum{
    align-self: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .link-exit{
    padding: 0.5rem 1rem;

    &:hover{
      text-decoration: none;
    }
  }
  .tabs{
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }
  .badge{
    content: '';
    position: absolute;
    top: 10px;
    left: -15px;
    padding: 5px;
    font-weight: 600;
  }
  .card{
    border: none;
  }
</style>
