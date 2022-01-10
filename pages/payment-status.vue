<template>
  <div class="container payment-status mb-5">
    <h2 class="payment-status__title text-left">Статус платежа</h2>
    <div v-if="!orderNumber && loading">
      <b-spinner class="mb-3" variant="success" label="Spinning"></b-spinner>
      <h3 class="restore-order__form-success-title"> Платеж находится в обработке </h3>
    </div>
    <div class="order__content-wrapper" v-if="orderNumber">
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
          Номер заказа: {{ orderNumber }} <br>
          Время заказа: {{ currentDate }}
        </div>
        <div>В ближайшее время с вами свяжутся для уточнения деталей и подтверждения заказа</div>
        <div>
          Если после оплаты заказа у Вас вознили технические проблемы или Вы обнаружили ошибку (ФИО/адрес/номер и д.р),
          обратитесь по номеру: {{ $config.CALL_CENTER }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "payment-status",
  data() {
    return {
      loading: false
    }
  },
  async mounted() {
    if(this.$strapi.$cookies.get('yandex_payment_id')){
      this.loading = true;
      const timer = setInterval(async () => {
      const payment = await this.checkPayment(this.$strapi.$cookies.get('yandex_payment_id'));
      if (payment.status === 'succeeded'){
        const orderList = await this.$strapi.$orders.find({yandex_payment_id: this.$strapi.$cookies.get('yandex_payment_id')})
        if(!orderList.length) return console.error(`Order with current id: ${this.$strapi.$cookies.get('yandex_payment_id')} not found`)
        const order = orderList[0];
        await this.$strapi.$orders.update(order.id, {yandexPayment: payment});
        this.set_address(order.address);
        this.setPaymentType(order.paymentType);
        await this.createOrder({number: order.number});
        clearInterval(timer);
        this.$strapi.$cookies.remove('yandex_payment_id')
        console.log('Order Update');
      }
      }, 5000)
    }
  },
  computed: {
    ...mapGetters({
      user: 'account/user',
      orderNumber: 'iiko/orderNumber',
    }),
    currentDate: () => new Date().toLocaleString(),
  },
  methods: {
    ...mapActions({
      createOrder: 'iiko/createOrder',
      set_address: 'iiko/SET_ADDRESS',
      setPaymentType: 'iiko/SET_PAYMENT_TYPE',
      checkPayment: 'payment/checkPayment',
    })
  }
}
</script>

<style lang="scss" scoped>
.payment-status {
  display: block;
  padding: 25px;
  background-color: #F9F9F9;
  border-radius: 10px;
  min-height: 80vh;

  &__title {
    font-weight: 600;
    font-size: 2.1rem;
    margin-top: 10px;
    margin-bottom: 40px;
  }
}
</style>
