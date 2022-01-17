<template>
  <div class="container payment-status mb-5">
    <h2 class="payment-status__title text-left">Статус платежа</h2>
    <div v-if="!orderNumber && loading">
      <b-spinner class="mb-3" variant="success" label="Spinning"></b-spinner>
      <h3 class="restore-order__form-success-title">
        Платеж находится в обработке
      </h3>
    </div>
    <div v-if="error">
      <b-icon
        class="mb-3"
        icon="exclamation-circle-fill"
        font-scale="3"
        variant="danger"
      ></b-icon>
      <h3 class="restore-order__form-success-title">{{ error.message }}</h3>
      <h4 class="restore-order__form-success-title">{{ error.reason }}</h4>
    </div>
    <div v-if="orderNumber" class="order__content-wrapper">
      <h3 class="restore-order__form-success-title">Спасибо за заказ</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        class="pt-5 pb-5"
        style="max-width: 150px"
      >
        <path
          fill="#bae0bd"
          d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z"
        />
        <path
          fill="#5e9c76"
          d="M40,3c20.4,0,37,16.6,37,37S60.4,77,40,77S3,60.4,3,40S19.6,3,40,3 M40,2C19,2,2,19,2,40s17,38,38,38 s38-17,38-38S61,2,40,2L40,2z"
        />
        <path
          fill="#fff"
          d="M34 56L20.2 42.2 24.5 38 34 47.6 58.2 23.4 62.5 27.6z"
        />
      </svg>
      <div class="" style="max-width: 70%; margin: 0 auto">
        <div>Ваш заказ принят в обработку</div>
        <div class="mt-3 mb-3">
          Номер заказа: {{ number }} <br />
          Время заказа: {{ date }}
        </div>
        <div>
          В ближайшее время с вами свяжутся для уточнения деталей и
          подтверждения заказа
        </div>
        <div>
          Если после оплаты заказа у Вас вознили технические проблемы или Вы
          обнаружили ошибку (ФИО/адрес/номер и д.р), обратитесь по номеру:
          {{ $config.CALL_CENTER }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PaymentStatus",
  data() {
    return {
      date: null,
      loading: false,
      error: null,
    };
  },
  async mounted() {
    if (sessionStorage.getItem("order_details")){
      this.viewCacheOrder();
    } else if (this.$strapi.$cookies.get("yandex_payment_id")) {
      this.loading = true;
      const timer = setInterval(async () => {
        const paymentId = this.$strapi.$cookies.get("yandex_payment_id");
        const payment = await this.checkPayment(paymentId);
        console.log(payment)
        if (payment.status === "succeeded") {
          this.$strapi.$cookies.remove("yandex_payment_id");
          clearInterval(timer);
          await this.success(payment);
          this.loading = false;
        } else if (payment.status === "canceled") {
          this.$strapi.$cookies.remove("yandex_payment_id");
          clearInterval(timer);
          await this.canceled(payment);
          this.loading = false;
        }
      }, 5000);
    } else {
      await this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      user: "account/user",
      orderNumber: "iiko/orderNumber",
    }),
    number: {
      get() {
        return this.orderNumber
      },
      set(value){
        this.setOrderNumber(value)
      }
    },
    currentDate: () => new Date().toLocaleString(),
  },
  methods: {
    ...mapActions({
      setName: 'iiko/SET_NAME',
      setPhone: 'iiko/SET_PHONE',
      createOrder: "iiko/createOrder",
      setAddress: "iiko/SET_ADDRESS",
      setPaymentType: "iiko/SET_PAYMENT_TYPE",
      checkPayment: "payment/checkPayment",
      setOrderNumber: "iiko/SET_ORDER_NUMBER",
    }),
    viewCacheOrder(){
      this.loading = true;
      const order = JSON.parse(sessionStorage.getItem("order_details"));
      this.number = order.number;
      this.date = order.date;
      this.loading = false;
    },
    saveOrderDetails(){
      sessionStorage.setItem(
        "order_details",
        JSON.stringify({
          date: this.date,
          number: this.orderNumber,
        })
      );
    },
    async success(payment){
      const orderList = await this.$strapi.$orders.find({
        yandex_payment_id: payment.id,
      });
      if (!orderList.length) {
        return console.error(
          `Order with current id: ${this.$strapi.$cookies.get(
            "yandex_payment_id"
          )} not found`
        );
      }
      const order = orderList[0];
      await this.$strapi.$orders.update(order.id, {
        yandexPayment: payment,
      });
      this.setName(order.name);
      this.setPhone(order.phone);
      this.setAddress(order.address);
      this.setPaymentType(order.paymentType);
      await this.createOrder({ number: order.number });
      this.date = this.currentDate
      this.saveOrderDetails();
    },
    async canceled(payment) {
      const orderList = await this.$strapi.$orders.find({
        yandex_payment_id: payment.id,
      });
      if (!orderList.length)
        return console.error(
          `Order with current id: ${this.$strapi.$cookies.get(
            "yandex_payment_id"
          )} not found`
        );
      const order = orderList[0];
      await this.$strapi.$orders.update(order.id, {
        yandexPayment: payment,
      });
      this.error = {
        message: "Ошибка проведения платежа",
        reason: payment?.cancellation_details?.reason
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.payment-status {
  display: block;
  padding: 25px;
  background-color: #f9f9f9;
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
